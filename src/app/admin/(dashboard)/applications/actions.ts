"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

const VALID_STATUSES: ApplicationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "MORE_INFO_REQUESTED",
  "APPROVED",
  "REJECTED",
];

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function setApplicationStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  const reviewNotes = String(formData.get("reviewNotes") ?? "").trim();

  if (!id || !VALID_STATUSES.includes(status)) return;

  await prisma.application.update({
    where: { id },
    data: { status, reviewNotes: reviewNotes || null },
  });

  revalidatePath(`/admin/applications/${id}`);
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

export async function assignCourse(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const courseId = String(formData.get("courseId") ?? "");
  if (!id) return;

  await prisma.application.update({
    where: { id },
    data: { assignedCourseId: courseId || null },
  });

  revalidatePath(`/admin/applications/${id}`);
}

export async function assignSponsor(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const sponsorId = String(formData.get("sponsorId") ?? "");
  if (!id) return;

  await prisma.application.update({
    where: { id },
    data: { assignedSponsorId: sponsorId || null },
  });

  revalidatePath(`/admin/applications/${id}`);
  revalidatePath("/admin/sponsors");
}
