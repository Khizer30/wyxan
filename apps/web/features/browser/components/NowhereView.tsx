interface NowhereViewProps {
  address: string;
  onPublish: (address: string) => void;
}

/** An address that leads nowhere is an ordinary result, not an error: it is recorded and sits in history like any page. */
export function NowhereView({ address, onPublish }: NowhereViewProps) {
  return (
    <div className="max-w-xl space-y-2 p-8 text-sm">
      <h1 className="text-lg font-semibold">Nowhere</h1>
      <p className="text-muted-foreground">
        No site lives at <span className="font-mono break-all text-foreground">{address || "that address"}</span>.
      </p>
      <button type="button" onClick={() => onPublish(address)} className="text-blue-700 underline">
        Publish something here
      </button>
    </div>
  );
}
