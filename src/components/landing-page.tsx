"use client";

import { BenefitIntroduction } from "@/components/sections/benefit-introduction";
import { HeroWithOrderCard } from "@/components/sections/hero-with-order-card";
import { FeaturesSection } from "@/components/sections/features-section";
import { InfiniteTextMarquee } from "@/components/ui/infinite-text-marquee";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { SmoothScrollHero } from "@/components/ui/smooth-scroll-hero";
import {
  landingContent,
  getBenefitIntroductionProps,
  getFeaturesSectionProps,
  getOrderCardProps,
  getOrderHeroProps,
  getSharedHeroProps,
} from "@/content/landing";

export function LandingPage() {
  const heroProps = getSharedHeroProps();
  const { marquee, parallax, orderSection, footer } = landingContent;

  return (
    <div className="bg-background text-foreground min-w-0">
      <section id="hero" className="scroll-mt-0">
        <MinimalistHero {...heroProps} />
      </section>

      <section id="benefits" className="scroll-mt-0">
        <BenefitIntroduction {...getBenefitIntroductionProps()} />
      </section>

      <section id="features" className="scroll-mt-0">
        <FeaturesSection {...getFeaturesSectionProps()} />
      </section>

      <section id="marquee" className="scroll-mt-0 border-y border-border/60">
        <InfiniteTextMarquee
          text={marquee.text}
          link={marquee.link}
          speed={marquee.speed}
          tooltipText={marquee.tooltipText}
          fontSize={marquee.fontSize}
          hoverColor={marquee.hoverColor}
          showTooltip={marquee.showTooltip}
        />
      </section>

      <SmoothScrollHero
        scrollHeight={parallax.scrollHeight}
        desktopImage={parallax.desktopImage}
        mobileImage={parallax.mobileImage}
        initialClipPercentage={parallax.initialClipPercentage}
        finalClipPercentage={parallax.finalClipPercentage}
      />

      <section
        id="hero-order"
        className="scroll-mt-0 overflow-hidden bg-white text-gray-900"
        aria-label={orderSection.sectionAriaLabel}
      >
        <HeroWithOrderCard heroProps={getOrderHeroProps()} orderCardProps={getOrderCardProps()} />
      </section>

      <footer className="text-muted-foreground border-border/60 border-t py-16 text-center text-sm">
        {footer.text}
      </footer>
    </div>
  );
}
