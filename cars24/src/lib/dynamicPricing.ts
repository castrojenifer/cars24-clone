// Parse price string like "₹7.80 lakh" or "₹35,000" → number in rupees
export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const clean = priceStr.toLowerCase().replace(/,/g, "");
  const num = parseFloat(clean.replace(/[^\d.]/g, ""));
  if (clean.includes("lakh")) {
    return num * 100000;
  }
  return num;
}

// Determine region from location string
// "Mumbai" | "Delhi" | "Bangalore" | "Chennai" | "hilly" (Shimla, Manali, Ooty) → region
export function getRegionFromLocation(location: string): string {
  const loc = location.toLowerCase();
  if (loc.includes("delhi") || loc.includes("noida") || loc.includes("gurugram")) {
    return "Delhi";
  }
  if (loc.includes("mumbai") || loc.includes("thane")) {
    return "Mumbai";
  }
  if (loc.includes("bangalore") || loc.includes("bengaluru")) {
    return "Bangalore";
  }
  if (loc.includes("chennai")) {
    return "Chennai";
  }
  if (
    loc.includes("shimla") ||
    loc.includes("manali") ||
    loc.includes("ooty") ||
    loc.includes("hilly")
  ) {
    return "hilly";
  }
  return "other";
}

// Get current season
// June-Sept → 'monsoon', Dec-Feb → 'winter', Mar-May → 'summer', Oct-Nov → 'post_monsoon'
export function getCurrentSeason(): string {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
  if (month >= 5 && month <= 8) {
    return "monsoon";
  }
  if (month === 11 || month === 0 || month === 1) {
    return "winter";
  }
  if (month >= 2 && month <= 4) {
    return "summer";
  }
  return "post_monsoon";
}

// Apply multipliers:
// SUV/Fortuner/Creta/Innova keywords in title:
//   monsoon + hilly → ×1.12
//   monsoon → ×1.08
// Small hatchback (Swift/Alto/WagonR/Baleno) in metro + summer → ×0.95
// Any car winter → ×1.03
// Default → ×1.0
// Return { recommendedPrice: number, multiplier: number, reason: string }
export function getDynamicPrice(
  title: string,
  basePrice: string,
  location: string
): { recommendedPrice: number; multiplier: number; reason: string } {
  const base = parsePrice(basePrice);
  const region = getRegionFromLocation(location);
  const season = getCurrentSeason();

  const titleLower = title.toLowerCase();
  const isSUV =
    titleLower.includes("suv") ||
    titleLower.includes("fortuner") ||
    titleLower.includes("creta") ||
    titleLower.includes("innova") ||
    titleLower.includes("fronx") || // Fronx is also SUV/Crossover
    titleLower.includes("venue"); // Venue is also SUV/Crossover
  const isHatchback =
    titleLower.includes("swift") ||
    titleLower.includes("alto") ||
    titleLower.includes("wagonr") ||
    titleLower.includes("baleno") ||
    titleLower.includes("altroz");
  const isMetro = ["Delhi", "Mumbai", "Bangalore", "Chennai"].includes(region);

  let multiplier = 1.0;
  let reason = "Standard market pricing";

  if (isSUV && season === "monsoon" && region === "hilly") {
    multiplier = 1.12;
    reason = "High demand for SUVs in hilly terrain during monsoon season (+12%)";
  } else if (isSUV && season === "monsoon") {
    multiplier = 1.08;
    reason = "Increased demand for SUVs during monsoon season (+8%)";
  } else if (isHatchback && isMetro && season === "summer") {
    multiplier = 0.95;
    reason = "Summer promotional discount on compact hatchbacks in metro cities (-5%)";
  } else if (season === "winter") {
    multiplier = 1.03;
    reason = "Winter season pricing adjustment (+3%)";
  }

  const recommendedPrice = Math.round(base * multiplier);
  return { recommendedPrice, multiplier, reason };
}

// Format number back to "₹X.XX lakh"
export function formatPrice(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}
