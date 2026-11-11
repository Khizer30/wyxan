import { cn } from "@shared/lib/utils";
import type { ComponentProps } from "react";

export function Button({ className, primary, type = "button", ...props }: ComponentProps<"button"> & { primary?: boolean }) {
  return (
    <button
      type={type}
      className={cn(
        "h-8 rounded-sm border px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-40",
        primary ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}
