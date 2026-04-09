"use client";

import type { MinimalistHeroProps } from "@/components/ui/minimalist-hero";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import type { OrderProductCardProps } from "@/components/ui/order-product-card";
import { OrderProductCard } from "@/components/ui/order-product-card";
import { cn } from "@/lib/utils";

type HeroWithOrderCardProps = {
  heroProps: MinimalistHeroProps;
  orderCardProps?: OrderProductCardProps;
  className?: string;
};

/**
 * Full-viewport hero plus a cream order card (reference layout: hero + #order2 grid).
 */
export function HeroWithOrderCard({ heroProps, orderCardProps, className }: HeroWithOrderCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-white",
        className,
      )}
    >
      <MinimalistHero
        {...heroProps}
        showHeader={false}
        heroLayout="stacked"
        showMainCopy={false}
        className={cn("bg-white", heroProps.className)}
      />
      <div className="relative z-10 flex w-full justify-center px-4 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8 lg:pb-32">
        <OrderProductCard {...orderCardProps} />
      </div>
    </div>
  );
}
