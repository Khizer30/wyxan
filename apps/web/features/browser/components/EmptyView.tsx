import { GlobeIcon } from "lucide-react";

export function EmptyView({ name }: { name: string }) {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-3 px-6 text-center">
      <GlobeIcon className="size-10 text-muted-foreground" strokeWidth={1.5} />
      <h1 className="text-2xl font-semibold tracking-tight">The Small Web</h1>
      <p className="text-muted-foreground">Nothing open yet, {name}. Type an address in the bar above, or search for something that is written on a page.</p>
    </div>
  );
}
