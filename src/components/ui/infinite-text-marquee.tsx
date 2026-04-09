"use client";

import * as React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
  className?: string;
};

export function InfiniteTextMarquee({
  text = "Let's Get Started",
  link = "/",
  speed = 30,
  showTooltip = true,
  tooltipText = "Time to Flex💪",
  fontSize = "clamp(3rem, 12vw, 8rem)",
  textColor,
  hoverColor,
  className,
}: InfiniteTextMarqueeProps) {
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const maxRotation = 8;

  React.useEffect(() => {
    if (!showTooltip) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      const midpoint = window.innerWidth / 2;
      const distanceFromMidpoint = Math.abs(e.clientX - midpoint);
      const rot = (distanceFromMidpoint / midpoint) * maxRotation;

      setRotation(e.clientX > midpoint ? rot : -rot);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showTooltip]);

  const segment = `${Array(8).fill(text).join(" — ")} — `;
  const isExternal = /^https?:\/\//i.test(link);

  const textStyle = {
    fontSize,
    color: textColor || undefined,
    ["--marquee-hover" as string]: hoverColor ?? "var(--primary)",
  } as React.CSSProperties;

  const linkBody = (
    <span
      className={cn(
        "inline-flex cursor-pointer font-bold tracking-tight transition-[color] duration-200",
        !textColor && "text-foreground",
        "hover:[color:var(--marquee-hover)]",
      )}
      style={textStyle}
    >
      <span className="inline-block shrink-0">{segment}</span>
      <span className="inline-block shrink-0" aria-hidden>
        {segment}
      </span>
    </span>
  );

  return (
    <>
      {showTooltip ? (
        <div
          className={cn(
            "following-tooltip pointer-events-none fixed z-[99] rounded-3xl px-12 py-6 font-bold whitespace-nowrap transition-opacity duration-300",
            "bg-primary text-primary-foreground",
            isHovered ? "opacity-100" : "opacity-0",
          )}
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            transform: `rotateZ(${rotation}deg) translate(-50%, -140%)`,
          }}
        >
          <p>{tooltipText}</p>
        </div>
      ) : null}

      <div className={cn("relative w-full overflow-hidden py-10", className)}>
        <motion.div
          className="flex w-max will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: speed,
            ease: "linear",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isExternal ? (
            <a href={link} className="inline-flex min-w-0" rel="noopener noreferrer">
              {linkBody}
            </a>
          ) : (
            <Link href={link} className="inline-flex min-w-0">
              {linkBody}
            </Link>
          )}
        </motion.div>
      </div>
    </>
  );
}
