import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { submitQuiz } from "@/app/(app)/dashboard/courses/actions";
import { cn } from "@/lib/utils";

type Question = {
  id: string;
  prompt: string;
  type: string;
  options: string[];
  order: number;
};

export function QuizPlayer({
  quiz,
  courseSlug,
}: {
  quiz: {
    id: string;
    title: string;
    passMark: number;
    isFinalAssessment: boolean;
    questions: Question[];
  };
  courseSlug: string;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuiz(quiz.id, answers);
    // Navigate to the result view (drop any ?retry flag).
    router.push(`/dashboard/courses/${courseSlug}/quiz/${quiz.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {quiz.questions.map((q, idx) => (
        <div key={q.id} className="space-y-3">
          <p className="font-semibold text-navy">
            <span className="mr-2 text-slate-400">{idx + 1}.</span>
            {q.prompt}
          </p>
          <div className="space-y-2">
            {q.options.map((option, optIdx) => {
              const selected = answers[q.id] === optIdx;
              return (
                <label
                  key={optIdx}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                    selected
                      ? "border-brand-400 bg-brand-50 text-brand-800"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50/40",
                  )}
                >
                  <input
                    type="radio"
                    name={`answer_${q.id}`}
                    value={optIdx}
                    checked={selected}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                    }
                    className="size-4 accent-brand-600"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!allAnswered}
      >
        Submit answers ({Object.keys(answers).length}/{quiz.questions.length}{" "}
        answered)
      </Button>
    </form>
  );
}
