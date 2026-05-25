interface SvgIconProps {
  name: string;
  className?: string;
}

export default function SvgIcon({ name, className = "h-5 w-5" }: SvgIconProps) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
}
