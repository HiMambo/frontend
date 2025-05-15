import Image from "next/image";
import React from "react";

interface ExperienceCardProps {
  title: string;
  price: number;
  location: string;
  image: string | null;
  description: string;
  discount?: number | null;
  rating?: number | null;
  sustainabilityGoal?: string[] | null;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  price,
  location,
  image,
  description,
  discount = null,
  rating = 4,
  sustainabilityGoal = [],
}) => {
  const imageSrc = image ?? "/assets/Rectangle.png"; // fallback image
  const safeRating = rating ?? 4;

  return (
    <div className="border-t-indigo-50 max-h-72 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Image */}
      <div className="w-full md:w-1/4 relative min-h-[200px]">
        <Image
          className="p-4"
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between w-full md:w-3/4">
        <div className="flex justify-between">
          <div className="pt-3">
            <h3 className="mb-4 text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{location}</p>
            <p className="text-gray-500 text-sm mt-2">{description}</p>
          </div>

          {/* Rating */}
          <div className="flex pt-3 space-x-1">
            {Array.from({ length: safeRating }, (_, index) => (
              <span key={index} className="text-yellow-400">
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold text-brand-yellow">
            € {price.toFixed(2)}
            {discount && (
              <span className="line-through text-gray-500 ml-2">
                € {discount.toFixed(2)}
              </span>
            )}
          </p>
        </div>

        {/* Icons & Tags */}
        <div className="flex justify-between">
          <div className="flex items-center space-x-2 mt-4">
            <Image
              src="/assets/shopping.svg"
              alt="Add to cart"
              width={30}
              height={30}
            />
            <Image src="/assets/Like.svg" alt="Like" width={25} height={25} />
            <Image
              src="/assets/Magnifier.svg"
              alt="View details"
              width={25}
              height={25}
            />
          </div>

          {/* Sustainability Icons */}
          <div className="flex items-center space-x-2 mt-4">
            {sustainabilityGoal?.length ? (
              sustainabilityGoal.map((goal, index) => {
                // Extract the goal number from the format "E-WEB-Goal-XX"
                const imagePath = `/assets/sdg/E-WEB-Goal-${goal.padStart(2, "0")}.png`; // Dynamically generate the image path
                console.log("imagePath", imagePath)
                return (
                  <div key={index} className="flex items-center">
                    <Image
                      src={imagePath}
                      alt={`Sustainability Goal ${goal}`}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  </div>
                );
              })
            ) : (
              <>
                <Image
                  src="/assets/Frame2.png"
                  alt="SDG"
                  width={50}
                  height={50}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
