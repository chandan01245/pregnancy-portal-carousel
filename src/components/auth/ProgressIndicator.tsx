
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === currentStep
              ? "w-8 bg-pregnancy-primary"
              : index < currentStep
              ? "w-4 bg-pregnancy-soft-purple"
              : "w-4 bg-muted"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
