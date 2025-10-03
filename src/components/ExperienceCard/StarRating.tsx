import { Star } from "../shared/IconComponents";

interface StarRatingProps {
  rating: number;
  size: number;
  showValue?: boolean;
  ratingClassName?: string;
  ratingnumberClassName?: string;
  renderPartner?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating,
  size,
  showValue = true,
  ratingClassName="body-xs",
  ratingnumberClassName="body-xxs-light" ,
  renderPartner=false
}) => {
  if (!rating) {
    return <span className="text-sm text-gray-500">No rating yet!</span>;
  }

  const starSize = `${size * 4}px`;
  const isInteger = rating % 1 === 0;
  const fullStars = Math.floor(rating);
  const partialFillAmount = rating - fullStars;
  const emptyStars = 5 - Math.ceil(rating);
  
  function perceptualFill(x: number): number {
    if (x <= 0.1) {
      return 0.2; // 0.1 maps to 20%
    } else if (x >= 0.9) {
      return 0.8; // 0.9 maps to 80%
    } else {
      // 0.2-0.8 maps linearly to 25%-75% (50% range over 0.6 input range)
      return 0.25 + ((x - 0.2) / 0.6) * 0.5;
    }
  }

  const renderStar = (type: 'full' | 'partial' | 'empty', key: number, fillPercentage?: number) => {
    if (type === 'full') {
      return (
        <Star
          key={key}
          className="text-[#FFC107]"
          style={{ width: starSize, height: starSize }}
        />
      );
    }
    if (type === 'empty') {
      return (
        <Star
          key={key}
          className="text-[#B2B2B2]"
          style={{ width: starSize, height: starSize }}
        />
      );
    }
    // Partial
    return (
      <div
        key={key}
        className="relative"
        style={{ width: starSize, height: starSize }}
      >
        <Star
          className="absolute top-0 left-0 text-[#B2B2B2]"
          style={{ width: starSize, height: starSize }}
        />
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{
            width: `${perceptualFill(fillPercentage!) * 100}%`,
            height: starSize,
          }}
        >
          <Star
            className="text-[#FFC107]"
            style={{ width: starSize, height: starSize }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-[var(--spacing-300)]">
      {/* Star row */}
      <div className="flex items-center gap-[var(--spacing-100)]">
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, index) => 
          renderStar('full', index)
        )}
        
        {/* Partial star (only if rating is not an integer) */}
        {!isInteger && renderStar('partial', fullStars, partialFillAmount)}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, index) => 
          renderStar('empty', fullStars + (isInteger ? 0 : 1) + index)
        )}
      </div>
        {/* Numeric rating */}
        {showValue && (
          <div className="flex items-center gap-[var(--spacing-200)]">
            <span className={`bg-primary rounded-100 px-[var(--spacing-150)] py-[var(--spacing-050)] ${ratingClassName} text-inverted`}>
              {rating.toFixed(1)}
            </span>
            <span className={`${ratingnumberClassName} text-secondary`}>XXX reviews</span>
            {renderPartner && (
              <span className={`${ratingnumberClassName} text-secondary`}>
                By &quot;Partner name&quot;
              </span>
            )}
          </div>
        )}
    </div>
  );
};