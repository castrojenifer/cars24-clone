import React, { useEffect, useState } from "react";
import { MapPin, Navigation, Info } from "lucide-react";
import { toast } from "sonner";

interface LocationFilterProps {
  onCityChange: (city: string) => void;
  hasCarsMatched: boolean;
  selectedCity: string;
}

// Bounding box logic
function getCityFromCoords(lat: number, lng: number): string {
  if (lat >= 28.4 && lat <= 28.9 && lng >= 76.8 && lng <= 77.4) {
    return "Delhi NCR";
  }
  if (lat >= 18.8 && lat <= 19.3 && lng >= 72.7 && lng <= 73.1) {
    return "Mumbai";
  }
  if (lat >= 12.8 && lat <= 13.2 && lng >= 77.4 && lng <= 77.8) {
    return "Bangalore";
  }
  if (lat >= 12.9 && lat <= 13.3 && lng >= 80.1 && lng <= 80.4) {
    return "Chennai";
  }
  if (lat >= 8.8 && lat <= 9.2 && lng >= 77.3 && lng <= 77.7) {
    return "Tenkasi";
  }
  return "All Cities";
}

const SERVICE_CENTERS: Record<string, string[]> = {
  "Delhi NCR": [
    "Cars24 Hub - Metro Walk, Rohini",
    "Cars24 Workshop - Sec 29, Gurugram",
    "Cars24 Hub - Sec 63, Noida",
  ],
  Mumbai: [
    "Cars24 Mega Hub - Andheri West",
    "Cars24 Workshop - Bandra Kurla Complex",
    "Cars24 Hub - Majiwada, Thane",
  ],
  Bangalore: [
    "Cars24 Hub - Koramangala Outer Ring Rd",
    "Cars24 Workshop - Whitefield Main Rd",
    "Cars24 Service Center - Indiranagar",
  ],
  Chennai: [
    "Cars24 Hub - GN Chetty Rd, T. Nagar",
    "Cars24 Workshop - Kasturba Nagar, Adyar",
    "Cars24 Hub - Ekkaduthangal, Guindy",
  ],
  Tenkasi: [
    "Cars24 Hub - Courtallam Road, Tenkasi",
    "Cars24 Workshop - Tirunelveli Bypass",
    "Cars24 Agent Point - Tenkasi Town",
  ],
  Hyderabad: [
    "Cars24 Hub - Gachibowli Financial Dist",
    "Cars24 Workshop - Jubilee Hills Rd 36",
    "Cars24 Service - Secunderabad Club Rd",
  ],
  "All Cities": [
    "Cars24 Hub - Rohini, New Delhi",
    "Cars24 Hub - Andheri East, Mumbai",
    "Cars24 Hub - Koramangala, Bangalore",
  ],
};

const CITIES = [
  "All Cities",
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Tenkasi",
];

export default function LocationFilter({
  onCityChange,
  hasCarsMatched,
  selectedCity,
}: LocationFilterProps) {
  const [detecting, setDetecting] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const detected = getCityFromCoords(latitude, longitude);
        setDetecting(false);

        if (detected !== "All Cities") {
          onCityChange(detected);
          toast.success(`Location detected: ${detected}`);
        } else {
          onCityChange("All Cities");
          toast.info("Location detected outside service areas. Defaulted to All Cities.");
        }
      },
      (error) => {
        setDetecting(false);
        console.error("Geolocation error:", error);
        toast.error("Could not access location. Defaulting to All Cities.");
        onCityChange("All Cities");
      },
      { timeout: 8000 }
    );
  };

  // Run on mount
  useEffect(() => {
    detectLocation();
  }, []);

  const serviceHubs = SERVICE_CENTERS[selectedCity] || SERVICE_CENTERS["All Cities"];

  return (
    <div className="space-y-4 text-black mb-6">
      {/* City Selector Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Select Your Location
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {selectedCity === "All Cities"
                ? "Showing cars from all locations"
                : `Showing cars near ${selectedCity}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Geolocation trigger */}
          <button
            onClick={detectLocation}
            disabled={detecting}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold hover:bg-gray-50 disabled:opacity-50 text-gray-700 cursor-pointer"
          >
            <Navigation className={`h-3.5 w-3.5 ${detecting ? "animate-spin text-blue-600" : ""}`} />
            {detecting ? "Detecting..." : "Detect"}
          </button>

          {/* Select dropdown */}
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 focus:outline-hidden cursor-pointer"
          >
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fallback Message */}
      {!hasCarsMatched && selectedCity !== "All Cities" && (
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs leading-normal">
          <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <span>
            No cars available in <strong>{selectedCity}</strong> right now. Showing all available listings as a fallback.
          </span>
        </div>
      )}

      {/* Service Centers Map Placeholder Card */}
      <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none mt-1 shrink-0">📍</span>
          <div>
            <h3 className="font-semibold text-sm text-blue-900 leading-tight">
              Nearby Cars24 Service Centers in {selectedCity === "All Cities" ? "Metro Cities" : selectedCity}
            </h3>
            <p className="text-xs text-blue-700 mt-0.5 leading-normal">
              Book free test drives or get immediate assistance at any local center.
            </p>
          </div>
        </div>

        <ul className="text-xs text-blue-800 space-y-1 md:text-right shrink-0">
          {serviceHubs.map((center, idx) => (
            <li key={idx} className="flex items-center gap-1.5 md:justify-end">
              <span className="h-1.5 w-1.5 bg-blue-500 rounded-full shrink-0" />
              <span className="font-medium">{center}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
