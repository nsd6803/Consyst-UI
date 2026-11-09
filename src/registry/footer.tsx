import * as React from "react";
import "./footer.css";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  copyright?: React.ReactNode;
  links?: { label: React.ReactNode; href: string }[];
}

export function Footer({
  copyright = `АО «Консист-ОС» ${new Date().getFullYear()}`,
  links = [
    { label: "Инструкция по использованию", href: "#" },
    { label: "Политика обработки данных", href: "#" },
    { label: "Cookie", href: "#" },
  ],
  className,
  ...props
}: FooterProps) {
  return (
    <footer className={["cs-footer", className].filter(Boolean).join(" ")} {...props}>
      <span className="cs-footer__copy">{copyright}</span>
      <nav className="cs-footer__links">
        {links.map((l, i) => (
          <a key={i} href={l.href} className="cs-footer__link">
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
