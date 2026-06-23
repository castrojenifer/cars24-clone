import React from "react";
import { getDynamicPrice, formatPrice } from "@/lib/dynamicPricing";
import { Info } from "lucide-react";

interface DynamicPriceBadgeProps {
  title: string;
  price: string;
  location: string;
}

export default function DynamicPriceBadge({
  title,
  price,
  location,
}: DynamicPriceBadgeProps) {
  const { recommendedPrice, multiplier, reason } = getDynamicPrice(
    title,
    price,
    location
  );

  if (multiplier === 1.0) {
    return null;
  }

  return (
    <div className="relative group inline-flex items-center mt-1">
      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 cursor-help hover:bg-blue-200 transition-colors">
        <span>Recommended: {formatPrice(recommendedPrice)}</span>
        <Info className="h-3.5 w-3.5" />
      </span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs rounded-md p-2 w-56 z-50 shadow-xl border border-slate-700 text-center animate-in fade-in slide-in-from-bottom-2 duration-200">
        <p className="font-medium">{reason}</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
}
