import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <LoaderCircle
        className={cn("animate-spin h-12 w-12 text-primary", className)}
      />
    </div>
  );
}
