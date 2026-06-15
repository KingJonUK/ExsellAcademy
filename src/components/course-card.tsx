import Link from "next/link";
import { ArrowRight, Award, Clock } from "lucide-react";
import type { Course } from "@/lib/types";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { cn, formatHours, formatPrice } from "@/lib/utils";

const accessTone = {
  free: "accent",
  paid: "brand",
  funded: "amber",
} as const;

export function CourseCard({
  course,
  className,
}: {
  course: Course;
  className?: string;
}) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        "group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
          <Icon name={course.icon} className="size-6" />
        </span>
        <Badge tone={accessTone[course.access]}>
          {formatPrice(course.price, course.access === "funded")}
        </Badge>
      </div>

      <h3 className="mt-5 text-lg font-bold text-navy transition-colors group-hover:text-brand-700">
        {course.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {course.subtitle}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4 text-slate-400" aria-hidden="true" />
          {formatHours(course.durationHours)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Award className="size-4 text-slate-400" aria-hidden="true" />
          {course.cpdHours} CPD hrs
        </span>
        <Badge tone="neutral">{course.level}</Badge>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Explore course
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
