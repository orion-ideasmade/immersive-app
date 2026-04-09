/**
 * Product landing content — sourced from PDP-copy-test (Fleur du Mal EDP).
 * Edit here to change copy and imagery.
 */

import type { BenefitIntroductionProps, BenefitSlide } from "@/components/sections/benefit-introduction";
import type { FeaturesSectionProps } from "@/components/sections/features-section";
import type { MinimalistHeroProps } from "@/components/ui/minimalist-hero";
import type { OrderProductCardProps } from "@/components/ui/order-product-card";

export type NavLink = { label: string; href: string };

export type StorySlide = {
  id: string;
  image: string;
  title: string;
  body: string;
};

/** Features scroll crossfade expects exactly three slides. */
export type StorySlidesTriple = readonly [StorySlide, StorySlide, StorySlide];

export type VariantOption = { value: string; label: string };

export const landingContent = {
  navigation: {
    links: [
      { label: "PRODUCT", href: "#hero" },
      { label: "STORY", href: "#benefits" },
      { label: "DETAILS", href: "#features" },
      { label: "SHOP", href: "#hero-order" },
    ] satisfies NavLink[],
  },

  hero: {
    logoText: "Dries Van Noten",
    mainText: "A floral scent combining osmanthus and suede.",
    readMoreLink: "#benefits",
    imageSrc: "/I-068213-m1-DriesVanNoten-RockTheMyrrhEDP.webp",
    imageAlt: "Dries Van Noten fragrance bottle in soft light.",
    overlayText: {
      part1: "Fleur",
      part2: "du Mal.",
    },
  } satisfies Omit<
    MinimalistHeroProps,
    "navLinks" | "showHeader" | "heroLayout" | "showMainCopy" | "className"
  >,

  /** Stacked hero image in `#hero-order` (shop block). Independent from `hero`. */
  heroOrder: {
    imageSrc: "/I-068210-A1-DriesVanNoten-FleurduMalEDP-100ml.webp",
    imageAlt: "Fleur du Mal Eau de Parfum bottle in soft light.",
  },

  benefits: {
    scrollDistance: 1800,
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    videoPoster: undefined,
    /** Scroll-story beats: perfumer intent → notes → care & ritual */
    slides: [
      {
        id: "1",
        title: "The perfumer’s view",
        subtitle:
          "“I wanted to create a perfume of contrast using osmanthus which has a duality and unexpected quality. It appears innocent but it can be very sensual, almost animalic; this flower, that seems to be an angel, can turn devilish.” — Quentin Bisch.",
      },
      {
        id: "2",
        title: "Fragrance architecture",
        subtitle:
          "Top: Peach Juice · Heart: Osmanthus and Jasmine · Base: Suede and Amber.",
      },
      {
        id: "3",
        title: "Wear it your way",
        subtitle:
          "Spray onto pulse points as desired. Refillable: unscrew the pump with the key, use the funnel to pour refill, reattach the spray applicator and cap.",
      },
    ] satisfies BenefitSlide[],
  },

  features: {
    sectionAriaLabel: "Product details",
    mobileCarouselAriaLabel: "Product story slides",
    /** Section background — any CSS hex (e.g. #d9d8cf, #ebe8e0). */
    backgroundHex: "#d9d8cf",
    storySlides: [
      {
        id: "mecca-view",
        image: "dvn-memo-lipstick-case.webp",
        title: "What you need to know",
        body:
          "The MECCA view — “I wanted to create a perfume of contrast using osmanthus which has a duality and unexpected quality. It appears innocent but it can be very sensual, almost animalic; this flower, that seems to be an angel, can turn devilish.” — Quentin Bisch.",
      },
      {
        id: "notes",
        image: "memo-team-mecca-favourite-beauty-thumbnail-portrait-3x4.webp",
        title: "Fragrance notes",
        body:
          "Top Note: Peach Juice. Heart Note: Osmanthus and Jasmine. Base Note: Suede and Amber.",
      },
      {
        id: "other-details",
        image: "dvn-memo-hand-creams.webp",
        title: "Other details",
        body:
          "Usage — Spray onto pulse points as desired. To Refill: Unscrew the pump with the key provided, use the funnel to pour the refill, reattach the spray applicator and cap. Item Code: V-068210. Ingredients include alcohol denat., parfum (fragrance), aqua (water), and allergens as listed on pack.",
      },
    ] satisfies StorySlidesTriple,
  },

  marquee: {
    text: "Fleur du Mal — Dries Van Noten",
    link: "#hero-order",
    speed: 28,
    tooltipText: "Add to bag — Eau de Parfum",
    fontSize: "clamp(2rem, 8vw, 5rem)",
    hoverColor: "oklch(0.45 0.08 15)",
    showTooltip: true,
  },

  parallax: {
    scrollHeight: 1500,
    desktopImage: "memo-best-dries-van-noten-beauty-16x9-hero.webp",
    mobileImage: "memo-best-dries-van-noten-beauty-16x9-hero.webp",
    initialClipPercentage: 25,
    finalClipPercentage: 75,
  },

  orderSection: {
    sectionAriaLabel: "Purchase",
  },

  orderCard: {
    /** Paths are under `immersive-app/public/` (leading `/` optional). */
    productImageSrc: "I-068213-m1-DriesVanNoten-RockTheMyrrhEDP.webp",
    productImageAlt: "Fleur du Mal Eau de Parfum",
    productName: "Fleur du Mal Eau de Parfum",
    tagline: "A floral scent combining osmanthus and suede.",
    retailPriceLabel: "Price",
    depositPriceLabel: "Shipping & returns",
    retailPrice: "$485.00 – $545.00",
    depositPrice: "Complimentary",
    variantLabel: "50 ml — $485.00",
    variantThumbSrc: "I-068213-m1-DriesVanNoten-RockTheMyrrhEDP.webp",
    variantOptions: [
      { value: "50-485", label: "50 ml — $485.00" },
      { value: "100-545", label: "100 ml — $545.00" },
    ] satisfies VariantOption[],
    finishFieldLabel: "Size",
    ctaLabel: "Add to bag",
    termsHref: "#",
    privacyHref: "#",
    legal: {
      prefix: "By clicking",
      ctaPhrase: "Add to bag",
      middle: " you agree to our ",
      termsLabel: "shipping & returns",
      conjunction: " and ",
      privacyLabel: "privacy policy",
      suffix: ". Free shipping & returns where applicable.",
    },
    infoButtonAriaLabel: "Fragrance details",
  },

  footer: {
    text: "Fleur du Mal Eau de Parfum · Dries Van Noten · Find in store · Click & Collect where available",
  },
};

