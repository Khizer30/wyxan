import type { Person } from "@features/browser/types/browser.types";

interface PersonSelectProps {
  people: Person[];
  person: Person | null;
  onChange: (personId: string) => void;
}

export function PersonSelect({ people, person, onChange }: PersonSelectProps) {
  return (
    <select
      value={person?.id ?? ""}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Browsing as"
      className="h-8 rounded-sm border border-border bg-background px-1 text-sm"
    >
      {people.map((candidate) => (
        <option key={candidate.id} value={candidate.id}>
          {candidate.name}
        </option>
      ))}
    </select>
  );
}
