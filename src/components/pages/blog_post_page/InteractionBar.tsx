import { ReactNode } from "react";

export default function InteractionBar({
  children,
  isVisible,
}: {
  children: ReactNode;
  isVisible: boolean;
}) {
  const opacity = isVisible ? "opacity-100 visible" : "opacity-0 invisible";

  return (
    <div className="fixed bottom-4 w-full max-w-[680px] flex justify-center z-20 max-[680px]:left-1/2 max-[680px]:-translate-x-1/2">
      <div
        className={`flex items-center h-[40px] shadow-lg pl-4 pr-[14px] rounded-full text-grey bg-white transition-all duration-300 ${opacity}`}
      >
        {children}
      </div>
    </div>
  );
}
