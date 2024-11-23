"use client";

import { useScroll } from "@/hooks/use-scroll/use-scroll";
import React from "react";

type AppHeaderWrapperProps = {
  children: React.ReactNode;
};

export function AppHeaderWrapper({
  children,
}: Readonly<AppHeaderWrapperProps>) {
  const { deferredScroll } = useScroll();

  return (
    <div
      className="app-header sticky top-0 z-50 bg-background px-6 py-4 transition-all duration-300 data-[scrolled=true]:py-1"
      data-scrolled={deferredScroll > 0}
    >
      {children}
    </div>
  );
}
