"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StorySlidesTriple } from "@/content/landing";
import { landingContent } from "@/content/landing";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** `public/` paths work with or without a leading slash. */
function publicImageSrc(path: string): string {
  const s = path.trim();
  if (!s || /^https?:\/\//i.test(s) || s.startsWith("//")) return s;
  return s.startsWith("/") ? s : `/${s}`;
}

/** Piecewise linear crossfade (same breakpoints as previous Framer mapping, now GSAP-driven). */
function piecewiseLinear(p: number, xs: readonly number[], ys: readonly number[]): number {
  if (p <= xs[0]) return ys[0];
  for (let i = 0; i < xs.length - 1; i++) {
    if (p <= xs[i + 1]) {
      const t = (p - xs[i]) / (xs[i + 1] - xs[i]);
      return ys[i] + t * (ys[i + 1] - ys[i]);
    }
  }
  return ys[ys.length - 1];
}

function computeThreeImageOpacities(progress: number): [number, number, number] {
  const p = Math.min(1, Math.max(0, progress));
  const o0 = piecewiseLinear(p, [0, 0.28, 0.38], [1, 1, 0]);
  const o1 = piecewiseLinear(p, [0.22, 0.38, 0.58, 0.68], [0, 1, 1, 0]);
  const o2 = piecewiseLinear(p, [0.55, 0.68, 1], [0, 1, 1]);
  return [o0, o1, o2];
}

export type FeaturesSectionProps = {
  /** Exactly three slides for scroll crossfade + mobile carousel. */
  slides?: StorySlidesTriple;
  sectionAriaLabel?: string;
  mobileCarouselAriaLabel?: string;
  /** Section background color (hex string, e.g. `#d9d8cf`). */
  backgroundHex?: string;
  className?: string;
};

export function FeaturesSection({
  slides = landingContent.features.storySlides,
  sectionAriaLabel = landingContent.features.sectionAriaLabel,
  mobileCarouselAriaLabel = landingContent.features.mobileCarouselAriaLabel,
  backgroundHex = landingContent.features.backgroundHex,
  className,
}: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [mobileIndex, setMobileIndex] = useState(0);
  const slideCount = slides.length;

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const setOpacities = (progress: number) => {
        const [o0, o1, o2] = computeThreeImageOpacities(progress);
        const imgs = imageRefs.current;
        if (imgs[0]) gsap.set(imgs[0], { opacity: o0 });
        if (imgs[1]) gsap.set(imgs[1], { opacity: o1 });
        if (imgs[2]) gsap.set(imgs[2], { opacity: o2 });
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => setOpacities(self.progress),
      });

      setOpacities(trigger.progress);

      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(section);

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        ro.disconnect();
        window.removeEventListener("load", onLoad);
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, [slides]);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: backgroundHex }}
      className={cn("text-[#222] mb-[10vh] lg:mb-[20vh]", className)}
      aria-label={sectionAriaLabel}
    >
      <div className="relative hidden w-full flex-row flex-wrap justify-between lg:flex">
        <div className="sticky top-0 h-screen w-[50vw] shrink-0 overflow-hidden">
          {slides.map((slide, i) => (
            <img
              key={slide.id}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              src={publicImageSrc(slide.image)}
              alt=""
              className="absolute inset-0 block h-full w-full object-cover"
              style={{ opacity: i === 0 ? 1 : 0 }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <div className="w-full shrink-0 px-10 pt-0 lg:w-1/2 lg:max-w-[50%] lg:pl-10 lg:pr-10">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "flex min-h-screen flex-col justify-center",
                index === slideCount - 1 && "mb-[10vh]",
              )}
            >
              <h2 className="mb-0 max-w-none text-[30px] leading-[1.33] font-normal lg:ml-[60px] lg:mr-20">
                {slide.title}
              </h2>
              <div className="mt-6 max-w-none text-base leading-[1.7] text-[#222] lg:ml-[60px] lg:mr-20">
                {slide.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative w-full lg:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={mobileCarouselAriaLabel}
      >
        <div className="relative h-[min(85vh,720px)] w-full overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
                i === mobileIndex ? "z-10 opacity-100" : "z-0 opacity-0",
              )}
              style={{ backgroundImage: `url(${publicImageSrc(slide.image)})` }}
              aria-hidden={i !== mobileIndex}
            />
          ))}

          <div className="absolute right-0 bottom-8 left-0 z-20 flex w-full max-w-md flex-col justify-start px-10 pb-6 sm:bottom-12">
            <h2 className="mt-0 text-2xl leading-snug font-normal text-[#333]">
              {slides[mobileIndex]?.title}
            </h2>
            <p className="mt-3 text-base leading-[1.7] text-[#333]">
              {slides[mobileIndex]?.body}
            </p>
          </div>

          <button
            type="button"
            className="absolute top-1/2 left-3 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm"
            onClick={goNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="flex justify-center gap-2 py-4" role="tablist" aria-label="Slide indicators">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === mobileIndex}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === mobileIndex ? "bg-[#333]" : "bg-[#333]/30",
              )}
              onClick={() => setMobileIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
