"use client";

import { Link } from "@/i18n/navigation";

type ViewTransitionLinkProps = React.ComponentProps<typeof Link>;

export function ViewTransitionLink(props: Readonly<ViewTransitionLinkProps>) {
  function startViewTransition() {
    if (!document.startViewTransition) return;

    document.startViewTransition();
  }

  return <Link {...props} onClick={startViewTransition} />;
}
