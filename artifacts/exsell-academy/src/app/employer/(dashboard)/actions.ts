import {
  demoEmployer,
  employerJobs,
  employerPipeline,
  employerPlacements,
  findPipelineForLearner,
  nextId,
  type DemoJob,
  type DemoPipelineEntry,
  type DemoPlacement,
  type PipelineStage,
  type WorkMode,
} from "@/lib/data/employer-demo";

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

/** Add a candidate to the pipeline (or advance them to "interview requested"). */
export function requestInterview(
  learnerId: string,
  jobId: string | null,
): DemoPipelineEntry | null {
  if (!learnerId) return null;

  const existing = employerPipeline.find(
    (p) =>
      p.employerId === demoEmployer.id &&
      p.learnerId === learnerId &&
      p.jobId === jobId,
  );

  if (existing) {
    if (existing.stage === "SUBMITTED") {
      existing.stage = "INTERVIEW_REQUESTED";
      existing.updatedAt = new Date();
    }
    return existing;
  }

  const entry: DemoPipelineEntry = {
    id: nextId("pipe"),
    employerId: demoEmployer.id,
    learnerId,
    jobId,
    stage: "INTERVIEW_REQUESTED",
    notes: null,
    updatedAt: new Date(),
  };
  employerPipeline.unshift(entry);
  return entry;
}

/** Set the pipeline stage for an entry, materialising a placement when needed. */
export function setPipelineStage(
  id: string,
  stage: PipelineStage,
  notes?: string,
): DemoPipelineEntry | null {
  if (!id || !STAGES.includes(stage)) return null;

  const entry = employerPipeline.find(
    (p) => p.id === id && p.employerId === demoEmployer.id,
  );
  if (!entry) return null;

  entry.stage = stage;
  const trimmed = (notes ?? "").trim();
  if (trimmed) entry.notes = trimmed;
  entry.updatedAt = new Date();

  if (stage === "OFFER_ACCEPTED" || stage === "STARTED") {
    const existingPlacement = employerPlacements.find(
      (p) => p.pipelineId === id,
    );
    if (!existingPlacement) {
      const placement: DemoPlacement = {
        id: nextId("plc"),
        learnerId: entry.learnerId,
        employerId: demoEmployer.id,
        jobId: entry.jobId,
        pipelineId: id,
        status: stage === "STARTED" ? "STARTED" : "PENDING",
        startDate: stage === "STARTED" ? new Date() : null,
        feePennies: null,
        feeStatus: "PENDING",
        createdAt: new Date(),
      };
      employerPlacements.unshift(placement);
    }
  }

  return entry;
}

/** Post a new role to the talent pool. */
export function createJob(input: {
  title: string;
  description?: string;
  workMode?: string;
  location?: string;
  industry?: string;
  minReadinessScore?: string;
}): DemoJob | null {
  const title = input.title.trim();
  if (!title) return null;

  const workModeRaw = (input.workMode ?? "HYBRID") as WorkMode;
  const workMode = WORK_MODES.includes(workModeRaw) ? workModeRaw : "HYBRID";
  const scoreRaw = (input.minReadinessScore ?? "").trim();
  const minScoreNum = scoreRaw ? Number(scoreRaw) : null;

  const job: DemoJob = {
    id: nextId("job"),
    title,
    description: (input.description ?? "").trim() || null,
    workMode,
    location: (input.location ?? "").trim() || null,
    industry: (input.industry ?? "").trim() || null,
    minReadinessScore:
      minScoreNum !== null && !Number.isNaN(minScoreNum) ? minScoreNum : null,
    status: "OPEN",
    createdAt: new Date(),
  };
  employerJobs.unshift(job);
  return job;
}
