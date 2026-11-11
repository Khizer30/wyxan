import { Button } from "@shared/components/ui/button";
import { CompassIcon } from "lucide-react";

interface NowhereViewProps {
  address: string;
  onPublish: (address: string) => void;
}

export function NowhereView({ address, onPublish }: NowhereViewProps) {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <CompassIcon className="size-10 text-muted-foreground" strokeWidth={1.5} />
      <h1 className="text-2xl font-semibold tracking-tight">Nowhere</h1>
      <p className="text-muted-foreground">
        No site lives at <span className="font-mono text-foreground break-all">{address || "that address"}</span>. It may never have existed, or it may not have
        been published yet.
      </p>
      <Button variant="outline" onClick={() => onPublish(address)}>
        Publish something here
      </Button>
    </div>
  );
}
