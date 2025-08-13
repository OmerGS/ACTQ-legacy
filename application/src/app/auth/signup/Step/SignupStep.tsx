import { cn } from "@/lib/utils";
import { Step } from "../signup";
import { useTranslation } from "@/hooks/useTranslation";

export function SignupSteps({ step }: { step: Step }) {
  const { t, isReady } = useTranslation();

  if (!isReady) return null;

  return (
    <div className="relative flex justify-between items-center mb-10">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex flex-col items-center w-1/3 text-sm">
          <div
            className={cn(
              "rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors duration-300",
              step >= n ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
            )}
          >
            {n}
          </div>
          <span
            className={cn(
              "mt-2 text-xs text-center transition-colors duration-300",
              step >= n ? "text-indigo-600 font-medium" : "text-gray-400"
            )}
          >
            {t(`signup.step-signup.breadcrumb.${n}`)}
          </span>
        </div>
      ))}

      {/* Ligne grise entre premier et dernier cercle */}
      <div
        className="absolute top-4 h-1 bg-gray-200 rounded-full z-0"
        style={{ left: "16.666%", right: "16.666%" }}
      />

      {/* Segment 1->2, visible dès étape 2 */}
      {step >= 2 && (
        <div
          className="absolute top-4 h-1 bg-indigo-600 rounded-full z-0 transition-all duration-300 ease-in-out"
          style={{ left: "16.666%", width: "33.333%" }}
        />
      )}

      {/* Segment 2->3, visible dès étape 3 */}
      {step >= 3 && (
        <div
          className="absolute top-4 h-1 bg-indigo-600 rounded-full z-0 transition-all duration-300 ease-in-out"
          style={{ left: "50%", width: "33.333%" }}
        />
      )}
    </div>
  );
}