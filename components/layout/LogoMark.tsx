type LogoMarkProps = {
  className?: string;
};

// The Crust & Bloom mark: a rosetta (latte-art leaf that doubles as a wheat
// stalk) rising from a handleless tumbler. Monoline — inherits its color from
// `currentColor`, so style it with a text color utility (e.g. text-terracotta).
export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="-32 -72 64 134"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* rosetta */}
      <path d="M0 -4 L0 -44" />
      <path d="M0 -44 C6 -52 6 -62 0 -68 C-6 -62 -6 -52 0 -44 Z" />
      <path d="M0 0 C5 -5 5 -13 0 -18 C-5 -13 -5 -5 0 0 Z" transform="translate(0 -13) rotate(-44)" />
      <path d="M0 0 C5 -5 5 -13 0 -18 C-5 -13 -5 -5 0 0 Z" transform="translate(0 -13) rotate(44)" />
      <path d="M0 0 C5 -5 5 -13 0 -18 C-5 -13 -5 -5 0 0 Z" transform="translate(0 -25) rotate(-34)" />
      <path d="M0 0 C5 -5 5 -13 0 -18 C-5 -13 -5 -5 0 0 Z" transform="translate(0 -25) rotate(34)" />
      <path d="M0 0 C5 -5 5 -13 0 -18 C-5 -13 -5 -5 0 0 Z" transform="translate(0 -36) rotate(-25)" />
      <path d="M0 0 C5 -5 5 -13 0 -18 C-5 -13 -5 -5 0 0 Z" transform="translate(0 -36) rotate(25)" />
      {/* tumbler */}
      <ellipse cx="0" cy="0" rx="27" ry="7" />
      <path d="M-27 0 L-27 44" />
      <path d="M27 0 L27 44" />
      <path d="M-27 44 Q0 55 27 44" />
      <path d="M-21 49 Q0 57 21 49" />
    </svg>
  );
}
