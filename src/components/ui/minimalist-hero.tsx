"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  /** When false, logo / nav / menu are hidden (e.g. secondary hero blocks). @default true */
  showHeader?: boolean;
  /**
   * `split` — default 3-column layout (copy | image | headline).
   * `stacked` — headline centered above the image, then copy below (e.g. #hero-order).
   */
  heroLayout?: "split" | "stacked";
  /** When false, hides intro paragraph + Read more link. @default true */
  showMainCopy?: boolean;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

export function MinimalistHero({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  showHeader = true,
  heroLayout = "split",
  showMainCopy = true,
  className,
}: MinimalistHeroProps) {
  const imageBlock = (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center md:min-h-0">
      <motion.img
        src={imageSrc}
        alt={imageAlt}
        className="relative z-10 h-auto w-56 scale-150 object-cover md:w-64 lg:w-72"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: heroLayout === "stacked" ? 0.4 : 0.4 }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src =
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop";
        }}
      />
    </div>
  );

  const headline = (
    <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl">
      {overlayText.part1}
      <br />
      {overlayText.part2}
    </h1>
  );

  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center overflow-hidden bg-background p-8 font-sans md:p-12",
        className,
      )}
    >
      {showHeader ? (
        <header className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wider"
          >
            {logoText}
          </motion.div>
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            type="button"
            className="flex flex-col space-y-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </motion.button>
        </header>
      ) : null}

      {heroLayout === "stacked" ? (
        <div className="relative flex w-full max-w-7xl flex-grow flex-col items-center justify-center gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: showHeader ? 1 : 0.15 }}
            className="z-20 w-full px-2 text-center"
          >
            {headline}
          </motion.div>
          <div className="relative w-full max-w-2xl shrink-0">{imageBlock}</div>
          {showMainCopy ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showHeader ? 1.1 : 0.45 }}
              className="z-20 max-w-md text-center"
            >
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80">{mainText}</p>
              <a
                href={readMoreLink}
                className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font"
              >
                Read More
              </a>
            </motion.div>
          ) : null}
        </div>
      ) : (
        <div
          className={cn(
            "relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center",
            showMainCopy ? "md:grid-cols-3" : "md:grid-cols-2",
          )}
        >
          {showMainCopy ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="z-20 order-2 text-center md:order-1 md:text-left"
            >
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
              <a
                href={readMoreLink}
                className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font"
              >
                Read More
              </a>
            </motion.div>
          ) : null}

          <div
            className={cn(
              "relative flex h-full items-center justify-center",
              showMainCopy ? "order-1 md:order-2" : "order-1 md:col-span-1",
            )}
          >
            {imageBlock}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: showMainCopy ? 1.2 : 0.6 }}
            className={cn(
              "z-20 flex items-center justify-center text-center",
              showMainCopy ? "order-3 md:justify-start" : "order-2 md:justify-center",
            )}
          >
            {headline}
          </motion.div>
        </div>
      )}
    </div>
  );
}
