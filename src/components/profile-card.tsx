"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

type ProfileCardProps = {
  profile: string;
};

const logos = ["/js.svg", "/ts.svg", "/node.svg", "/react.svg"] as const;

export function ProfileCard({ profile }: Readonly<ProfileCardProps>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const t = useTranslations("about_me");

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
      className="top-[100px] z-50 mt-1 shadow-md data-[hovered=true]:shadow-xl md:sticky md:max-w-72"
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
        <Avatar className="h-24 w-24">
          <AvatarImage className="object-cover" src={profile} />
        </Avatar>
        <CardTitle>Felipe Gomes</CardTitle>
        <CardDescription className="text-center">{t("bio")}</CardDescription>
      </CardHeader>
      <Separator className="mx-auto mb-5 w-[80%]" />
      <CardContent>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{t("bio_2")}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-4">
        {logos.map((logo) => (
          <Image key={logo} src={logo} alt={logo} width={20} height={20} />
        ))}
      </CardFooter>
    </Card>
  );
}
