import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import {
  demoEmployer,
  employerPipeline,
  getCandidate,
  getJob,
  type PipelineStage,
} from "@/lib/data/employer-demo";
import { setPipelineStage } from "@/app/employer/(dashboard)/actions";
import {
  PipelineStageBadge,
  pipelineStageLabel,
  PIPELINE_STAGES,
} from "@/components/employer/pipeline-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Select, Textarea } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function candidateName(learnerId: string): string {
  const learner = getCandidate(learnerId);
  return learner?.user.name ?? learner?.user.email ?? "Candidate";
}

export default function PipelinePage() {
  const { toast } = useToast();
  // Snapshot of pipeline entry stage/notes used to render + drive controls.
  const [, setVersion] = useState(0);
  const [drafts, setDrafts] = useState<
    Record<string, { stage: PipelineStage; notes: string }>
  >(() =>
    Object.fromEntries(
      employerPipeline.map((entry) => [
        entry.id,
        { stage: entry.stage, notes: entry.notes ?? "" },
      ]),
    ),
  );

  const entries = employerPipeline.filter(
    (entry) => entry.employerId === demoEmployer.id,
  );

  const grouped = PIPELINE_STAGES.map((stage) => ({
    stage,
    items: entries.filter((entry) => entry.stage === stage),
  })).filter((group) => group.items.length > 0);

  const handleSave = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const draft = drafts[id];
    if (!draft) return;
    const updated = setPipelineStage(id, draft.stage, draft.notes);
    if (updated) {
      setVersion((v) => v + 1);
      toast({
        title: "Pipeline updated",
        description: `Moved to ${pipelineStageLabel(updated.stage)}.`,
      });
    }
  };

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
                {group.items.map((entry) => {
                  const job = getJob(entry.jobId);
                  const draft = drafts[entry.id] ?? {
                    stage: entry.stage,
                    notes: entry.notes ?? "",
                  };
                  return (
                    <GlassCard key={entry.id} className="p-5 shadow-soft">
                      <p className="font-semibold text-navy">
                        {candidateName(entry.learnerId)}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {job?.title ?? "General pool"}
                      </p>
                      {entry.notes ? (
                        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                          {entry.notes}
                        </p>
                      ) : null}

                      <form
                        onSubmit={(e) => handleSave(e, entry.id)}
                        className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4"
                      >
                        <Select
                          name="stage"
                          value={draft.stage}
                          onChange={(e) =>
                            setDrafts((d) => ({
                              ...d,
                              [entry.id]: {
                                ...draft,
                                stage: e.target.value as PipelineStage,
                              },
                            }))
                          }
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
                          value={draft.notes}
                          onChange={(e) =>
                            setDrafts((d) => ({
                              ...d,
                              [entry.id]: { ...draft, notes: e.target.value },
                            }))
                          }
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
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
