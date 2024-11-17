"use client";

import { Link } from "@/i18n/navigation";
import { startViewTransition } from "@/utils/start-view-transition/start-view-transition";
import React from "react";

type ViewTransitionLinkProps = React.ComponentProps<typeof Link>;

export function ViewTransitionLink({
  onClick,
  ...props
}: Readonly<ViewTransitionLinkProps>) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    startViewTransition();
  }

  return <Link {...props} onClick={handleClick} />;
}
