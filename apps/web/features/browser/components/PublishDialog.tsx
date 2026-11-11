"use client";
import { browserApi, getErrorMessage } from "@features/browser/api/browser.api";
import type { Person } from "@features/browser/types/browser.types";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const TEMPLATE = `<h1>My page</h1>
<p>Write something here. Link to another site like this: <a href="tidepool.io">tidepool.io</a>.</p>`;

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
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-16"
      onKeyDown={(event) => event.key === "Escape" && onClose()}
    >
      <form
        className="w-full max-w-lg space-y-3 border border-border bg-background p-4 text-sm"
        onSubmit={(event) => {
          event.preventDefault();
          publish.mutate();
        }}
      >
        <h2 id="publish-title" className="text-base font-semibold">
          Publish a site as {person.name}
        </h2>

        <label className="block space-y-1">
          <span>Address</span>
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

        <label className="block space-y-1">
          <span>Title</span>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={200} />
        </label>

        <label className="block space-y-1">
          <span>HTML</span>
          <textarea
            value={html}
            onChange={(event) => setHtml(event.target.value)}
            rows={9}
            required
            spellCheck={false}
            className="w-full rounded-sm border border-border bg-background p-2 font-mono text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </label>

        <p className="text-xs text-muted-foreground">Scripts, forms, images, frames and event handlers are removed when you publish.</p>

        {publish.error && (
          <p role="alert" className="text-destructive">
            {getErrorMessage(publish.error)}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" primary disabled={publish.isPending}>
            {publish.isPending ? "Publishing…" : "Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
