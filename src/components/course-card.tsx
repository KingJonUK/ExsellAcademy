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
        "group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-glow",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <Icon name={course.icon} className="size-6" />
        </span>
        <Badge tone={accessTone[course.access]}>
          {formatPrice(course.price, course.access === "funded")}
        </Badge>
      </div>

      <h3 className="mt-5 text-lg font-bold text-navy">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {course.subtitle}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" aria-hidden="true" />
          {formatHours(course.durationHours)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Award className="size-4" aria-hidden="true" />
          {course.cpdHours} CPD hrs
        </span>
        <Badge tone="neutral">{course.level}</Badge>
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Explore course
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
