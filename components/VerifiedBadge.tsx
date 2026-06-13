export default function VerifiedBadge({ withLabel = false }: { withLabel?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-gold"
      title="Verified product data"
      aria-label="Verified"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4zm-1.2 13.5-3.3-3.3 1.4-1.4 1.9 1.9 4.3-4.3 1.4 1.4-5.7 5.7z" />
      </svg>
      {withLabel && <span className="text-xs font-semibold uppercase tracking-wide">Verified</span>}
    </span>
  );
}
