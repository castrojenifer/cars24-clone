import React from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Percent, Award } from "lucide-react";

export default function CreditCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black font-sans">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center">
          <CreditCard className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">Co-Branded Credit Cards</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            Compare and choose fuel-saving reward cards, premium travel benefits, and cashbacks.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-left space-y-3">
          <div className="flex items-center gap-3">
            <Percent className="h-5 w-5 text-orange-500" />
            <div>
              <p className="font-semibold text-xs text-gray-800">Fuel Surcharge Waiver</p>
              <p className="text-[10px] text-gray-500">Save up to 3% annually on fuel spends across stations.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <Award className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-semibold text-xs text-gray-800">Exclusive Reward Points</p>
              <p className="text-[10px] text-gray-500">Collect points on everyday spends, redeemable for servicing.</p>
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
