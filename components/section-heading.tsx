import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  link?: { href: string; label: string };
  className?: string;
};

export function SectionHeading({ title, link, className = "border-b border-navy" }: SectionHeadingProps) {
  return (
    <div className={`flex items-baseline justify-between gap-6 p-gutter ${className}`}>
      <h2>{title}</h2>
      {link && (
        <Link className="nav-link stroke-link shrink-0" href={link.href}>
          {link.label}
        </Link>
      )}
    </div>
  );
}
