interface StarIconProps {
  filled?: boolean;
  halfFilled?: boolean;
}

export default function StarIcon({
  filled = false,
  halfFilled = false,
}: StarIconProps) {
  return (
    <svg
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <defs>
        <linearGradient id="half-fill">
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      <path
        d="M16 2l4.12 8.36L30 12.28l-7 6.82 1.65 9.62L16 24.77l-8.65 4.55L9 19.1 2 12.28l9.88-1.92L16 2z"
        fill={filled ? '#fbbf24' : halfFilled ? 'url(#half-fill)' : '#d1d5db'}
        stroke="#d1d5db"
        strokeWidth="1"
      />
    </svg>
  );
}
