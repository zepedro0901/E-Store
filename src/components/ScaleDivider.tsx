export function ScaleDivider({
  className = "",
  color = "var(--background)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 20"
      preserveAspectRatio="none"
      className={`block h-5 w-full ${className}`}
    >
      <path
        fill={color}
        d="M0,0
           a20,20 0 0 0 40,0
           a20,20 0 0 0 40,0
           a20,20 0 0 0 40,0
           a20,20 0 0 0 40,0
           a20,20 0 0 0 40,0
           a20,20 0 0 0 40,0
           L240,20 L0,20 Z"
      />
    </svg>
  );
}
