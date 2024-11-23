"use client";

import { useScroll } from "@/hooks/use-scroll/use-scroll";

export function ScrollProgress() {
  const { deferredScroll } = useScroll();

  return (
    <div className="fixed left-0 top-0 z-50 h-0.5 w-full">
      <div
        className="h-0.5 bg-accent-foreground"
        style={{ width: `${deferredScroll}%` }}
      />
    </div>
  );
}
