"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PlacementStatus, PaymentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

const PLACEMENT_STATUSES: PlacementStatus[] = [
  "PENDING",
  "STARTED",
  "FEE_DUE",
  "FEE_PAID",
  "COMPLETED",
  "FELL_THROUGH",
];
const PAYMENT_STATUSES: PaymentStatus[] = ["PENDING", "PAID", "FAILED", "REFUNDED"];
const CHECK_INS = ["check30", "check60", "check90"] as const;

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function setPlacementStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as PlacementStatus;
  if (!id || !PLACEMENT_STATUSES.includes(status)) return;

  await prisma.placement.update({ where: { id }, data: { status } });
  revalidatePath("/admin/placements");
  revalidatePath("/admin");
}

export async function setFeeStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const feeStatus = String(formData.get("feeStatus") ?? "") as PaymentStatus;
  if (!id || !PAYMENT_STATUSES.includes(feeStatus)) return;

  const data: { feeStatus: PaymentStatus; feePennies?: number } = { feeStatus };
  const feePoundsRaw = String(formData.get("feePounds") ?? "").trim();
  if (feePoundsRaw) {
    const pounds = Number(feePoundsRaw);
    if (!Number.isNaN(pounds) && pounds >= 0) data.feePennies = Math.round(pounds * 100);
  }

  await prisma.placement.update({ where: { id }, data });
  revalidatePath("/admin/placements");
  revalidatePath("/admin");
}

export async function toggleCheckIn(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const which = String(formData.get("which") ?? "");
  if (!id || !CHECK_INS.includes(which as (typeof CHECK_INS)[number])) return;

  const placement = await prisma.placement.findUnique({ where: { id } });
  if (!placement) return;

  const current = placement[which as (typeof CHECK_INS)[number]];
  await prisma.placement.update({
    where: { id },
    data: { [which]: current ? null : new Date() },
  });
  revalidatePath("/admin/placements");
}
