"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PipelineStage, WorkMode } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isEmployer, getSessionEmployer } from "@/lib/employer-auth";

const STAGES: PipelineStage[] = [
  "SUBMITTED",
  "INTERVIEW_REQUESTED",
  "INTERVIEW_BOOKED",
  "OFFER_MADE",
  "OFFER_ACCEPTED",
  "STARTED",
  "REJECTED",
];
const WORK_MODES: WorkMode[] = ["REMOTE", "HYBRID", "ONSITE"];

/** Ensure the caller is the (demo) employer and return their profile. */
async function requireEmployer() {
  if (!(await isEmployer())) redirect("/employer/login");
  const employer = await getSessionEmployer();
  if (!employer) redirect("/employer/login");
  return employer;
}

export async function requestInterview(formData: FormData) {
  const employer = await requireEmployer();
  const learnerId = String(formData.get("learnerId") ?? "");
  const jobId = String(formData.get("jobId") ?? "") || null;
  if (!learnerId) return;

  // Composite-unique is (employerId, learnerId, jobId); a null jobId can't use
  // upsert cleanly, so find-then-write.
  const existing = await prisma.candidatePipeline.findFirst({
    where: { employerId: employer.id, learnerId, jobId },
  });
  if (existing) {
    if (existing.stage === "SUBMITTED") {
      await prisma.candidatePipeline.update({
        where: { id: existing.id },
        data: { stage: "INTERVIEW_REQUESTED" },
      });
    }
  } else {
    await prisma.candidatePipeline.create({
      data: { employerId: employer.id, learnerId, jobId, stage: "INTERVIEW_REQUESTED" },
    });
  }

  revalidatePath("/employer/pipeline");
  revalidatePath(`/employer/talent/${learnerId}`);
  revalidatePath("/employer");
}

export async function setPipelineStage(formData: FormData) {
  const employer = await requireEmployer();
  const id = String(formData.get("id") ?? "");
  const stage = String(formData.get("stage") ?? "") as PipelineStage;
  const notes = String(formData.get("notes") ?? "").trim();
  if (!id || !STAGES.includes(stage)) return;

  const entry = await prisma.candidatePipeline.findFirst({
    where: { id, employerId: employer.id },
  });
  if (!entry) return;

  await prisma.candidatePipeline.update({
    where: { id },
    data: { stage, notes: notes || entry.notes },
  });

  // Materialise a placement once an offer is accepted / the candidate starts.
  if (stage === "OFFER_ACCEPTED" || stage === "STARTED") {
    const existingPlacement = await prisma.placement.findUnique({
      where: { pipelineId: id },
    });
    if (!existingPlacement) {
      await prisma.placement.create({
        data: {
          learnerId: entry.learnerId,
          employerId: employer.id,
          jobId: entry.jobId,
          pipelineId: id,
          status: stage === "STARTED" ? "STARTED" : "PENDING",
          startDate: stage === "STARTED" ? new Date() : null,
        },
      });
    }
  }

  revalidatePath("/employer/pipeline");
  revalidatePath("/employer/placements");
  revalidatePath("/employer");
}

export async function createJob(formData: FormData) {
  const employer = await requireEmployer();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const workModeRaw = String(formData.get("workMode") ?? "HYBRID") as WorkMode;
  const workMode = WORK_MODES.includes(workModeRaw) ? workModeRaw : "HYBRID";
  const scoreRaw = String(formData.get("minReadinessScore") ?? "").trim();
  const minReadinessScore = scoreRaw ? Number(scoreRaw) : null;

  await prisma.job.create({
    data: {
      employerId: employer.id,
      title,
      description: String(formData.get("description") ?? "").trim() || null,
      workMode,
      location: String(formData.get("location") ?? "").trim() || null,
      industry: String(formData.get("industry") ?? "").trim() || null,
      minReadinessScore:
        minReadinessScore !== null && !Number.isNaN(minReadinessScore)
          ? minReadinessScore
          : null,
    },
  });

  revalidatePath("/employer/roles");
}
