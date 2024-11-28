"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { constants } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { WaveEmoji } from "./wave-emoji";

type ProfileCardProps = {
  profile: string;
};

const logos = ["/js.svg", "/ts.svg", "/react.svg", "/node.svg"] as const;

export function ProfileCard({ profile }: Readonly<ProfileCardProps>) {
  const t = useTranslations("about_me");

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setPosition({ x, y });
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }

  return (
    <Card
      className="relative top-2 mt-1 shadow-md data-[hovered=true]:shadow-xl sm:top-[100px] md:sticky md:z-50 md:max-w-72"
      data-hovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `
          perspective(1000px)
          rotateY(${position.x * 15}deg)
          rotateX(${-position.y * 15}deg)
          scale(1.02)
        `,
      }}
    >
      <CardHeader className="flex items-center">
        <div className="group relative h-28 w-28">
          <svg className="h-full w-full rotate-90">
            <circle
              className="fill-none stroke-foreground stroke-2 transition-all [stroke-dasharray:565.48] [stroke-dashoffset:565.48] [transition-duration:2s] group-hover:[stroke-dashoffset:0]"
              cx="50%"
              cy="50%"
              r="47%"
            />
          </svg>
          <a
            href={constants.linkedinLink}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <Avatar className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full">
              <AvatarImage className="object-cover" src={profile} />
            </Avatar>
          </a>
        </div>
        <CardTitle className="relative">
          Felipe Gomes
          <WaveEmoji className="absolute -right-8" />
        </CardTitle>
        <CardDescription className="text-center">{t("bio")}</CardDescription>
      </CardHeader>
      <Separator className="mx-auto mb-5 w-[80%]" />
      <CardContent>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{t("bio_2")}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-4">
        {logos.map((logo) => (
          <Image
            className="rounded-sm"
            key={logo}
            src={logo}
            alt={logo}
            width={20}
            height={20}
          />
        ))}
      </CardFooter>
    </Card>
  );
}
