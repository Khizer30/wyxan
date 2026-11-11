"use client";
import { Input } from "@shared/components/ui/input";
import { useState } from "react";

interface AddressBarProps {
  address: string;
  disabled: boolean;
  onGo: (input: string) => void;
}

export function AddressBar({ address, disabled, onGo }: AddressBarProps) {
  const [draft, setDraft] = useState(address);

  return (
    <form
      className="min-w-0 flex-1"
      onSubmit={(event) => {
        event.preventDefault();
        if (draft.trim()) {
          onGo(draft);
        }
      }}
    >
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onFocus={(event) => event.target.select()}
        disabled={disabled}
        placeholder="Type an address, like tidepool.io"
        aria-label="Address"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className="font-mono"
      />
    </form>
  );
}
