import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I buy a used car from Cars24?",
      answer: "Browse our inventory under 'Buy Used Car', choose a car, and complete your purchase process. You can choose to make a full payment or opt for finance/loan options.",
    },
    {
      question: "What is the 7-day money back guarantee?",
      answer: "If you are not satisfied with your car purchase, you can return it within 7 days for a full refund. Terms and conditions apply.",
    },
    {
      question: "How do I schedule a car inspection to sell my car?",
      answer: "Go to 'Sell Car' page, fill in your details, and book an appointment at your nearest inspection center or choose home inspection.",
    },
    {
      question: "What documents are required for buying or selling a car?",
      answer: "You will need a valid government ID (like Aadhaar/PAN), address proof, and bank statements if you are applying for a car loan.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black font-sans">
      <div className="max-w-2xl w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-sm text-gray-500">Find answers to common questions about buying, selling, and financing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 text-left font-semibold text-sm text-gray-800 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
              </button>
              {openIndex === index && (
                <div className="px-5 py-4 text-xs text-gray-600 border-t border-gray-100 bg-white leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 text-center">
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
