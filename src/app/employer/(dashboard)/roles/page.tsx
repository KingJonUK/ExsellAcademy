import type { Metadata } from "next";
import { Briefcase, MapPin, Factory, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSessionEmployer } from "@/lib/employer-auth";
import { createJob } from "@/app/employer/(dashboard)/actions";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Your roles",
};

const workModeLabel: Record<string, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export default async function RolesPage() {
  const employer = await getSessionEmployer();

  if (!employer) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-navy">Your roles</h1>
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

  const jobs = await prisma.job.findMany({
    where: { employerId: employer.id },
    include: { _count: { select: { pipeline: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-navy">Your roles</h1>
      <p className="mt-1 text-sm text-slate-500">
        Post roles and set a minimum readiness score to match the right talent.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Roles list */}
        <div className="lg:col-span-2">
          {jobs.length === 0 ? (
            <GlassCard>
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <Briefcase className="size-10 text-slate-300" aria-hidden="true" />
                <p className="text-sm font-semibold text-navy">No roles yet</p>
                <p className="max-w-sm text-sm text-slate-500">
                  Post your first role using the form to start receiving matched
                  candidates.
                </p>
              </div>
            </GlassCard>
          ) : (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <GlassCard key={job.id} className="shadow-soft">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-navy">{job.title}</h2>
                    <Badge tone="neutral" className="whitespace-nowrap">
                      <Users className="size-3.5" aria-hidden="true" />
                      {job._count.pipeline} in pipeline
                    </Badge>
                  </div>

                  {job.description ? (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {job.description}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge tone="brand">
                      {workModeLabel[job.workMode] ?? job.workMode}
                    </Badge>
                    {job.location ? (
                      <Badge tone="neutral">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {job.location}
                      </Badge>
                    ) : null}
                    {job.industry ? (
                      <Badge tone="neutral">
                        <Factory className="size-3.5" aria-hidden="true" />
                        {job.industry}
                      </Badge>
                    ) : null}
                    {job.minReadinessScore !== null ? (
                      <Badge tone="amber">min score {job.minReadinessScore}</Badge>
                    ) : null}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Post a role */}
        <div>
          <GlassCard className="lg:sticky lg:top-8">
            <h2 className="font-semibold text-navy">Post a role</h2>
            <p className="mt-1 text-sm text-slate-500">
              Publish a new opening to the talent pool.
            </p>

            <form action={createJob} className="mt-5 flex flex-col gap-4">
              <Field label="Title" htmlFor="title" required>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Sales Development Representative"
                />
              </Field>

              <Field label="Description" htmlFor="description">
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="What the role involves and who you are looking for"
                />
              </Field>

              <Field label="Work mode" htmlFor="workMode">
                <Select id="workMode" name="workMode" defaultValue="HYBRID">
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ONSITE">On-site</option>
                </Select>
              </Field>

              <Field label="Location" htmlFor="location">
                <Input id="location" name="location" placeholder="e.g. London" />
              </Field>

              <Field label="Industry" htmlFor="industry">
                <Input id="industry" name="industry" placeholder="e.g. SaaS" />
              </Field>

              <Field
                label="Minimum readiness score"
                htmlFor="minReadinessScore"
                hint="0–100. Leave blank for no minimum."
              >
                <Input
                  id="minReadinessScore"
                  name="minReadinessScore"
                  type="number"
                  min={0}
                  max={100}
                  placeholder="e.g. 70"
                />
              </Field>

              <button
                type="submit"
                className={buttonVariants({ variant: "primary", className: "w-full" })}
              >
                Create role
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
