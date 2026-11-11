import type { Person } from "@features/browser/types/browser.types";
import { UserIcon } from "lucide-react";

interface PersonSelectProps {
  people: Person[];
  person: Person | null;
  onChange: (personId: string) => void;
}

export function PersonSelect({ people, person, onChange }: PersonSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <UserIcon className="size-4" />
      <span className="sr-only sm:not-sr-only">Browsing as</span>
      <select
        value={person?.id ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {people.map((candidate) => (
          <option key={candidate.id} value={candidate.id}>
            {candidate.name}
          </option>
        ))}
      </select>
    </label>
  );
}
