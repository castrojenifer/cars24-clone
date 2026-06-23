import React from "react";
import { AlertTriangle, ShieldCheck, Wrench, Calendar, Info } from "lucide-react";

interface MaintenanceCostEstimatorProps {
  year: number;
  km: string;
  brand: string;
}

export default function MaintenanceCostEstimator({
  year,
  km,
  brand,
}: MaintenanceCostEstimatorProps) {
  const currentYear = new Date().getFullYear();
  const carAge = currentYear - year;
  const kmNum = parseInt(km.replace(/,/g, ""), 10) || 0;

  // Determine condition level
  let condition: "Low Maintenance" | "Moderate Maintenance" | "High Maintenance Expected" = "Low Maintenance";
  let badgeColor = "bg-green-100 text-green-700 border-green-200";

  if (carAge > 5 && kmNum > 80000) {
    condition = "High Maintenance Expected";
    badgeColor = "bg-red-100 text-red-700 border-red-200";
  } else if (carAge > 3 || kmNum > 50000) {
    condition = "Moderate Maintenance";
    badgeColor = "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  // Base monthly cost calculation
  const normalizedBrand = brand.trim().toLowerCase();
  let baseCost = 2300; // Default

  if (normalizedBrand.includes("maruti")) {
    baseCost = 1800;
  } else if (normalizedBrand.includes("hyundai")) {
    baseCost = 2200;
  } else if (normalizedBrand.includes("honda")) {
    baseCost = 2500;
  } else if (normalizedBrand.includes("tata")) {
    baseCost = 2000;
  }

  // Multiplier application
  let multiplier = 1.0;
  if (condition === "High Maintenance Expected") {
    multiplier = 1.6;
  } else if (condition === "Moderate Maintenance") {
    multiplier = 1.25;
  }

  const estimatedMonthlyCost = Math.round((baseCost * multiplier) / 100) * 100;

  // Generate 3 actionable insights
  const insights: Array<{ text: string; icon: React.ReactNode }> = [];

  if (kmNum > 70000) {
    insights.push({
      text: "Brake pads likely need replacement soon.",
      icon: <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0" />,
    });
  }

  if (kmNum > 40000) {
    const nextServiceKm = Math.max(0, 10000 - (kmNum % 10000));
    insights.push({
      text: `Next major service due in ${nextServiceKm.toLocaleString()} km.`,
      icon: <Wrench className="h-4.5 w-4.5 text-yellow-500 shrink-0" />,
    });
  } else {
    insights.push({
      text: "Engine oil & cabin filters recommended for annual replacement.",
      icon: <Wrench className="h-4.5 w-4.5 text-green-500 shrink-0" />,
    });
  }

  // If we only have 1 insight so far (e.g. km <= 40000), add general ones
  if (insights.length < 2) {
    insights.push({
      text: "Battery voltage and fluid levels check recommended annually.",
      icon: <Info className="h-4.5 w-4.5 text-blue-500 shrink-0" />,
    });
  }

  if (insights.length < 2) {
    // backup to ensure exactly 3 insights
    insights.push({
      text: "Spark plugs inspection suggested at regular intervals.",
      icon: <Info className="h-4.5 w-4.5 text-slate-500 shrink-0" />,
    });
  }

  // Always show tire replacement
  insights.push({
    text: "Tire replacement expected within 2 years.",
    icon: <Calendar className="h-4.5 w-4.5 text-blue-500 shrink-0" />,
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-6 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span>Maintenance Cost Estimator</span>
          <span>🔧</span>
        </h3>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColor}`}
        >
          {condition}
        </span>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Estimated Monthly Cost
          </p>
          <p className="text-3xl font-extrabold text-blue-600 mt-1">
            ₹{estimatedMonthlyCost.toLocaleString("en-IN")}
            <span className="text-sm font-medium text-gray-500"> / month</span>
          </p>
        </div>
        <p className="text-xs text-gray-500 max-w-[240px]">
          Estimated based on {brand} parts baseline, multiplied by age ({carAge} yr) and drive telemetry ({kmNum.toLocaleString()} km).
        </p>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
          Actionable Health Insights
        </h4>
        <ul className="space-y-2.5">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
              {insight.icon}
              <span>{insight.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
