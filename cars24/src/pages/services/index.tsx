import React from "react";
import Link from "next/link";
import { ArrowLeft, Wrench, ShieldAlert, Sparkles } from "lucide-react";

export default function ServicesPlaceholder() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black font-sans">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
          <Wrench className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">Car Services & Servicing</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our car spa, scheduled maintenance packages, and standard workshop booking modules are currently being optimized to support online appointment bookings.
          </p>
        </div>

        {/* Mock Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-left pt-2">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <p className="font-semibold text-xs text-gray-800">Car Spa & Detailing</p>
            <p className="text-[10px] text-gray-500">Premium washing, coating, and waxing packages.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
            <ShieldAlert className="h-4 w-4 text-blue-600" />
            <p className="font-semibold text-xs text-gray-800">140+ Inspections</p>
            <p className="text-[10px] text-gray-500">Scheduled checks & comprehensive diagnostics.</p>
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
