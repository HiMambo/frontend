import Link from "next/link";
import {
  Instagram,
  LinkedIn,
  X,
  LogoFooter,
} from "./IconComponents";
import { NavLink } from "./NavLink";

const FOOTER_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/partner-dashboard", label: "Partner Program" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-teal-800 px-[var(--spacing-2400)] py-[var(--spacing-400)] text-inverted">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        {/* Left: Follow us */}
        <div>
          <p className="body-l-light text-inverted mb-[var(--spacing-300)]">Follow us</p>
          <div className="flex items-center gap-[var(--spacing-200)]">
            <Link href="#" aria-label="Instagram">
              <Instagram className="icon-s hover:scale-105" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <X className="icon-s hover:scale-105" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <LinkedIn className="icon-s hover:scale-105" />
            </Link>
          </div>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-8 body-l">
          {FOOTER_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-current my-[var(--spacing-300)]" />

      {/* Bottom Section */}
      <div className="flex items-center">
        {/* Logo */}
        <LogoFooter width={172} height={30}/>

        {/* Copyright */}
        <p className="ml-[var(--spacing-600)] body-l-light opacity-50">
          Copyright 2025 HiMambo. {"  "}
          <Link href="#" className="hover:underline">Terms & Privacy</Link>
        </p>
      </div>
    </footer>
  );
}
