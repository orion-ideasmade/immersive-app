"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TEXT_UNIFIED =
  "text-[clamp(1.35rem,3.8vw,1.85rem)] font-normal leading-snug tracking-tight text-white";

export interface BenefitSlide {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

export interface BenefitIntroductionProps {
  videoSrc?: string;
  videoPoster?: string;
  slides?: BenefitSlide[];
  /** Pinned scroll distance in px (ScrollTrigger `end`). @default 1800 */
  scrollDistance?: number;
  className?: string;
}

const defaultSlides: BenefitSlide[] = [
  {
    id: "1",
    title: "A weightless yet potent evolution",
    subtitle: "The formulation’s lightweight texture belies its efficacy",
  },
  {
    id: "2",
    title: "Lorem Ipsum 2",
  },
  {
    id: "3",
    title: "Lorem Ipsum 3",
  },
];

export function BenefitIntroduction({
  videoSrc = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  videoPoster,
  slides = defaultSlides,
  scrollDistance = 1800,
  className,
}: BenefitIntroductionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inners = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-benefit-inner]"));

    const ctx = gsap.context(() => {
      if (!inners.length) return;

      gsap.set(inners, { opacity: 0, autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.65,
          onUpdate: (self) => {
            const vid = videoRef.current;
            if (vid?.duration && Number.isFinite(vid.duration)) {
              vid.currentTime = self.progress * vid.duration;
            }
          },
        },
      });

      const fadeIn = 0.55;
      const fadeOut = 0.4;
      const gap = 0.12;

      for (let i = 0; i < inners.length; i++) {
        const el = inners[i];
        const isLast = i === inners.length - 1;

        tl.to(el, { opacity: 1, autoAlpha: 1, duration: fadeIn });

        if (!isLast) {
          tl.to(el, { opacity: 0, autoAlpha: 0, duration: fadeOut }, `+=${gap}`);
        }
      }
    }, root);

    return () => ctx.revert();
  }, [slides, scrollDistance]);

  return (
    <div ref={rootRef} className={cn("relative h-screen w-full overflow-hidden bg-black", className)}>
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-screen w-full object-cover"
          poster={videoPoster}
          muted
          playsInline
          preload="metadata"
          src={videoSrc}
        />
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 w-[min(70vw,42rem)] max-w-full -translate-x-1/2 -translate-y-1/2 px-6 text-center"
          >
            <div data-benefit-title className="flex flex-col items-center justify-center">
              <div data-benefit-inner className="w-full">
                <p className={cn(TEXT_UNIFIED, slide.subtitle ? "mb-5" : "")}>{slide.title}</p>
                {slide.subtitle ? <p className={TEXT_UNIFIED}>{slide.subtitle}</p> : null}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
