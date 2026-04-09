"use client";

import * as React from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

export type SmoothScrollHeroProps = {
  /** Extra scroll distance (px) while the sticky panel is pinned — drives animation length */
  scrollHeight?: number;
  desktopImage?: string;
  mobileImage?: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
};

/**
 * Parallax + clip-path reveal driven by scroll **through this section only**.
 * Global `scrollY` cannot be used here: by the time this block is in view, `scrollY` is already large,
 * so mapping [0, scrollHeight] to document pixels never matches user expectation.
 */
export function SmoothScrollHero({
  scrollHeight = 1500,
  desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
  mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=2412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}: SmoothScrollHeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const clipStart = useTransform(scrollYProgress, [0, 1], [initialClipPercentage, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 1], [finalClipPercentage, 100]);

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["170%", "100%"]);

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <motion.div
        className="sticky top-0 h-screen w-full bg-black"
        style={{
          clipPath,
          willChange: "clip-path",
        }}
      >
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>
    </div>
  );
}

export default SmoothScrollHero;
