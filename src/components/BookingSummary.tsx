import Image from "next/image";
import React from "react";

const BookingSummary: React.FC = () => {
  const dummyData = {
    title: "Hidden Caves & Mountain Trekking",
    location: "Chiapas, Mexico",
    flagSrc: "/dummyassets/flags/mexico.svg",
    image: "/dummyassets/hidden-caves.png",
    sustainabilityGoals: "/dummyassets/sustainabilitybadge.png",
    travelDate: "Sunday 4 May 2025",
    departure: "05:30",
    travellers: "2 Guests",
    duration: "3 days",
    refundable: "Refundable",
    pricePerAdult: 460,
    totalPrice: 920,
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Top image */}
      <div className="w-full h-48 relative">
        <Image
          src={dummyData.image}
          alt={dummyData.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-brand-blue mb-2">
          {dummyData.title}
        </h2>

        {/* Location + SDG badges */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center space-x-2">
            <Image src={dummyData.flagSrc} alt="Flag" width={20} height={15} />
            <span className="text-gray-600">{dummyData.location}</span>
          </div>
          <div>
            <Image
              src={dummyData.sustainabilityGoals}
              alt="Sustainability Badge"
              width={100}
              height={50}
            />
          </div>
        </div>

        {/* Information Table */}
        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <div className="flex justify-between">
            <span className="font-medium">Travel date</span>
            <span>{dummyData.travelDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Departure</span>
            <span>{dummyData.departure}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Travellers</span>
            <span>{dummyData.travellers}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Duration</span>
            <span>{dummyData.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Refundability</span>
            <span>{dummyData.refundable}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700">1 Adult</span>
            <span className="text-gray-700">
              US${dummyData.pricePerAdult.toFixed(2)}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold text-brand-orange">
            <span>TOTAL CHARGE</span>
            <span>US${dummyData.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
