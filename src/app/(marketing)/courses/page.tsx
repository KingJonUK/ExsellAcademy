import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/section";
import { CourseCatalogue } from "@/components/courses/course-catalogue";
import { courses } from "@/lib/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse ExSell Academy's CPD-certified, practical sales courses — from foundations and communication to prospecting, closing and AI. Built with employers to get you hired.",
};

export default function CoursesPage() {
  return (
    <>
      {/* Compact page header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 bg-grid">
        <div className="container-page py-14 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <Eyebrow>Course catalogue</Eyebrow>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Courses that get you hired
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Practical, CPD-certified training built with employers. Start with
              the free foundations, then specialise in the skills sales teams are
              hiring for right now.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <CourseCatalogue courses={courses} />
      </Section>
    </>
  );
}
