import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ClipboardCheck, Sparkles } from "lucide-react";

export default function CarInspectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black font-sans">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
          <ClipboardCheck className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">Vehicle Inspection Service</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            Get a professional 140+ point quality inspection check done by our expert technicians.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-left space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-semibold text-xs text-gray-800">140-Point Inspection</p>
              <p className="text-[10px] text-gray-500">Comprehensive diagnostic reports for engine, parts, and body.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <Sparkles className="h-5 w-5 text-orange-500" />
            <div>
              <p className="font-semibold text-xs text-gray-800">Value Estimation</p>
              <p className="text-[10px] text-gray-500">Get the exact scientific evaluation price of your vehicle.</p>
            </div>
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
