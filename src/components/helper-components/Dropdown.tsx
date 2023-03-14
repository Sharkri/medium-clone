import { ReactNode, useEffect, useRef, useState } from "react";

export default function Dropdown({
  children,
  buttonStyles = "",
  dropdownStyles = "",
}: {
  children: ReactNode[];
  buttonStyles?: string;
  dropdownStyles?: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // event listener for when click outside of dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (
        !dropdownRef.current?.contains(target) ||
        target.closest("a") ||
        target.closest("button")
      ) {
        // if clicked outside of dropdown menu or clicked interactive element, close it.
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative">
      <button
        className={buttonStyles}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {children[0]}
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className={dropdownStyles}>
          {children[1]}
        </div>
      )}
    </div>
  );
}
