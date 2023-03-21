import { ReactNode } from "react";
import useScrollDirection from "../hooks/useScrollDirection";

export default function Sidebar({
  children,
  headerTop = "top-[57px]",
}: {
  children: ReactNode;
  headerTop?: string;
}) {
  const scrollDirection = useScrollDirection();

  return (
    <aside
      className={`h-auto self-start sticky ${
        scrollDirection === "down" ? "top-0" : headerTop
      } max-w-[368px] max-xlg:max-w-[352px] grow flex pl-9 pr-6 max-lg:hidden transition-all duration-250`}
    >
      <div className="absolute left-0 h-[calc(100vh-57px)] border-l border-l-subtle-white" />

      {children}
    </aside>
  );
}
