import React from "react";
import Link from "next/link";
import { ArrowLeft, Car, Sparkles, Award } from "lucide-react";

export default function NewCarsPlaceholder() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black font-sans">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
          <Car className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">New Cars Showroom</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            We are working directly with brand dealerships to bring direct ordering, live allocations, and custom builds online for you soon.
          </p>
        </div>

        {/* Mock Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-left pt-2">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <p className="font-semibold text-xs text-gray-800">Fresh Stock</p>
            <p className="text-[10px] text-gray-500">Latest 2026 releases and launches.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
            <Award className="h-4 w-4 text-emerald-600" />
            <p className="font-semibold text-xs text-gray-800">OEM Warranty</p>
            <p className="text-[10px] text-gray-500">Official manufacturer-backed warranty.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/buy-car"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Go to Buy Used Cars</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
