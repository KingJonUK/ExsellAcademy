import {
  updateApplicationCourse,
  updateApplicationSponsor,
  updateApplicationStatus,
  type ApplicationStatus,
} from "@/lib/data/admin-demo";

const VALID_STATUSES: ApplicationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "MORE_INFO_REQUESTED",
  "APPROVED",
  "REJECTED",
];

export function setApplicationStatus(
  id: string,
  status: ApplicationStatus,
  reviewNotes: string,
): void {
  if (!id || !VALID_STATUSES.includes(status)) return;
  updateApplicationStatus(id, status, reviewNotes);
}

export function assignCourse(id: string, courseId: string): void {
  if (!id) return;
  updateApplicationCourse(id, courseId);
}

export function assignSponsor(id: string, sponsorId: string): void {
  if (!id) return;
  updateApplicationSponsor(id, sponsorId);
}
