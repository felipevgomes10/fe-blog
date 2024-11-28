"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";

type CopyableLinkProps = {
  id: string;
  children: React.ReactNode;
};

export function CopyableLink({ id, children }: Readonly<CopyableLinkProps>) {
  const t = useTranslations("toast");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${window.location.href}#${id}`);
      toast.success(t("copy_heading_link_success"));
    } catch (error) {
      toast.error(t("copy_heading_link_error"));
    }
  }

  return (
    <div
      className="cursor-pointer underline-offset-1 hover:underline"
      onClick={handleCopy}
    >
      {children}
    </div>
  );
}
