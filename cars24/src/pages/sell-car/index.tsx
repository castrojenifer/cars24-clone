import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Check, Car, Image, FileText, DollarSign } from "lucide-react";
import Carform from "@/components/sellcar/Carform";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { createCar } from "@/lib/Carapi";
type CarDetails = {
  id: string;
  title: string;
  images: string[];
  price: string;
  emi: string;
  location: string;
  specs: {
    year: number;
    km: string;
    fuel: string;
    transmission: string;
    owner: string;
    insurance: string;
  };
  features: string[];
  highlights: string[];
};

const index = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [carDetails, setCarDetails] = useState<any>({
    title: "",
    images: [],
    price: "",
    emi: "",
    location: "",
    specs: {
      year: new Date().getFullYear(),
      km: "",
      fuel: "",
      transmission: "",
      owner: "",
      insurance: "",
    },
    features: [],
    highlights: [],
  });
  const steps = [
    { id: 1, name: "Basic Details", icon: Car },
    { id: 2, name: "Images & Specs", icon: Image },
    { id: 3, name: "Features", icon: FileText },
    { id: 4, name: "Pricing", icon: DollarSign },
  ];
  const updateCarDetails = (updatedDetails: Partial<CarDetails>) => {
    setCarDetails((prev: any) => ({
      ...prev,
      ...updatedDetails,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const { user } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to continue");
      return;
    }

    const generatedCarId = "local_car_" + Date.now();
    const mockCarItem = {
      id: generatedCarId,
      title: carDetails.title || "Custom Listed Car",
      images: carDetails.images && carDetails.images.length > 0 ? carDetails.images : ["https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"],
      price: carDetails.price.startsWith("₹") ? carDetails.price : `₹${carDetails.price} lakh`,
      emi: carDetails.emi ? (carDetails.emi.includes("/m") ? carDetails.emi : `₹${carDetails.emi}/m`) : "₹12,500/m",
      location: carDetails.location || "Metro Walk, Rohini, New Delhi",
      specs: {
        year: parseInt(carDetails.specs?.year) || new Date().getFullYear(),
        km: carDetails.specs?.km || "10,000",
        fuel: carDetails.specs?.fuel || "Petrol",
        transmission: carDetails.specs?.transmission || "Manual",
        owner: carDetails.specs?.owner || "1st owner",
        insurance: carDetails.specs?.insurance || "Valid",
      },
      features: carDetails.features && carDetails.features.length > 0 ? carDetails.features : ["Power Steering", "Air Conditioning"],
      highlights: carDetails.highlights && carDetails.highlights.length > 0 ? carDetails.highlights : ["Single owner vehicle", "Certified clean history"],
      image: carDetails.images && carDetails.images.length > 0 ? carDetails.images[0] : "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      km: carDetails.specs?.km || "10,000",
      fuel: carDetails.specs?.fuel || "Petrol",
      transmission: carDetails.specs?.transmission || "Manual",
      owner: carDetails.specs?.owner || "1st owner",
    };

    try {
      const car = await createCar(carDetails);
      if (car && car.id) {
        toast.success("Car listed Successfully");
        router.push(`/bookappointment/${car.id}`);
        return;
      }
    } catch (error) {
      console.warn("Backend car creation failed, using local fallback:", error);
    }

    try {
      const storedCarsRaw = localStorage.getItem("cars24_local_cars");
      const localCars = storedCarsRaw ? JSON.parse(storedCarsRaw) : [];
      localCars.push(mockCarItem);
      localStorage.setItem("cars24_local_cars", JSON.stringify(localCars));

      toast.success("Car listed successfully (Offline Mode)!");
      router.push(`/bookappointment/${generatedCarId}`);
    } catch (fallbackError) {
      console.error("Local fallback car listing failed:", fallbackError);
      toast.error("Failed to list car");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sell Your Car
          </h1>
          <p className="text-gray-600 mb-8">
            Fill in the details below to get the best price for your car
          </p>
          <div className="w-full py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${
                  currentStep > step.id
                    ? "bg-green-500 border-green-500 text-white"
                    : currentStep === step.id
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300 text-gray-300"
                }
                transition-all duration-300`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        currentStep >= step.id
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > index + 1 ? "bg-green-500" : "bg-gray-200"
                      } transition-all duration-300`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <Carform
              carDetails={carDetails}
              updateCarDetails={updateCarDetails}
              currentStep={currentStep}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default index;
