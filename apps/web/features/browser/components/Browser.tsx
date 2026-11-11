"use client";
import { getErrorMessage } from "@features/browser/api/browser.api";
import { AddressBar } from "@features/browser/components/AddressBar";
import { EmptyView } from "@features/browser/components/EmptyView";
import { HistoryPanel } from "@features/browser/components/HistoryPanel";
import { NowhereView } from "@features/browser/components/NowhereView";
import { PageViewer } from "@features/browser/components/PageViewer";
import { PersonSelect } from "@features/browser/components/PersonSelect";
import { PublishDialog } from "@features/browser/components/PublishDialog";
import { SearchBox } from "@features/browser/components/SearchBox";
import { SearchResults } from "@features/browser/components/SearchResults";
import { useBrowser } from "@features/browser/hooks/useBrowser";
import { usePeople } from "@features/browser/hooks/usePeople";
import type { Transition } from "@features/browser/types/browser.types";
import { Button } from "@shared/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function Browser() {
  const { people, person, setPersonId, isLoading: loadingPeople, error: peopleError } = usePeople();
  const scrollReader = useRef<() => number>(() => 0);
  const { view, isLoading, act, isActing, error } = useBrowser(person?.id ?? null, () => scrollReader.current());

  const [historyOpen, setHistoryOpen] = useState(false);
  const [publishAt, setPublishAt] = useState<string | null>(null);

  const body = view?.view ?? null;
  const busy = isActing || isLoading || !person;
  const go = (input: string, transition: Transition) => act({ type: "navigate", input, transition });
  const canGoBack = !!view?.canGoBack && !busy;
  const canGoForward = !!view?.canGoForward && !busy;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!event.altKey) {
        return;
      }
      if (event.key === "ArrowLeft" && canGoBack) {
        act({ type: "back" });
      }
      if (event.key === "ArrowRight" && canGoForward) {
        act({ type: "forward" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [act, canGoBack, canGoForward]);

  const barKey = `${person?.id}-${view?.version ?? 0}`;

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border p-2">
        <Button onClick={() => act({ type: "back" })} disabled={!canGoBack} aria-label="Back" title="Alt+Left">
          Back
        </Button>
        <Button onClick={() => act({ type: "forward" })} disabled={!canGoForward} aria-label="Forward" title="Alt+Right">
          Forward
        </Button>

        <AddressBar key={`a-${barKey}`} address={body?.kind === "page" ? body.address : ""} disabled={busy} onGo={(input) => go(input, "typed")} />
        <SearchBox key={`s-${barKey}`} query={body?.kind === "search" ? body.query : ""} disabled={busy} onSearch={(query) => act({ type: "search", query })} />

        <Button onClick={() => setHistoryOpen((open) => !open)} aria-label="History" aria-pressed={historyOpen} className={historyOpen ? "bg-muted" : ""}>
          History
        </Button>
        <Button onClick={() => setPublishAt("")} disabled={!person}>
          Publish
        </Button>
        <PersonSelect people={people} person={person} onChange={setPersonId} />
      </header>

      {error && (
        <p role="alert" className="shrink-0 border-b border-border px-3 py-1.5 text-sm text-destructive">
          {getErrorMessage(error)}
        </p>
      )}

      <div className="flex min-h-0 flex-1">
        <main className="min-w-0 flex-1">
          {peopleError && <p className="p-8 text-sm text-muted-foreground">Could not reach the server. Is the API running?</p>}
          {!peopleError && loadingPeople && <p className="p-8 text-sm text-muted-foreground">Loading…</p>}
          {!peopleError && person && body === null && !isLoading && <EmptyView name={person.name} />}

          {body?.kind === "page" &&
            (body.site ? (
              <PageViewer
                key={view?.version}
                title={body.site.title}
                safeHtml={body.site.safeHtml}
                scrollY={view?.scrollY ?? 0}
                onFollow={(address) => go(address, "link")}
                scrollReaderRef={scrollReader}
              />
            ) : (
              <NowhereView address={body.address} onPublish={setPublishAt} />
            ))}

          {body?.kind === "search" && <SearchResults view={body} onOpen={(address) => go(address, "search")} />}
        </main>

        {historyOpen && person && <HistoryPanel personId={person.id} onOpen={(address) => go(address, "history")} onClose={() => setHistoryOpen(false)} />}
      </div>

      {publishAt !== null && person && (
        <PublishDialog
          person={person}
          initialAddress={publishAt}
          onClose={() => setPublishAt(null)}
          onPublished={(address) => {
            setPublishAt(null);
            go(address, "typed");
          }}
        />
      )}
    </div>
  );
}
