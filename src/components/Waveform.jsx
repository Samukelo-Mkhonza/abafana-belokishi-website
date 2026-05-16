const BARS = [4, 10, 18, 26, 20, 36, 28, 14, 42, 32, 50, 38, 22, 46, 34, 26, 18, 34, 42, 30, 22, 36, 24, 16, 10, 6, 12, 22, 32, 40, 34, 24, 42, 36, 20, 28, 16, 8, 20, 30, 38, 28, 18, 40, 30, 20, 12, 8];

export default function Waveform({ className }) {
  const w = 1200;
  const h = 80;
  const barW = w / BARS.length;
  const gap = 2;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {BARS.map((barH, i) => (
        <rect
          key={i}
          x={i * barW + gap}
          y={(h - barH) / 2}
          width={barW - gap * 2}
          height={barH}
          fill="currentColor"
          rx={1}
        />
      ))}
    </svg>
  );
}
