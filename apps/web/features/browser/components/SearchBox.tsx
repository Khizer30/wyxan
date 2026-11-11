"use client";
import { Input } from "@shared/components/ui/input";
import { useState } from "react";

interface SearchBoxProps {
  query: string;
  disabled: boolean;
  onSearch: (query: string) => void;
}

export function SearchBox({ query, disabled, onSearch }: SearchBoxProps) {
  const [draft, setDraft] = useState(query);

  return (
    <form
      className="w-48"
      onSubmit={(event) => {
        event.preventDefault();
        if (draft.trim()) {
          onSearch(draft.trim());
        }
      }}
    >
      <Input value={draft} onChange={(event) => setDraft(event.target.value)} disabled={disabled} placeholder="Search" aria-label="Search" />
    </form>
  );
}
