export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="aspect-square bg-secondary" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-secondary rounded" />
        <div className="h-4 w-full bg-secondary rounded" />
        <div className="h-3 w-24 bg-secondary rounded" />
        <div className="h-6 w-20 bg-secondary rounded" />
        <div className="h-9 w-full bg-secondary rounded-lg" />
      </div>
    </div>
  );
}