/** Primary `#hero` — full nav + split layout. */
export function getSharedHeroProps(): MinimalistHeroProps {
  const { navigation, hero } = landingContent;
  return {
    logoText: hero.logoText,
    navLinks: navigation.links,
    mainText: hero.mainText,
    readMoreLink: hero.readMoreLink,
    imageSrc: hero.imageSrc,
    imageAlt: hero.imageAlt,
    overlayText: hero.overlayText,
  };
}

/** `#hero-order` stacked hero — same headline/copy wiring, separate product image. */
export function getOrderHeroProps(): MinimalistHeroProps {
  const { navigation, hero, heroOrder } = landingContent;
  return {
    logoText: hero.logoText,
    navLinks: navigation.links,
    mainText: hero.mainText,
    readMoreLink: hero.readMoreLink,
    imageSrc: heroOrder.imageSrc,
    imageAlt: heroOrder.imageAlt,
    overlayText: hero.overlayText,
  };
}

/** Props for `BenefitIntroduction` from `landingContent.benefits`. */
export function getBenefitIntroductionProps(): BenefitIntroductionProps {
  const b = landingContent.benefits;
  return {
    videoSrc: b.videoSrc,
    videoPoster: b.videoPoster,
    slides: b.slides,
    scrollDistance: b.scrollDistance,
  };
}

/** Props for `FeaturesSection` from `landingContent.features`. */
export function getFeaturesSectionProps(): FeaturesSectionProps {
  const f = landingContent.features;
  return {
    slides: f.storySlides,
    sectionAriaLabel: f.sectionAriaLabel,
    mobileCarouselAriaLabel: f.mobileCarouselAriaLabel,
    backgroundHex: f.backgroundHex,
  };
}

/** Props for `OrderProductCard` from `landingContent.orderCard`. */
export function getOrderCardProps(): OrderProductCardProps {
  const oc = landingContent.orderCard;
  return {
    productImageSrc: oc.productImageSrc,
    productImageAlt: oc.productImageAlt,
    productName: oc.productName,
    tagline: oc.tagline,
    retailPriceLabel: oc.retailPriceLabel,
    depositPriceLabel: oc.depositPriceLabel,
    retailPrice: oc.retailPrice,
    depositPrice: oc.depositPrice,
    variantLabel: oc.variantLabel,
    variantThumbSrc: oc.variantThumbSrc,
    variantOptions: oc.variantOptions,
    finishFieldLabel: oc.finishFieldLabel,
    ctaLabel: oc.ctaLabel,
    termsHref: oc.termsHref,
    privacyHref: oc.privacyHref,
    legal: oc.legal,
    infoButtonAriaLabel: oc.infoButtonAriaLabel,
  };
}
