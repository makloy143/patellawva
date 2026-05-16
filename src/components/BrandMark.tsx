type Props = {
  size?: number;
  flat?: boolean;
};

export default function BrandMark({ size = 48, flat = false }: Props) {
  if (flat) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#0a1b33" />
        <path
          d="M19 17h12.5c5 0 8.5 3 8.5 7.4 0 3.1-1.7 5.4-4.4 6.4 3.4.8 5.4 3.4 5.4 6.9 0 4.7-3.6 7.8-9 7.8H19V17Z"
          fill="#b8945f"
        />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="bm-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1b33" />
          <stop offset="100%" stopColor="#1c3a6a" />
        </linearGradient>
        <linearGradient id="bm-g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d5b27e" />
          <stop offset="100%" stopColor="#b8945f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#bm-g1)" />
      <path
        d="M19 17h12.5c5 0 8.5 3 8.5 7.4 0 3.1-1.7 5.4-4.4 6.4 3.4.8 5.4 3.4 5.4 6.9 0 4.7-3.6 7.8-9 7.8H19V17Zm5.4 4.6v7.6h6.6c2.6 0 4.4-1.5 4.4-3.8 0-2.3-1.8-3.8-4.4-3.8h-6.6Zm0 12v7.6h7.4c2.8 0 4.6-1.5 4.6-3.8 0-2.3-1.8-3.8-4.6-3.8h-7.4Z"
        fill="url(#bm-g2)"
      />
      <path d="M14 50h36" stroke="url(#bm-g2)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
