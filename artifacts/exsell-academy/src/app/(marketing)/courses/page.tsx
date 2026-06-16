import { Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { CourseCatalogue } from "@/components/courses/course-catalogue";
import { courses } from "@/lib/data/courses";

export default function CoursesPage() {
  const totalCpd = courses.reduce((sum, course) => sum + course.cpdHours, 0);
  const freeCount = courses.filter((course) => course.access === "free").length;

  const headerStats = [
    { value: `${courses.length}`, label: "Courses" },
    { value: `${totalCpd}`, label: "CPD hours" },
    { value: `${freeCount}`, label: "Free to start" },
  ];

  return (
    <>
      {/* Premium page header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-aurora">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-page py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <span
              className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft backdrop-blur"
              style={{ animationDelay: "40ms" }}
            >
              <Sparkles className="size-4 text-violet-500" />
              CPD-accredited course catalogue
            </span>

            <h1
              className="mt-6 animate-fade-up text-hero text-navy"
              style={{ animationDelay: "120ms" }}
            >
              Courses that get you{" "}
              <span className="text-gradient">hired</span>
            </h1>

            <p
              className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-slate-600"
              style={{ animationDelay: "200ms" }}
            >
              Practical, CPD-certified training built with employers. Start with
              the free foundations, then specialise in the skills sales teams are
              hiring for right now.
            </p>
          </div>

          <dl
            className="mt-10 flex animate-fade-up flex-wrap gap-x-10 gap-y-6"
            style={{ animationDelay: "280ms" }}
          >
            {headerStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-4xl font-extrabold text-navy">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <CourseCatalogue courses={courses} />
      </Section>
    </>
  );
}
