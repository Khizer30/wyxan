import type { SearchView } from "@features/browser/types/browser.types";

interface SearchResultsProps {
  view: SearchView;
  onOpen: (address: string) => void;
}

export function SearchResults({ view, onOpen }: SearchResultsProps) {
  const { query, results } = view;

  return (
    <div className="mx-auto h-full max-w-2xl overflow-y-auto px-6 py-8">
      <p className="mb-6 text-sm text-muted-foreground">
        {results.length === 0 ? "No pages mention" : `${results.length} ${results.length === 1 ? "page mentions" : "pages mention"}`}{" "}
        <span className="font-medium text-foreground">“{query}”</span>
      </p>

      <ul className="space-y-5">
        {results.map((result) => (
          <li key={result.address}>
            <button
              type="button"
              onClick={() => onOpen(result.address)}
              className="group block w-full rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="block font-mono text-xs text-muted-foreground">{result.address}</span>
              <span className="block text-lg font-medium text-primary group-hover:underline">{result.title}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{result.snippet}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
