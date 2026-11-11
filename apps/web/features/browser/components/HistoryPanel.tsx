"use client";

import { useHistory } from "@features/browser/hooks/useHistory";
import { Button } from "@shared/components/ui/button";

interface HistoryPanelProps {
  personId: string;
  onOpen: (address: string) => void;
  onClose: () => void;
}

const when = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" });

export function HistoryPanel({ personId, onOpen, onClose }: HistoryPanelProps) {
  const { items, hasMore, loadMore, isLoading, isLoadingMore } = useHistory(personId, true);

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-l border-border text-sm" aria-label="History">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
        <h2 className="font-semibold">History</h2>
        <button type="button" onClick={onClose} className="text-muted-foreground underline">
          Close
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading && <p className="p-3 text-muted-foreground">Loading…</p>}
        {!isLoading && items.length === 0 && <p className="p-3 text-muted-foreground">Nothing visited yet.</p>}

        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => onOpen(item.address)} className="block w-full border-b border-border px-3 py-2 text-left hover:bg-muted">
                <span className="block truncate">{item.title ?? "Nowhere"}</span>
                <span className="block truncate font-mono text-xs text-muted-foreground">{item.address}</span>
                <span className="block text-xs text-muted-foreground">
                  {when.format(new Date(item.visitedAt))} · {item.transition}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="p-3">
            <Button onClick={loadMore} disabled={isLoadingMore}>
              {isLoadingMore ? "Loading…" : "Older"}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
