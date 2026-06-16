import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import type { Course, CourseAccess, CourseLevel } from "@/lib/types";
import { CourseCard } from "@/components/course-card";
import { courseCategories, courseLevels } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

const accessOptions: { value: CourseAccess; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
  { value: "funded", label: "Funded" },
];

const chipBase =
  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500";
const chipActive = "bg-brand-600 text-white";
const chipInactive =
  "border border-slate-300 text-slate-600 hover:border-brand-400 hover:text-brand-700";

/** Add or remove a value from a multi-select filter array. */
function toggle<T>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}

function FilterGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onToggle(option.value)}
              className={cn(chipBase, isActive ? chipActive : chipInactive)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CourseCatalogue({ courses }: { courses: Course[] }) {
  const [levels, setLevels] = useState<CourseLevel[]>([]);
  const [access, setAccess] = useState<CourseAccess[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const hasFilters =
    levels.length > 0 || access.length > 0 || categories.length > 0;

  const filtered = useMemo(
    () =>
      courses.filter((course) => {
        if (levels.length > 0 && !levels.includes(course.level)) return false;
        if (access.length > 0 && !access.includes(course.access)) return false;
        if (categories.length > 0 && !categories.includes(course.category))
          return false;
        return true;
      }),
    [courses, levels, access, categories],
  );

  function clearFilters() {
    setLevels([]);
    setAccess([]);
    setCategories([]);
  }

  return (
    <div>
      {/* Filter toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-6 md:grid-cols-3">
          <FilterGroup
            label="Level"
            options={courseLevels.map((level) => ({
              value: level,
              label: level,
            }))}
            selected={levels}
            onToggle={(value) => setLevels((prev) => toggle(prev, value))}
          />
          <FilterGroup
            label="Access"
            options={accessOptions}
            selected={access}
            onToggle={(value) => setAccess((prev) => toggle(prev, value))}
          />
          <FilterGroup
            label="Category"
            options={courseCategories.map((category) => ({
              value: category,
              label: category,
            }))}
            selected={categories}
            onToggle={(value) => setCategories((prev) => toggle(prev, value))}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm font-medium text-slate-600">
            Showing{" "}
            <span className="font-bold text-navy">{filtered.length}</span> of{" "}
            {courses.length} courses
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-white text-slate-400 shadow-soft">
            <SearchX className="size-7" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-lg font-bold text-navy">
            No courses match those filters
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
            Try removing a filter or two to see more of the catalogue.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
