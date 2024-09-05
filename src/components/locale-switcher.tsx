"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supportedLocales } from "@/i18n/supported-locales";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("locale_switcher");
  const locale = useLocale() as (typeof supportedLocales)[number];

  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  function handleValueChange(value: string) {
    startTransition(() => {
      router.replace(pathname.replace(locale, value));
    });
  }

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={locale}
      disabled={isPending}
    >
      <SelectTrigger className="w-full sm:w-[150px]">
        <SelectValue placeholder={t(locale)} />
      </SelectTrigger>
      <SelectContent>
        {supportedLocales.map((supportedLocale) => (
          <SelectItem key={supportedLocale} value={supportedLocale}>
            {t(supportedLocale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
