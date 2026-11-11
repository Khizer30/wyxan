"use client";
import { Input } from "@shared/components/ui/input";
import { SearchIcon } from "lucide-react";
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
      className="relative w-full sm:w-56"
      onSubmit={(event) => {
        event.preventDefault();
        if (draft.trim()) {
          onSearch(draft.trim());
        }
      }}
    >
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        disabled={disabled}
        placeholder="Search every page"
        aria-label="Search"
        className="pl-8"
      />
    </form>
  );
}
