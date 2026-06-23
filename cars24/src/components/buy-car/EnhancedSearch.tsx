import React, { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Car {
  id: string;
  title: string;
  km: string;
  fuel: string;
  transmission: string;
  owner: string;
  emi: string;
  price: string;
  location: string;
  image: string;
}

interface EnhancedSearchProps {
  cars: Car[];
  onFilter: (filtered: Car[]) => void;
}

function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase().replace(/\s+/g, "");
  const t = target.toLowerCase().replace(/\s+/g, "");
  let qIdx = 0;
  for (let tIdx = 0; tIdx < t.length; tIdx++) {
    if (t[tIdx] === q[qIdx]) {
      qIdx++;
      if (qIdx === q.length) return true;
    }
  }
  return q.length === 0;
}

export default function EnhancedSearch({ cars, onFilter }: EnhancedSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Advanced Filters State
  const [fuel, setFuel] = useState("All");
  const [mileage, setMileage] = useState(150000);
  const [year, setYear] = useState("All");
  const [transmission, setTransmission] = useState("All");

  const suggestionRef = useRef<HTMLDivElement>(null);

  // Debounce the query to prevent sluggishness during typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  // Click outside to close auto-suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute suggestions based on current query
  const suggestions = React.useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return cars
      .filter((car) => fuzzyMatch(q, car.title))
      .slice(0, 5)
      .map((car) => car.title);
  }, [query, cars]);

  // Apply filters and scoring logic
  useEffect(() => {
    let result = [...cars];

    // 1. Fuel Filter
    if (fuel !== "All") {
      result = result.filter(
        (car) => car.fuel.toLowerCase() === fuel.toLowerCase()
      );
    }

    // 2. Transmission Filter
    if (transmission !== "All") {
      result = result.filter((car) =>
        car.transmission.toLowerCase().includes(transmission.toLowerCase())
      );
    }

    // 3. Year Filter
    if (year !== "All") {
      result = result.filter((car) => {
        const match = car.title.match(/^(\d{4})/);
        const carYear = match ? match[1] : null;
        return carYear === year;
      });
    }

    // 4. Mileage Filter
    result = result.filter((car) => {
      const parsedKm = parseInt(car.km.replace(/,/g, ""), 10) || 0;
      return parsedKm <= mileage;
    });

    // 5. Query Filter & Scoring
    if (debouncedQuery.trim().length >= 2) {
      const q = debouncedQuery.trim().toLowerCase();
      const scored = result.map((car) => {
        let score = 0;
        const titleLower = car.title.toLowerCase();

        if (titleLower.includes(q)) {
          score += 3;
        } else if (fuzzyMatch(q, car.title)) {
          score += 2;
        }

        if (
          fuzzyMatch(q, car.fuel) ||
          fuzzyMatch(q, car.transmission) ||
          fuzzyMatch(q, car.location)
        ) {
          score += 1;
        }

        return { car, score };
      });

      // Filter out items with score = 0
      result = scored
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.car);
    }

    onFilter(result);
  }, [debouncedQuery, fuel, mileage, year, transmission, cars]);

  const resetFilters = () => {
    setQuery("");
    setDebouncedQuery("");
    setFuel("All");
    setMileage(150000);
    setYear("All");
    setTransmission("All");
    setShowSuggestions(false);
  };

  const isAnyFilterActive =
    query !== "" ||
    fuel !== "All" ||
    mileage !== 150000 ||
    year !== "All" ||
    transmission !== "All";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-black space-y-4 mb-6">
      {/* Search Input and Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 relative" ref={suggestionRef}>
        <div className="relative grow">
          <Input
            type="text"
            placeholder="Search by title, brand, fuel type, transmission..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 pr-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setDebouncedQuery("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-red-500 cursor-pointer"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden divide-y divide-gray-100">
              {suggestions.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(title);
                    setDebouncedQuery(title);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 transition-colors font-medium text-gray-700 cursor-pointer"
                >
                  {title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-gray-300 text-gray-700"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>

          {isAnyFilterActive && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-gray-700">
          {/* Fuel selection */}
          <div className="space-y-2">
            <span className="font-semibold text-gray-800">Fuel Type</span>
            <div className="flex flex-wrap gap-1.5">
              {["All", "Petrol", "Diesel", "CNG", "Electric"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFuel(type)}
                  className={`px-2.5 py-1 rounded-full border text-[11px] font-medium transition-colors cursor-pointer ${
                    fuel === type
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission Selection */}
          <div className="space-y-2">
            <span className="font-semibold text-gray-800">Transmission</span>
            <div className="flex gap-1.5">
              {["All", "Manual", "Auto"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTransmission(type)}
                  className={`grow px-3 py-1 rounded-md border font-medium text-center transition-colors cursor-pointer ${
                    transmission === type
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Year selector */}
          <div className="space-y-2">
            <span className="font-semibold text-gray-800">Year of Manufacture</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer"
            >
              <option value="All">All Years</option>
              {Array.from({ length: 10 }, (_, i) => 2024 - i).map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Mileage range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Max Mileage</span>
              <span className="text-blue-600 font-bold">{mileage.toLocaleString()} km</span>
            </div>
            <div className="pt-2.5">
              <Slider
                value={[mileage]}
                min={0}
                max={150000}
                step={5000}
                onValueChange={(val) => setMileage(val[0])}
                className="w-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
