import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export interface ReferralTransaction {
  id: string;
  type: "referred_signup" | "purchase_completed" | "redemption";
  points: number;
  balanceAfter: number;
  timestamp: number;
  details: string;
  discountCode?: string;
}

export default function useReferral() {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [history, setHistory] = useState<ReferralTransaction[]>([]);

  useEffect(() => {
    // Generate code
    let code = localStorage.getItem("cars24_referral_code");
    if (!code) {
      if (user && user.id) {
        code = "CARS" + user.id.slice(-4).toUpperCase();
      } else {
        code =
          "CARS" +
          Math.random().toString(36).substring(2, 6).toUpperCase();
      }
      localStorage.setItem("cars24_referral_code", code);
    }
    setReferralCode(code);

    // Get wallet points
    const storedPoints = localStorage.getItem("cars24_wallet_points");
    if (storedPoints !== null) {
      setPoints(parseInt(storedPoints, 10));
    } else {
      localStorage.setItem("cars24_wallet_points", "0");
      setPoints(0);
    }

    // Get history
    const storedHistory = localStorage.getItem("cars24_referral_history");
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Error parsing referral history", e);
      }
    }
  }, [user]);

  const saveState = (
    newPoints: number,
    newHistory: ReferralTransaction[]
  ) => {
    setPoints(newPoints);
    setHistory(newHistory);
    localStorage.setItem("cars24_wallet_points", newPoints.toString());
    localStorage.setItem("cars24_referral_history", JSON.stringify(newHistory));
  };

  const addReferralPoints = (
    type: "referred_signup" | "purchase_completed",
    friendName?: string
  ) => {
    const ptsToAdd = type === "referred_signup" ? 50 : 200;
    const details =
      type === "referred_signup"
        ? `Referral Signup: ${friendName || "A friend"} registered using your code`
        : `Purchase Completed: ${friendName || "A friend"} purchased a car using your code`;

    const newPoints = points + ptsToAdd;
    const newTx: ReferralTransaction = {
      id: `tx-${Math.random().toString(36).substring(2, 9)}`,
      type,
      points: ptsToAdd,
      balanceAfter: newPoints,
      timestamp: Date.now(),
      details,
    };

    saveState(newPoints, [newTx, ...history]);
  };

  const redeemPoints = (
    pointsToRedeem: number
  ): {
    success: boolean;
    discountAmount?: number;
    discountCode?: string;
    message: string;
  } => {
    if (pointsToRedeem < 100) {
      return { success: false, message: "Minimum redemption is 100 points." };
    }
    if (pointsToRedeem % 100 !== 0) {
      return {
        success: false,
        message: "Points must be redeemed in multiples of 100.",
      };
    }
    if (pointsToRedeem > points) {
      return {
        success: false,
        message: `Insufficient points. You have ${points} points.`,
      };
    }

    const discountAmount = (pointsToRedeem / 100) * 500;
    const discountCode =
      "DISC-" +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    const newPoints = points - pointsToRedeem;
    const newTx: ReferralTransaction = {
      id: `tx-${Math.random().toString(36).substring(2, 9)}`,
      type: "redemption",
      points: -pointsToRedeem,
      balanceAfter: newPoints,
      timestamp: Date.now(),
      details: `Redeemed ${pointsToRedeem} points for ₹${discountAmount} discount`,
      discountCode,
    };

    saveState(newPoints, [newTx, ...history]);
    return {
      success: true,
      discountAmount,
      discountCode,
      message: `Redeemed ${pointsToRedeem} points successfully! Code: ${discountCode}`,
    };
  };

  return {
    referralCode,
    walletPoints: points,
    transactionHistory: history,
    addReferralPoints,
    redeemPoints,
  };
}
