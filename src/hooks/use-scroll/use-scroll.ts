import { useDeferredValue, useEffect, useState } from "react";

export function useScroll() {
  const [scroll, setScroll] = useState(0);
  const deferredScroll = useDeferredValue(scroll);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scroll = scrollTop / (scrollHeight - clientHeight);

      const scrolled = scroll * 100;

      setScroll(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scroll, deferredScroll };
}
