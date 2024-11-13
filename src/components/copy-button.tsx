"use client";

import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "./ui/button";

type CopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: Readonly<CopyButtonProps>) {
  const t = useTranslations("toast");

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("success"));
    } catch (error) {
      toast.error(t("error"));
    }
  }

  return (
    <Button
      className="absolute right-6 top-3"
      variant="secondary"
      size="sm"
      onClick={copyText}
    >
      <Copy size={15} />
    </Button>
  );
}
