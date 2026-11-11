import { cn } from "@shared/lib/utils";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-8 w-full min-w-0 rounded-sm border border-border bg-background px-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
