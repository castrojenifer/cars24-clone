import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/lib/Bookingapi";
import { getcarByid } from "@/lib/Carapi";
import {
  AlertCircle,
  Calendar,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import MaintenanceCostEstimator from "@/components/buy-car/MaintenanceCostEstimator";
const carDetails = {
  id: "fronx-2023",
  title: "2023 Maruti FRONX DELTA PLUS 1.2L AGS",
  images: [
    "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg",
  ],
  price: "₹7.80 lakh",
  emi: "₹15,245/month",
  location: "Metro Walk, Rohini, New Delhi",
  specs: {
    year: 2023,
    km: "10,048",
    fuel: "Petrol",
    transmission: "Automatic",
    owner: "1st owner",
    insurance: "Valid till 2024",
  },
  features: [
    "Power Steering",
    "Power Windows",
    "Air Conditioning",
    "Driver Airbag",
    "Passenger Airbag",
    "Alloy Wheels",
  ],
  highlights: [
    "Single owner vehicle",
    "All original documents",
    "Non-accidental",
    "Fully maintained",
  ],
};
const MOCK_CARS = [
  {
    id: "fronx-2023",
    title: "2023 Maruti FRONX DELTA PLUS 1.2L AGS",
    km: "10,048",
    fuel: "Petrol",
    transmission: "Auto",
    owner: "1st owner",
    emi: "₹15,245/m",
    price: "₹7.80 lakh",
    location: "Metro Walk, Rohini, New Delhi",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  },
  {
    id: "swift-2017",
    title: "2017 Maruti Swift VXI (O)",
    km: "60,056",
    fuel: "Petrol",
    transmission: "Manual",
    owner: "1st owner",
    emi: "₹7,214/m",
    price: "₹3.69 lakh",
    location: "Metro Walk, Rohini, New Delhi",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
  },
  {
    id: "creta-2021",
    title: "2021 Hyundai Creta SX IVT",
    km: "20,500",
    fuel: "Petrol",
    transmission: "Auto",
    owner: "1st owner",
    emi: "₹18,999/m",
    price: "₹11.20 lakh",
    location: "Sector 29, Gurugram",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  },
  {
    id: "baleno-2020",
    title: "2020 Maruti Baleno ZETA",
    km: "30,000",
    fuel: "Petrol",
    transmission: "Manual",
    owner: "2nd owner",
    emi: "₹10,600/m",
    price: "₹6.45 lakh",
    location: "Karol Bagh, New Delhi",
    image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
  },
  {
    id: "eco-2018",
    title: "2018 Maruti Eeco 5 STR WITH A/C+HTR",
    km: "45,000",
    fuel: "Petrol",
    transmission: "Manual",
    owner: "1st owner",
    emi: "₹5,300/m",
    price: "₹3.10 lakh",
    location: "Lajpat Nagar, New Delhi",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  },
  {
    id: "city-2019",
    title: "2019 Honda City ZX CVT",
    km: "25,000",
    fuel: "Petrol",
    transmission: "Auto",
    owner: "1st owner",
    emi: "₹16,500/m",
    price: "₹9.95 lakh",
    location: "South Ex, New Delhi",
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
  },
  {
    id: "venue-2022",
    title: "2022 Hyundai Venue SX Turbo",
    km: "12,000",
    fuel: "Petrol",
    transmission: "Auto",
    owner: "1st owner",
    emi: "₹14,875/m",
    price: "₹9.40 lakh",
    location: "Noida Sector 63, Uttar Pradesh",
    image: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
  },
  {
    id: "altroz-2021",
    title: "2021 Tata Altroz XT Petrol",
    km: "18,000",
    fuel: "Petrol",
    transmission: "Manual",
    owner: "1st owner",
    emi: "₹9,350/m",
    price: "₹6.75 lakh",
    location: "Dwarka, New Delhi",
    image: "https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg",
  },
];

const getMockDetails = (carId: string) => {
  const summary = MOCK_CARS.find((c) => c.id === carId);
  if (!summary) {
    return {
      id: "fronx-2023",
      title: "2023 Maruti FRONX DELTA PLUS 1.2L AGS",
      images: [
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      ],
      price: "₹7.80 lakh",
      emi: "₹15,245/month",
      location: "Metro Walk, Rohini, New Delhi",
      specs: {
        year: 2023,
        km: "10,048",
        fuel: "Petrol",
        transmission: "Automatic",
        owner: "1st owner",
        insurance: "Valid till 2024",
      },
      features: [
        "Power Steering",
        "Power Windows",
        "Air Conditioning",
        "Driver Airbag",
        "Passenger Airbag",
        "Alloy Wheels",
      ],
      highlights: [
        "Single owner vehicle",
        "All original documents",
        "Non-accidental",
        "Fully maintained",
      ],
    };
  }

  const matchYear = summary.title.match(/^(\d{4})/);
  const year = matchYear ? parseInt(matchYear[1], 10) : 2021;

  return {
    id: summary.id,
    title: summary.title,
    images: [
      summary.image,
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    ],
    price: summary.price,
    emi: summary.emi.includes("/m")
      ? summary.emi.replace("/m", "/month")
      : summary.emi,
    location: summary.location,
    specs: {
      year,
      km: summary.km,
      fuel: summary.fuel,
      transmission: summary.transmission === "Auto" ? "Automatic" : "Manual",
      owner: summary.owner,
      insurance: "Valid till " + (year + 3),
    },
    features: [
      "Power Steering",
      "Power Windows",
      "Air Conditioning",
      "Driver Airbag",
      "Passenger Airbag",
      "Anti-lock Braking System",
    ],
    highlights: [
      "Well-maintained vehicle",
      "Comprehensive insurance active",
      "Passed 140-point inspection check",
      "Non-accidental history certified",
    ],
  };
};

const index = () => {
  const [formData, setformData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    paymentMethod: "",
    loanRequired: "no",
    downPayment: "",
  });
  const router = useRouter();
  const { id } = router.query;
  const [carDetails, setcarDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setstep] = useState(1);
  useEffect(() => {
    if (!id) return;
    async function fetchCar() {
      try {
        const storedCarsRaw = localStorage.getItem("cars24_local_cars");
        const localCars = storedCarsRaw ? JSON.parse(storedCarsRaw) : [];
        const localMatched = localCars.find((c: any) => c.id === id);
        if (localMatched) {
          setcarDetails(localMatched);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Failed to check local custom cars:", err);
      }

      try {
        const data = await getcarByid(id as string);
        if (data && data.title) {
          setcarDetails(data);
        } else {
          throw new Error("No data fetched");
        }
      } catch (error) {
        console.warn("Using mock car details fallback:", error);
        const fallbackDetails = getMockDetails(id as string);
        setcarDetails(fallbackDetails);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }
  if (!carDetails) {
    return (
      <div className="text-center mt-10 text-red-500">
        Car details not found.
      </div>
    );
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setformData((Prev) => ({
      ...Prev,
      [name]: value,
    }));
  };
  const { user } = useAuth();
  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to continue");
      return;
    }
    const booking = {
      CarId: id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      paymentMethod: formData.paymentMethod,
      loanRequired: formData.loanRequired,
      downPayment: formData.downPayment,
    };
    try {
      const response = await createBooking(user.id, booking);
      if (response && response.id) {
        toast.success("Booking placed successfully!");
        router.push(`/bookings`);
        return;
      }
    } catch (error) {
      console.warn("Backend booking failed, using local fallback:", error);
    }

    try {
      const generatedBookingId = "booking_" + Math.random().toString(36).substr(2, 9);
      const mockBookingItem = {
        userId: user.id,
        booking: {
          id: generatedBookingId,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          paymentMethod: formData.paymentMethod === "loan" ? "Car Loan" : "Full Payment",
          loanStatus: formData.paymentMethod === "loan" ? "In Process" : "Approved",
          downPayment: formData.downPayment || "",
        },
        car: {
          id: carDetails.id,
          title: carDetails.title,
          price: carDetails.price,
          emi: carDetails.emi,
          location: carDetails.location,
          images: carDetails.images && carDetails.images.length > 0 ? carDetails.images : ["https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"],
          specs: carDetails.specs || {
            year: 2023,
            km: "10,048",
            fuel: "Petrol",
            transmission: "Automatic",
            owner: "1st owner",
            insurance: "Valid"
          },
          highlights: carDetails.highlights || ["Single owner"],
          features: carDetails.features || ["Power Steering"]
        }
      };

      const storedBookingsRaw = localStorage.getItem("cars24_local_bookings");
      const localBookings = storedBookingsRaw ? JSON.parse(storedBookingsRaw) : [];
      localBookings.push(mockBookingItem);
      localStorage.setItem("cars24_local_bookings", JSON.stringify(localBookings));

      toast.success("Booking placed successfully (Offline Mode)!");
      router.push(`/bookings`);
    } catch (fallbackError) {
      console.error("Local fallback booking failed:", fallbackError);
      toast.error("Failed to complete purchase. Please try again.");
    }
  };

  const validatestep = () => {
    if (step === 1) {
      return formData.name && formData.phone && formData.email;
    }
    if (step === 2) {
      return formData.preferredDate && formData.preferredTime;
    }
    return true;
  };
  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Car Details Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Car Image */}
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={carDetails.images[0]}
                  alt={carDetails.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Title and Price */}
              <h2 className="text-2xl font-bold mb-2">{carDetails.title}</h2>
              <p className="text-sm text-gray-400 mb-4">ID: {carDetails.id}</p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-3xl font-bold text-blue-600">
                    {carDetails.price}
                  </p>
                  <p className="text-gray-600">EMI from {carDetails.emi}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">{carDetails.location}</p>
                  <p className="text-sm text-gray-500">
                    {carDetails.specs.km} driven
                  </p>
                </div>
              </div>
              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600">Year</p>
                  <p className="font-medium">{carDetails.specs.year}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600">Fuel Type</p>
                  <p className="font-medium">{carDetails.specs.fuel}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600">Transmission</p>
                  <p className="font-medium">{carDetails.specs.transmission}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600">Owner</p>
                  <p className="font-medium">{carDetails.specs.owner}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600">Insurance</p>
                  <p className="font-medium">{carDetails.specs.insurance}</p>
                </div>
              </div>
              {/* Highlights */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Car Highlights
                </h3>
                <ul className="space-y-1">
                  {carDetails.highlights.map((highlight: any, index: any) => (
                    <li key={index} className="text-blue-700 flex items-center">
                      <div className="w-2 h-2 bg-blue-700 rounded-full mr-2"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maintenance Cost Estimator */}
              {(() => {
                const titleParts = carDetails.title.split(" ");
                const brand = /^\d{4}$/.test(titleParts[0]) ? titleParts[1] : titleParts[0];
                return (
                  <MaintenanceCostEstimator
                    year={carDetails.specs.year}
                    km={carDetails.specs.km}
                    brand={brand}
                  />
                );
              })()}
              {/* Features */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {carDetails.features.map((feature: any, index: any) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* booking form  */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">
                Complete Your Purchase
              </h2>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step === stepNumber
                            ? "bg-blue-600 text-white"
                            : step > stepNumber
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step > stepNumber ? "✓" : stepNumber}
                      </div>
                      {stepNumber < 3 && (
                        <div
                          className={`w-12 h-1 ${
                            step > stepNumber ? "bg-green-500" : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handlesubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <User className="w-4 h-4 inline mr-1" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone className="w-4 h-4 inline mr-1" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="w-4 h-4 inline mr-1" /> Preferred
                        Visit Date
                      </label>
                      <Input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Clock className="w-4 h-4 inline mr-1" /> Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select a time</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <MapPin className="w-4 h-4 inline mr-1" /> Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <CreditCard className="w-4 h-4 inline mr-1" /> Payment
                        Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select payment method</option>
                        <option value="full">Full Payment</option>
                        <option value="loan">Car Loan</option>
                      </select>
                    </div>
                    {formData.paymentMethod === "loan" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Down Payment Amount
                        </label>
                        <input
                          type="text"
                          name="downPayment"
                          value={formData.downPayment}
                          onChange={handleInputChange}
                          placeholder="Enter amount"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">
                            Required Documents
                          </h4>
                          <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                            <li>Valid ID Proof</li>
                            <li>Address Proof</li>
                            <li>Income Proof (for loan)</li>
                            <li>Bank Statements (for loan)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setstep(step - 1)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => validatestep() && setstep(step + 1)}
                      className={`px-6 py-2 rounded-md text-white ${
                        validatestep()
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!validatestep()}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Complete Purchase
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default index;
