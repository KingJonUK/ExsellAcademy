import type { Metadata } from "next";
import Link from "next/link";
import type { CandidatePipeline, Job, LearnerProfile, User } from "@prisma/client";
import { ArrowRight, Workflow } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSessionEmployer } from "@/lib/employer-auth";
import { setPipelineStage } from "@/app/employer/(dashboard)/actions";
import {
  PipelineStageBadge,
  pipelineStageLabel,
  PIPELINE_STAGES,
} from "@/components/employer/pipeline-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Select, Textarea } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Recruitment pipeline",
};

type PipelineEntry = CandidatePipeline & {
  learner: LearnerProfile & { user: User };
  job: Job | null;
};

function candidateName(entry: PipelineEntry): string {
  return entry.learner.user.name ?? entry.learner.user.email;
}

export default async function PipelinePage() {
  const employer = await getSessionEmployer();

  if (!employer) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-navy">Recruitment pipeline</h1>
        <GlassCard className="mt-6">
          <p className="text-sm font-semibold text-navy">No employer profile found</p>
          <p className="mt-1 text-sm text-slate-500">
            Seed the demo data to explore the employer portal. Run{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-navy">
              npm run db:seed
            </code>{" "}
            and refresh.
          </p>
        </GlassCard>
      </div>
    );
  }

  const entries = (await prisma.candidatePipeline.findMany({
    where: { employerId: employer.id },
    include: { learner: { include: { user: true } }, job: true },
    orderBy: { updatedAt: "desc" },
  })) as PipelineEntry[];

  const grouped = PIPELINE_STAGES.map((stage) => ({
    stage,
    items: entries.filter((entry) => entry.stage === stage),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-navy">Recruitment pipeline</h1>
      <p className="mt-1 text-sm text-slate-500">
        Track shortlisted talent from first contact through to a confirmed start.
      </p>

      {entries.length === 0 ? (
        <GlassCard className="mt-6">
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Workflow className="size-10 text-slate-300" aria-hidden="true" />
            <p className="text-sm font-semibold text-navy">Your pipeline is empty</p>
            <p className="max-w-sm text-sm text-slate-500">
              Browse the talent pool and request an interview to start tracking
              candidates here.
            </p>
            <Link
              href="/employer/talent"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              Browse talent pool
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </GlassCard>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {grouped.map((group) => (
            <section key={group.stage} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <PipelineStageBadge stage={group.stage} />
                <span className="text-xs font-semibold text-slate-400">
                  {group.items.length}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {group.items.map((entry) => (
                  <GlassCard key={entry.id} className="p-5 shadow-soft">
                    <p className="font-semibold text-navy">{candidateName(entry)}</p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {entry.job?.title ?? "General pool"}
                    </p>
                    {entry.notes ? (
                      <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                        {entry.notes}
                      </p>
                    ) : null}

                    <form
                      action={setPipelineStage}
                      className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4"
                    >
                      <input type="hidden" name="id" value={entry.id} />
                      <Select
                        name="stage"
                        defaultValue={entry.stage}
                        aria-label="Pipeline stage"
                      >
                        {PIPELINE_STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {pipelineStageLabel(stage)}
                          </option>
                        ))}
                      </Select>
                      <Textarea
                        name="notes"
                        rows={2}
                        placeholder="Add a note (optional)"
                        defaultValue={entry.notes ?? ""}
                        className="min-h-0"
                      />
                      <button
                        type="submit"
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className: "self-start",
                        })}
                      >
                        Save
                      </button>
                    </form>
                  </GlassCard>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
