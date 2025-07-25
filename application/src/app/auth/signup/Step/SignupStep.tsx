import { cn } from "@/lib/utils";
import { Step } from "../Signup";
import { useTranslation } from "@/hooks/useTranslation";

export function SignupSteps({ step }: { step: Step }) {
  const { t, isReady } = useTranslation();

  if (!isReady) return null;

  return (
    <div className="flex items-center justify-between mb-10 relative">
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
      <div className="absolute top-4 left-[12.5%] right-[12.5%] h-1 bg-gray-200 z-0 rounded-full">
        <div
          className="h-1 bg-indigo-600 transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${(step - 1) * 50}%` }}
        />
      </div>
    </div>
  );
}