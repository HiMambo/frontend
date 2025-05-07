import { ReactNode } from "react";

type HoverWrapperProps = {
  children: ReactNode;
};

export default function HoverWrapper({ children }: HoverWrapperProps) {
  return (
    <span className="hover:text-white hover:scale-103">
      {children}
    </span>
  );
}