// components/ExperienceCard.tsx
import Image from "next/image";
import React from "react";

interface ExperienceCardProps {
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
  discount: number | null;
  rating: number; 
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  price,
  location,
  image,
  description,
  discount,
  rating= 4,
}) => {
  return (
    <div className="border-t-indigo-50 rounded-lg shadow-lg  overflow-hidden flex flex-col md:flex-row">
      {/* Image */}
      <div className="w-full md:w-1/4 relative ">
        <Image
          className=" p-4 "
          src="/assets/Rectangle.png" // Path to image inside the assets folder
          alt={image} // Dummy to use image in the mean time
          layout="fill" // Ensure the image fills the container
          objectFit="cover" // Make sure the image covers the div area
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between w-full md:w-3/4 ">
        <div className="flex  justify-between">
          {" "}
          <div className="pt-3">
            {/* Title & Location */}
            <h3 className="mb-4 text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{location}</p>

            {/* Description */}
            <p className="text-gray-500 text-sm mt-2">{description}</p>
          </div>
          {/* Rating */}
          <div className="flex pt-3 space-x-1">
            {Array.from({ length: rating }, (_, index) => (
              <span key={index} className="text-yellow-400">⭐</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Price */}
          <p className="text-lg font-semibold text-brand-yellow">
            € {price.toFixed(2)}{" "}
            {discount && (
              <span className="line-through text-gray-500">
                € {discount.toFixed(2)}
              </span>
            )}
          </p>
        </div>
        <div className="flex  justify-between">
          <div className="flex items-center justify-start space-x-2 mt-4">
            <button className="flex items-center space-x-2 p-2  text-blue-900 rounded-md">
              <Image
                className="p-4"
                src="/assets/shopping.svg" // Path to your SVG inside the public folder
                alt={title}
                width={50} // Set width (important for SVGs as well)
                height={50} // Set height (important for SVGs as well)
                objectFit="cover" // Ensure the image covers the container area
              />
            </button>
            <button className="flex items-center space-x-2 p-2 text-blue-900 rounded-md">
              <Image
                className="p-4"
                src="/assets/Like.svg" // Path to your SVG inside the public folder
                alt={title}
                width={50} // Set width (important for SVGs as well)
                height={50} // Set height (important for SVGs as well)
                objectFit="cover" // Ensure the image covers the container area
              />
            </button>
            <button className="flex items-center space-x-2 p-2  text-blue-900 rounded-md">
              <Image
                className="p-4"
                src="/assets/Magnifier.svg" // Path to your SVG inside the public folder
                alt={title}
                width={50} // Set width (important for SVGs as well)
                height={50} // Set height (important for SVGs as well)
                objectFit="cover" // Ensure the image covers the container area
              />
            </button>
          </div>
          {/* Right Side Icons */}
          <div className="flex items-center justify-end space-x-2 mt-4">
            <div className="flex items-center space-x-2">
              <Image
                width={50} // Set width (important for SVGs as well)
                height={50}
                src="/assets/Frame2.png"
                alt="Life on Land"
              />
              <Image
                width={50} // Set width (important for SVGs as well)
                height={50}
                src="/assets/Frame2.png"
                alt="Life on Land"
              />
            </div>
          </div>
        </div>

        {/* Icons */}
        {/* <div className="flex items-center justify-start space-x-2 mt-4">
          <button className="p-2 bg-green-200 text-green-700 rounded-md">
            Add to Cart
          </button>
          <button className="p-2 bg-blue-200 text-blue-700 rounded-md">
            Wishlist
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ExperienceCard;
