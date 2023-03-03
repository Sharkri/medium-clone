import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
  return (
    <>
      <aside className="h-auto self-start sticky top-[57px] max-w-[368px] grow flex justify-center pl-8 pr-6 max-lg:hidden">
        <div className="absolute left-0 h-screen border-l border-l-subtle-white" />

        {children}
      </aside>
    </>
  );
}
