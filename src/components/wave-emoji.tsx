"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const ANGLES = [0, 14, -8, 14, -4, 10, 0];
const THREE_HUNDRED_MS = 300;

type WaveEmojiProps = {
  className?: string;
};

export function WaveEmoji({ className }: Readonly<WaveEmojiProps>) {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let index = 0;

    if (!isHovered) return setRotation(0);

    const interval = setInterval(() => {
      setRotation(ANGLES[index] as number);
      index = (index + 1) % ANGLES.length;
    }, THREE_HUNDRED_MS);

    return () => clearInterval(interval);
  }, [isHovered]);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      className={cn(
        "inline-block cursor-default transition-transform duration-300",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "70% 70%",
      }}
    >
      👋🏼
    </div>
  );
}
