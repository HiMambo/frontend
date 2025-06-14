import Image from "next/image";

export const SDGIcons: React.FC<{ 
    goals: string[]; 
    maxDisplay: number; 
    iconSize: number 
  }> = ({ 
    goals, 
    maxDisplay, 
    iconSize 
  }) => {
    if (!goals.length) return null;

    return (
      <div className="flex items-center gap-[2px]">
        {goals.slice(0, maxDisplay).map((goal, index) => {
          const imagePath = `/assets/sdg/E-WEB-Goal-${goal.padStart(2, "0")}.png`;
          return (
            <Image
              key={index}
              src={imagePath}
              alt={`SDG ${goal}`}
              width={iconSize}
              height={iconSize}
              className="rounded"
            />
          );
        })}
        {goals.length > maxDisplay && (
          <span 
            className="text-gray-500 font-medium px-1"
            style={{ fontSize: `${iconSize * 0.4}px`, lineHeight: 1 }}
          >
            +{goals.length - maxDisplay}
          </span>
        )}
      </div>
    );
  };