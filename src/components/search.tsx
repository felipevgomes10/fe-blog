"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { filterPosts } from "@/utils/filter-posts/filter-posts";
import { startViewTransition } from "@/utils/start-view-transition/start-view-transition";
import { Search as SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { DialogDescription, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

export function Search({ postsPromise }: { postsPromise: Promise<any> }) {
  const t = useTranslations("app_header");

  const search = useSearchParams();
  const q = search.get("q") || "";

  const [commandValue, setCommandValue] = useState("");

  const posts = use(postsPromise);
  const filteredPosts = useMemo(
    () => filterPosts({ posts, q: commandValue }),
    [posts, commandValue],
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  function handleSearch() {
    const search = new URLSearchParams();
    search.set("q", inputRef.current?.value || "");

    router.push(`${pathname}?${search.toString()}`);
  }

  function handleItemSelect(value: string) {
    startViewTransition();
    router.push(`/posts/${value}`);
    handleCommandSearchClick();
  }

  function handleCommandSearchClick() {
    setOpen(false);
  }

  function handleCommandSearchOpen() {
    setOpen(true);
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">{t("search_placeholder")}</DialogTitle>
        <DialogDescription className="sr-only">
          {t("search_placeholder")}
        </DialogDescription>
        <CommandInput
          value={commandValue}
          onValueChange={setCommandValue}
          placeholder={t("search_placeholder")}
        />
        <CommandList>
          <CommandEmpty>{t("empty")}</CommandEmpty>
          <CommandGroup heading={t("search_group")}>
            {filteredPosts.map((post) => (
              <CommandItem
                key={post.slug}
                value={post.slug}
                onSelect={handleItemSelect}
              >
                <Link
                  href={`/posts/${post.slug}`}
                  onClick={(e) => e.preventDefault()}
                >
                  {post.title}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="relative hidden max-w-96 sm:block">
        <Input
          defaultValue={q}
          placeholder={t("search_placeholder")}
          ref={inputRef}
          onFocus={pathname !== "/" ? handleCommandSearchOpen : undefined}
          onChange={handleSearch}
        />
        <SearchIcon
          size={15}
          className="pointer-events-none absolute right-3 top-3 opacity-50"
        />
      </div>

      <Button
        className="block px-2 py-1 sm:hidden"
        variant="outline"
        size="icon"
        onClick={handleCommandSearchOpen}
      >
        <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">{t("search_placeholder")}</span>
      </Button>
    </>
  );
}
