export default function RedStripes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 380 150" className={className} aria-hidden="true">
      <polygon points="0,150 95,150 235,0 140,0" fill="#e5173f" />
      <polygon points="145,150 240,150 380,0 285,0" fill="#e5173f" />
    </svg>
  );
}
