import Link from "next/link";
import React from "react";

export function NavLink({
  href,
  children,
  hoverColor= "",
}: {
  href: string;
  children: React.ReactNode;
  hoverColor?: string;
}) {
  return (
    <Link
      href={href}
      className={`hover:underline ${hoverColor} hover:decoration-2 hover:underline-offset-6`}
    >
      {children}
    </Link>
  );
}