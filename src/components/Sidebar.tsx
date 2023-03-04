import { ReactNode } from "react";
import useScrollDirection from "./useScrollDirection";

export default function Sidebar({ children }: { children: ReactNode }) {
  const scrollDirection = useScrollDirection();

  return (
    <>
      <aside
        className={`h-auto self-start sticky ${
          scrollDirection === "down" ? "top-0" : "top-[57px]"
        } max-w-[368px] grow flex pl-8 pr-6 max-lg:hidden transition-all duration-250`}
      >
        <div className="absolute left-0 h-screen border-l border-l-subtle-white" />

        {children}
      </aside>
    </>
  );
}
