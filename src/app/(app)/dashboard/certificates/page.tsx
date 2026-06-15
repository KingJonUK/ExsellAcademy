import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Award } from "lucide-react";
import { getSessionLearner } from "@/lib/learner-auth";
import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "My Certificates" };

export default async function CertificatesPage() {
  const learner = await getSessionLearner();
  if (!learner) redirect("/login");

  const certificates = await prisma.certificate.findMany({
    where: { learnerId: learner.id, status: "ACTIVE" },
    include: { course: { select: { slug: true } } },
    orderBy: { issuedAt: "desc" },
  });

  const totalCpd = certificates.reduce((s, c) => s + c.cpdHours, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            My Certificates
          </h1>
          <p className="mt-2 text-slate-600">
            {certificates.length} certificate
            {certificates.length !== 1 ? "s" : ""} · {totalCpd} CPD hours
            earned
          </p>
        </div>
        <Link
          href="/courses"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
          )}
        >
          Browse more courses
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {certificates.length === 0 ? (
        <GlassCard className="py-16 text-center">
          <Award className="mx-auto mb-4 size-12 text-slate-300" />
          <p className="font-semibold text-navy">No certificates yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Complete a course to earn your first CPD certificate.
          </p>
          <Link
            href="/dashboard/courses"
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "mt-6",
            )}
          >
            Go to My Courses
          </Link>
        </GlassCard>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <GlassCard
              key={cert.id}
              className="flex h-full flex-col gap-5 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-glow">
                  <Award className="size-6" aria-hidden="true" />
                </span>
                <Badge tone="accent">{cert.cpdHours} CPD hrs</Badge>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-navy">{cert.title}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Issued{" "}
                  {cert.issuedAt.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-2 font-mono text-xs text-slate-400">
                  {cert.certificateId}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/verify/${cert.certificateId}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "flex-1",
                  })}
                >
                  Verify
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={`/dashboard/courses/${cert.course.slug}`}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                    className: "flex-1",
                  })}
                >
                  Review course
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
