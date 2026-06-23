import React from "react";
import Link from "next/link";
import { ArrowLeft, Key, Calendar, MapPin } from "lucide-react";

export default function TestDrivePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black font-sans">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
          <Key className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-900">Book a Test Drive</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            Experience the ride before you make a decision. Book a free test drive session today!
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-left space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-semibold text-xs text-gray-800">Flexible Scheduling</p>
              <p className="text-[10px] text-gray-500">Pick any date and hour that matches your availability.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <MapPin className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-semibold text-xs text-gray-800">Home Delivery</p>
              <p className="text-[10px] text-gray-500">Get the test car delivered directly to your doorstep.</p>
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
