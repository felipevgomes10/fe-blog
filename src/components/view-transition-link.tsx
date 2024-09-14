"use client";

import { Link } from "@/i18n/navigation";
import { startViewTransition } from "@/utils/start-view-transition/start-view-transition";

type ViewTransitionLinkProps = React.ComponentProps<typeof Link>;

export function ViewTransitionLink(props: Readonly<ViewTransitionLinkProps>) {
  function handleClick() {
    startViewTransition();
  }

  return <Link {...props} onClick={handleClick} />;
}
