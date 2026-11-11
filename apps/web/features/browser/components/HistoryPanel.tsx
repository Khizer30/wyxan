"use client";
import { useHistory } from "@features/browser/hooks/useHistory";
import type { HistoryItem } from "@features/browser/types/browser.types";
import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/lib/utils";
import { XIcon } from "lucide-react";

interface HistoryPanelProps {
  personId: string;
  onOpen: (address: string) => void;
  onClose: () => void;
}

const TRANSITION_LABEL: Record<HistoryItem["transition"], string> = {
  typed: "typed",
  link: "link",
  back: "back",
  forward: "forward",
  history: "history",
  search: "search"
};

const clock = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
const day = new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short" });

export function HistoryPanel({ personId, onOpen, onClose }: HistoryPanelProps) {
  const { items, hasMore, loadMore, isLoading, isLoadingMore } = useHistory(personId, true);

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-border bg-card" aria-label="History">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
        <h2 className="text-sm font-semibold">History</h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close history" className="size-8">
          <XIcon className="size-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading && <p className="p-4 text-sm text-muted-foreground">Loading…</p>}
        {!isLoading && items.length === 0 && <p className="p-4 text-sm text-muted-foreground">Nothing visited yet.</p>}

        <ul>
          {items.map((item, index) => {
            const when = new Date(item.visitedAt);
            const newDay = index === 0 || day.format(when) !== day.format(new Date(items[index - 1]!.visitedAt));

            return (
              <li key={item.id}>
                {newDay && <p className="bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">{day.format(when)}</p>}
                <button
                  type="button"
                  onClick={() => onOpen(item.address)}
                  className="block w-full border-b border-border/60 px-4 py-2.5 text-left outline-none hover:bg-accent focus-visible:bg-accent"
                >
                  <span className={cn("block truncate text-sm font-medium", item.outcome === "missing" && "text-muted-foreground italic")}>
                    {item.title ?? "Nowhere"}
                  </span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">{item.address}</span>
                  <span className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <time dateTime={item.visitedAt}>{clock.format(when)}</time>
                    <span className="rounded bg-muted px-1.5 py-px">{TRANSITION_LABEL[item.transition]}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {hasMore && (
          <div className="p-3">
            <Button variant="outline" className="w-full" onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? "Loading…" : "Older"}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
