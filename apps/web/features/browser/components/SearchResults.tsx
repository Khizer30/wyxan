import type { SearchView } from "@features/browser/types/browser.types";

interface SearchResultsProps {
  view: SearchView;
  onOpen: (address: string) => void;
}

export function SearchResults({ view, onOpen }: SearchResultsProps) {
  const { query, results } = view;

  return (
    <div className="h-full max-w-2xl overflow-y-auto p-8 text-sm">
      <p className="mb-4 text-muted-foreground">
        {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
      </p>

      <ul className="space-y-4">
        {results.map((result) => (
          <li key={result.address}>
            <button type="button" onClick={() => onOpen(result.address)} className="block text-left">
              <span className="block text-base text-blue-700 underline">{result.title}</span>
              <span className="block font-mono text-xs text-muted-foreground">{result.address}</span>
              <span className="block text-muted-foreground">{result.snippet}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
