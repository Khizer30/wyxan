"use client";
import { browserApi, getErrorMessage } from "@features/browser/api/browser.api";
import type { Person } from "@features/browser/types/browser.types";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const TEMPLATE = `<h1>My page</h1>
<p>Write something here. Headings, paragraphs, lists, tables and links to other addresses all work.</p>
<p>Link to another site like this: <a href="tidepool.io">tidepool.io</a>.</p>`;

interface PublishDialogProps {
  person: Person;
  initialAddress: string;
  onClose: () => void;
  onPublished: (address: string) => void;
}

export function PublishDialog({ person, initialAddress, onClose, onPublished }: PublishDialogProps) {
  const [address, setAddress] = useState(initialAddress);
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState(TEMPLATE);

  const publish = useMutation({
    mutationFn: () => browserApi.publish({ personId: person.id, address, title, html }),
    onSuccess: (site) => onPublished(site.address)
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="publish-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onKeyDown={(event) => event.key === "Escape" && onClose()}
    >
      <form
        className="flex max-h-full w-full max-w-xl flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-xl"
        onSubmit={(event) => {
          event.preventDefault();
          publish.mutate();
        }}
      >
        <div>
          <h2 id="publish-title" className="text-lg font-semibold">
            Publish a site
          </h2>
          <p className="text-sm text-muted-foreground">
            Publishing as <span className="font-medium text-foreground">{person.name}</span>. Publishing at an address you already own adds a new version.
          </p>
        </div>

        <label className="space-y-1.5 text-sm font-medium">
          Address
          <Input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="mysite.io"
            className="font-mono"
            required
            autoFocus
            spellCheck={false}
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium">
          Title
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What is this page called?" required maxLength={200} />
        </label>

        <label className="space-y-1.5 text-sm font-medium">
          HTML
          <textarea
            value={html}
            onChange={(event) => setHtml(event.target.value)}
            rows={10}
            required
            spellCheck={false}
            className="w-full rounded-md border border-input bg-background p-3 font-mono text-xs leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>

        <p className="text-xs text-muted-foreground">
          Scripts, forms, images, embedded frames, style blocks and event handlers are removed when you publish. Links that are not addresses are removed too.
          Basic inline colours and alignment are kept.
        </p>

        {publish.error && (
          <p role="alert" className="text-sm text-destructive">
            {getErrorMessage(publish.error)}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={publish.isPending}>
            {publish.isPending ? "Publishing…" : "Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
