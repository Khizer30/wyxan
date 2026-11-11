export function EmptyView({ name }: { name: string }) {
  return <p className="p-8 text-sm text-muted-foreground">Nothing open yet, {name}. Type an address above, or search for something written on a page.</p>;
}
