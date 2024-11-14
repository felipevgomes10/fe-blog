"use client";

import { useDeferredValue, useEffect, useState } from "react";

export function ScrollProgress() {
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

  return (
    <div className="fixed left-0 top-0 z-50 h-0.5 w-full">
      <div
        className="h-0.5 bg-accent-foreground"
        style={{ width: `${deferredScroll}%` }}
      />
    </div>
  );
}
