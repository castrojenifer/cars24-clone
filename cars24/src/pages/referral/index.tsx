import React from "react";
import useReferral from "@/hooks/useReferral";
import ReferralCard from "@/components/referral/ReferralCard";
import WalletCard from "@/components/referral/WalletCard";
import { Gift } from "lucide-react";

export default function ReferralPage() {
  const {
    referralCode,
    walletPoints,
    transactionHistory,
    addReferralPoints,
    redeemPoints,
  } = useReferral();

  const handleSimulate = (friendName: string) => {
    addReferralPoints("referred_signup", friendName);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black py-8 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full shrink-0">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
              Refer & Earn Rewards 🎁
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Invite friends to buy a car on Cars24 Clone. Earn points and cash them out for vouchers!
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <ReferralCard
            referralCode={referralCode}
            onSimulateReferral={handleSimulate}
          />
          <WalletCard
            walletPoints={walletPoints}
            transactionHistory={transactionHistory}
            onRedeem={redeemPoints}
          />
        </div>
      </div>
    </div>
  );
}
