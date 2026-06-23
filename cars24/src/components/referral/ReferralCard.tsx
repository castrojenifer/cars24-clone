import React from "react";
import { Copy, Share2, Award, Users } from "lucide-react";
import { toast } from "sonner";

interface ReferralCardProps {
  referralCode: string;
  onSimulateReferral: (friendName: string) => void;
}

export default function ReferralCard({
  referralCode,
  onSimulateReferral,
}: ReferralCardProps) {
  const copyToClipboard = () => {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const shareText = `Use my code ${referralCode} on Cars24 Clone to get ₹500 off your first purchase!`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleSimulate = () => {
    const names = ["Aarav", "Priya", "Vikram", "Neha", "Kabir", "Anjali"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    onSimulateReferral(randomName);
    toast.success(`Referral simulation triggered for ${randomName}! +50 Points.`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-6 text-black space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-orange-100 text-orange-600 rounded-full shrink-0">
          <Share2 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            Invite Friends & Earn
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Share your unique code to start collecting wallet rewards.
          </p>
        </div>
      </div>

      {/* Code Display Box */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
            Your Referral Code
          </span>
          <p className="text-2xl font-mono font-extrabold text-blue-600 tracking-wider">
            {referralCode || "LOADING..."}
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={copyToClipboard}
            className="grow sm:grow-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy</span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grow sm:grow-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md text-xs font-semibold shadow-xs hover:shadow-md transition-all text-center cursor-pointer"
          >
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Rewards Breakdown */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50/50 border border-gray-100 flex gap-3">
            <Users className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs text-gray-800">
                1. Friend Signs Up
              </p>
              <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                You get <span className="font-bold text-blue-600">50 points</span> when they create their account.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50/50 border border-gray-100 flex gap-3">
            <Award className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs text-gray-800">
                2. Friend Buys a Car
              </p>
              <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                You get <span className="font-bold text-orange-600">200 points</span>, and your friend gets <span className="font-bold text-blue-600">100 points</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Section */}
      <div className="pt-4 border-t border-gray-100">
        <div className="bg-orange-50/40 border border-orange-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-semibold text-orange-950">
              Test the Referral Loop
            </p>
            <p className="text-orange-850 mt-0.5">
              Simulate another user signing up with your code to instantly claim points.
            </p>
          </div>
          <button
            onClick={handleSimulate}
            className="bg-orange-600 text-white hover:bg-orange-700 font-semibold px-4.5 py-2 rounded-md transition-colors cursor-pointer text-center"
          >
            Simulate Referral
          </button>
        </div>
      </div>
    </div>
  );
}
