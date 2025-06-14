import { Star, StarOff } from "../shared/IconComponents";

export const StarRating: React.FC<{ rating: number; size: number }> = ({ rating, size }) => {
  if (!rating) {
    return <span className="text-sm text-gray-500">No rating yet!</span>;
  }

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? (
          <Star key={index} className={`w-${size} h-${size}`} />
        ) : (
          <StarOff key={index} className={`w-${size} h-${size}`} />
        )
      )}
    </div>
  );
};