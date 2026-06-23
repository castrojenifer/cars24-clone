import React, { useState } from "react";
import { Wallet, Sparkles, AlertCircle, History } from "lucide-react";
import { toast } from "sonner";
import { ReferralTransaction } from "@/hooks/useReferral";

interface WalletCardProps {
  walletPoints: number;
  transactionHistory: ReferralTransaction[];
  onRedeem: (points: number) => {
    success: boolean;
    discountAmount?: number;
    discountCode?: string;
    message: string;
  };
}

export default function WalletCard({
  walletPoints,
  transactionHistory,
  onRedeem,
}: WalletCardProps) {
  const [pointsInput, setPointsInput] = useState("");
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);
  const [redeemedAmount, setRedeemedAmount] = useState<number | null>(null);

  const cashValue = (walletPoints / 100) * 500;

  const handleRedeemClick = (e: React.FormEvent) => {
    e.preventDefault();
    const pts = parseInt(pointsInput, 10);
    if (isNaN(pts) || pts <= 0) {
      toast.error("Please enter a valid number of points.");
      return;
    }

    const res = onRedeem(pts);
    if (res.success) {
      toast.success(res.message);
      setRedeemedCode(res.discountCode || null);
      setRedeemedAmount(res.discountAmount || null);
      setPointsInput("");
    } else {
      toast.error(res.message);
    }
  };

  const formatDate = (ts: number): string => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-6 text-black space-y-6">
      {/* Wallet Balance Summary */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-100 text-blue-600 rounded-full shrink-0">
          <Wallet className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-800">Your Wallet</h2>
          <p className="text-xs text-gray-500 font-medium">
            Redeem points for discounts on your next booking.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 text-white shadow-xs">
        <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
          Available Balance
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-4xl font-extrabold">{walletPoints}</p>
          <span className="text-sm font-semibold opacity-90">Points</span>
        </div>
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold">
          <span className="opacity-75">Voucher Value</span>
          <span className="text-sm bg-white/20 px-2.5 py-0.5 rounded-full">
            ≈ ₹{cashValue.toLocaleString("en-IN")} Off
          </span>
        </div>
      </div>

      {/* Redemption Form */}
      <form onSubmit={handleRedeemClick} className="space-y-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">
            Redeem Points
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="e.g. 100, 200, 500"
              value={pointsInput}
              onChange={(e) => setPointsInput(e.target.value)}
              className="grow px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-xs font-semibold shadow-xs hover:shadow-md transition-colors cursor-pointer"
            >
              Redeem
            </button>
          </div>
        </div>

        {/* Rules hint */}
        <div className="flex items-start gap-1.5 text-[10px] text-gray-500 leading-normal">
          <AlertCircle className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
          <span>
            Min: 100 pts | Multiples of 100 only | 100 points = ₹500 discount voucher
          </span>
        </div>
      </form>

      {/* Generated Code Alert */}
      {redeemedCode && redeemedAmount && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-850 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Voucher Code Claimed!</span>
          </div>
          <p className="leading-normal">
            Use code <strong className="font-mono bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded-sm">{redeemedCode}</strong> to save <strong>₹{redeemedAmount.toLocaleString("en-IN")}</strong> at checkout.
          </p>
        </div>
      )}

      {/* Transaction History Table */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <History className="h-3.5 w-3.5" />
          <span>Wallet Activity</span>
        </h3>

        {transactionHistory.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4 bg-gray-50/50 rounded-lg">
            No wallet activities recorded yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left text-gray-600 border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-2">Date</th>
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Points</th>
                  <th className="py-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactionHistory.map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-2.5 font-medium whitespace-nowrap">
                      {formatDate(tx.timestamp)}
                    </td>
                    <td className="py-2.5 leading-normal max-w-[140px] pr-2">
                      <div>{tx.details}</div>
                      {tx.discountCode && (
                        <div className="text-[10px] font-mono text-emerald-600 mt-0.5">
                          Code: {tx.discountCode}
                        </div>
                      )}
                    </td>
                    <td
                      className={`py-2.5 text-right font-bold whitespace-nowrap ${
                        tx.points > 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {tx.points > 0 ? `+${tx.points}` : tx.points}
                    </td>
                    <td className="py-2.5 text-right font-semibold whitespace-nowrap">
                      {tx.balanceAfter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
