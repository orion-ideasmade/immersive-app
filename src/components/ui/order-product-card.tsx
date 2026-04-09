"use client";

import { ChevronDown, CornerDownLeft, Info } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type OrderVariantOption = { value: string; label: string };

export type OrderLegalCopy = {
  prefix: string;
  ctaPhrase: string;
  middle: string;
  termsLabel: string;
  conjunction: string;
  privacyLabel: string;
  suffix: string;
};

function normalizeImageSrc(src: string): string {
  const s = src.trim();
  if (!s) return s;
  if (/^https?:\/\//i.test(s) || s.startsWith("//")) return s;
  return s.startsWith("/") ? s : `/${s}`;
}

export type OrderProductCardProps = {
  className?: string;
  /** Main product image — HTTPS URL or file in `public/` (`/photo.webp` or `photo.webp`). */
  productImageSrc?: string;
  /** Alt for product photo (accessibility). */
  productImageAlt?: string;
  productName?: string;
  tagline?: string;
  retailPriceLabel?: string;
  depositPriceLabel?: string;
  retailPrice?: string;
  depositPrice?: string;
  variantLabel?: string;
  /** Thumbnail in variant row — remote URL or `public/` path (see `productImageSrc`). */
  variantThumbSrc?: string;
  /** Populates the finish `<select>`; first option should match `variantLabel` if set. */
  variantOptions?: OrderVariantOption[];
  /** Visually hidden label for the variant field. */
  finishFieldLabel?: string;
  ctaLabel?: string;
  termsHref?: string;
  privacyHref?: string;
  legal?: OrderLegalCopy;
  infoButtonAriaLabel?: string;
  onPreOrder?: () => void;
};

const defaultLegal: OrderLegalCopy = {
  prefix: "By clicking",
  ctaPhrase: "Pre-Order Now",
  middle: " you agree to the ",
  termsLabel: "terms",
  conjunction: " and ",
  privacyLabel: "privacy policy",
  suffix: ".",
};

export function OrderProductCard({
  className,
  productImageSrc = "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&h=1125&fit=crop&q=85",
  productImageAlt,
  productName = "Orion",
  tagline = "Reserve your place in the next evolution of sound.",
  retailPriceLabel = "Retail Price:",
  depositPriceLabel = "Deposit Today:",
  retailPrice = "€1,499",
  depositPrice = "€250",
  variantLabel = "Walnut / Copper",
  variantThumbSrc = "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=96&h=96&fit=crop&q=80",
  variantOptions = [
    { value: "Walnut / Copper", label: "Walnut / Copper" },
    { value: "Oak / Brass", label: "Oak / Brass" },
    { value: "Matte Black", label: "Matte Black" },
  ],
  finishFieldLabel = "Finish",
  ctaLabel = "Pre-Order Now",
  termsHref = "#",
  privacyHref = "#",
  legal = defaultLegal,
  infoButtonAriaLabel = "More information",
  onPreOrder,
}: OrderProductCardProps) {
  const imageAlt = productImageAlt ?? `${productName} product`;
  const mainSrc = normalizeImageSrc(productImageSrc);
  const thumbSrc = normalizeImageSrc(variantThumbSrc);

  return (
    <div
      id="order2"
      data-component="order-form"
      className={cn(
        "relative w-full max-w-[93rem] overflow-hidden rounded-[1.75rem] bg-[#f7f7f7] p-6 text-neutral-900 shadow-sm sm:p-8 md:rounded-[2rem] md:p-10 lg:p-12",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-10 lg:gap-14">
        <div className="relative order-1 min-h-0 w-full md:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-200/80 md:aspect-[4/5] md:min-h-[min(70vh,520px)] lg:min-h-[440px]">
            <Image
              src={mainSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="order-2 flex min-h-0 flex-col justify-center md:order-2">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
              Order {productName}
            </h2>
            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-base leading-snug text-neutral-700 sm:text-lg">
              <span>{tagline}</span>
              <button
                type="button"
                className="inline-flex shrink-0 text-neutral-500 transition-colors hover:text-neutral-800"
                aria-label={infoButtonAriaLabel}
              >
                <Info className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2} />
              </button>
            </p>
          </div>

          <div className="mt-8 space-y-0">
            <div className="h-px bg-neutral-300/90" />
            <div className="flex flex-wrap items-center justify-between gap-2 py-4 text-sm text-neutral-800 sm:text-base">
              <span>{retailPriceLabel}</span>
              <span className="font-medium tabular-nums">{retailPrice}</span>
            </div>
            <div className="h-px bg-neutral-300/90" />
            <div className="flex flex-wrap items-center justify-between gap-2 py-4 text-sm text-neutral-800 sm:text-base">
              <span>{depositPriceLabel}</span>
              <span className="font-bold tabular-nums text-neutral-900">{depositPrice}</span>
            </div>
            <div className="h-px bg-neutral-300/90" />
          </div>

          <div className="relative mt-6">
            <label htmlFor="order-variant" className="sr-only">
              {finishFieldLabel}
            </label>
            <div className="relative flex items-center gap-3 rounded-full bg-[#E8E4DC] px-3 py-3 pl-3 sm:px-4 sm:py-3.5">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-neutral-900/10 bg-neutral-300 sm:h-10 sm:w-10">
                <Image
                  src={thumbSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <select
                id="order-variant"
                defaultValue={variantLabel}
                className="w-full flex-1 cursor-pointer appearance-none bg-transparent py-1 pr-10 text-sm font-medium text-neutral-900 outline-none sm:text-base"
              >
                {variantOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600 sm:right-5"
                aria-hidden
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onPreOrder}
            className="mt-6 flex w-full items-center justify-between gap-4 rounded-full bg-[#1C1917] px-5 py-4 text-left text-white transition-[transform,box-shadow] hover:bg-neutral-900 active:scale-[0.99] sm:px-6 sm:py-4"
          >
            <span className="text-base font-medium sm:text-lg">{ctaLabel}</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1C1917]">
              <CornerDownLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </span>
          </button>

          <p className="mt-5 text-center text-[0.7rem] leading-relaxed text-neutral-500 sm:text-xs">
            {legal.prefix} &apos;{legal.ctaPhrase}&apos;{legal.middle}
            <a href={termsHref} className="underline underline-offset-2 hover:text-neutral-700">
              {legal.termsLabel}
            </a>
            {legal.conjunction}
            <a href={privacyHref} className="underline underline-offset-2 hover:text-neutral-700">
              {legal.privacyLabel}
            </a>
            {legal.suffix}
          </p>
        </div>
      </div>
    </div>
  );
}
