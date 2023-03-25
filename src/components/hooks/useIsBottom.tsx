import { RefObject, useEffect, useState } from "react";

export default function useIsBottom(ref: RefObject<HTMLElement>) {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { top, left, right, bottom } = ref.current.getBoundingClientRect();

      const { clientHeight, clientWidth } = document.documentElement;

      setIsBottom(
        top >= 0 && left >= 0 && bottom <= clientHeight && right <= clientWidth
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return isBottom;
}
