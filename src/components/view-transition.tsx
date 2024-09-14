"use client";

import { startViewTransition } from "@/utils/start-view-transition/start-view-transition";
import { useEffect } from "react";

type ViewTransitionProps = {
  children: React.ReactNode;
};

export function ViewTransition({ children }: Readonly<ViewTransitionProps>) {
  useEffect(() => {
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return children;
}

function handlePopstate() {
  const mainContent = document.querySelector("main") as HTMLElement;
  mainContent.classList.add("opacity-0");

  const appHeaderIcon = document.querySelector(
    ".app-header-icon"
  ) as HTMLElement;
  appHeaderIcon.classList.add("hidden");

  startViewTransition(() => {
    appHeaderIcon.classList.remove("hidden");
    mainContent.classList.remove("opacity-0");
  });
}
