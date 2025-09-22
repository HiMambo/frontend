import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

interface PriceFilterProps {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  onMinPriceChange: (min: number) => void;
  onMaxPriceChange: (max: number) => void;
}

export default function PriceFilter({
  minValue,
  maxValue,
  min,
  max,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFilterProps) {
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minDistance = 1;
  const step = (max-min) > 999 ? 10 : 1

  const isDisabled = useMemo(() => {
    return min === max || (max - min) < minDistance;
  }, [min, max, minDistance]);

  const clampMin = useCallback(
    (val: number) => Math.max(min, Math.min(val, maxValue - minDistance)),
    [min, maxValue, minDistance]
  );

  const clampMax = useCallback(
    (val: number) => Math.min(max, Math.max(val, minValue + minDistance)),
    [max, minValue, minDistance]
  );

  const getPositionFromEvent = useCallback(
    (e: MouseEvent | React.MouseEvent): number => {
      if (!sliderRef.current) return minValue;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      return Math.round((percentage * (max - min) + min) / step) * step;
    },
    [minValue, min, max, step]
  );

  const handleRangeChange = useCallback(
    (newMin: number, newMax: number) => {
      if (newMax - newMin >= minDistance) {
        if (newMin !== minValue) onMinPriceChange(newMin);
        if (newMax !== maxValue) onMaxPriceChange(newMax);
      }
    },
    [minValue, maxValue, minDistance, onMinPriceChange, onMaxPriceChange]
  );

  const [tempMinInput, setTempMinInput] = useState(minValue.toString());
  const [tempMaxInput, setTempMaxInput] = useState(maxValue.toString());

  useEffect(() => {
  setTempMinInput(minValue.toString());
}, [minValue]);

  useEffect(() => {
    setTempMaxInput(maxValue.toString());
  }, [maxValue]);

  const handleMinInput = useCallback(
    (val: number) => {
      if (isNaN(val)) return;
      const clamped = clampMin(val);
      handleRangeChange(clamped, maxValue);
    },
    [clampMin, handleRangeChange, maxValue]
  );

  const handleMaxInput = useCallback(
    (val: number) => {
      if (isNaN(val)) return;
      const clamped = clampMax(val);
      handleRangeChange(minValue, clamped);
    },
    [clampMax, handleRangeChange, minValue]
  );

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging === null) return;
      const newValue = getPositionFromEvent(e);
      if (isDragging === 0) {
        const newMin = Math.min(newValue, maxValue - minDistance);
        handleRangeChange(newMin, maxValue);
      } else {
        const newMax = Math.max(newValue, minValue + minDistance);
        handleRangeChange(minValue, newMax);
      }
    },
    [isDragging, getPositionFromEvent, handleRangeChange, minValue, maxValue, minDistance]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getThumbPosition = useCallback(
    (value: number): string => `${((value - min) / (max - min)) * 100}%`,
    [min, max]
  );

  const trackFillLeft = useMemo(() => {
    return `${((minValue - min) / (max - min)) * 100}%`;
  }, [minValue, min, max]);

  const trackFillWidth = useMemo(() => {
    return `${((maxValue - minValue) / (max - min)) * 100}%`;
  }, [minValue, maxValue, min, max]);

  return (
    <div className="p-4">
      {/* Range Slider */}
      <div className="relative mb-4">
        <div
          ref={sliderRef}
          className={`relative h-2 w-full rounded cursor-pointer ${
            isDisabled 
              ? 'bg-gray-200 cursor-not-allowed opacity-50' 
              : 'bg-[var(--neutral-300)]/40'
          }`}
        >
          {/* Active track */}
          {!isDisabled && (
            <div
              className="absolute h-2 rounded bg-[var(--neutral-300)]"
              style={{ left: trackFillLeft, width: trackFillWidth }}
            />
          )}

          {/* Min thumb */}
          <div
            className={`absolute h-5 w-5 rounded-full shadow transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-transform duration-100 ${
              isDisabled 
                ? 'bg-gray-400 cursor-not-allowed opacity-80' 
                : `bg-surface-accent cursor-grab active:cursor-grabbing ${
                    isDragging === 0 ? 'scale-130' : ''
                  }`
            }`}
            style={{ left: getThumbPosition(minValue) }}
            onMouseDown={isDisabled ? undefined : handleMouseDown(0)}
          />

          {/* Max thumb */}
          <div
            className={`absolute h-5 w-5 rounded-full shadow transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-transform duration-100 ${
              isDisabled 
                ? 'bg-gray-400 cursor-not-allowed opacity-80' 
                : `bg-surface-accent cursor-grab active:cursor-grabbing ${
                    isDragging === 1 ? 'scale-130' : ''
                  }`
            }`}
            style={{ left: getThumbPosition(maxValue) }}
            onMouseDown={isDisabled ? undefined : handleMouseDown(1)}
          />
        </div>
      </div>

      {/* Manual Inputs */}
      <div className="flex justify-center items-center gap-4 mt-4 text-tertiary">
        <ManualInput
          id="minInput"
          label="From (€)"
          value={tempMinInput}
          setValue={setTempMinInput}
          onConfirm={handleMinInput}
          resetValue={minValue.toString()}
          disabled={isDisabled}
          
        />
        <div className="w-3 h-[1.5px] bg-[var(--text-tertiary)] mt-7 rounded-sm" />
        <ManualInput
          id="maxInput"
          label="To (€)"
          value={tempMaxInput}
          setValue={setTempMaxInput}
          onConfirm={handleMaxInput}
          resetValue={maxValue.toString()}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}

type ManualInputProps = {
  id: string;
  label: string;
  value: string;
  setValue: (val: string) => void;
  onConfirm: (val: number) => void;
  resetValue: string; // external value to reset to on blur
  disabled?: boolean;
};

function ManualInput({ id, label, value, setValue, onConfirm, resetValue, disabled }: ManualInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key === 'Escape' || (key === 'Enter' && !/^\d+$/.test(value))) {
      e.currentTarget.blur();
      return;
    }

    if (key === 'Enter') {
      onConfirm(Number(value));
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col items-center body-l">
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setValue(resetValue)}
        className={`border rounded p-2 h-8 w-16 text-center focus:outline-none no-spinner ${
          disabled 
            ? 'bg-gray-100 text-disabled cursor-not-allowed' 
            : 'focus:ring-2'
        }`}
        disabled={disabled}
      />
    </div>
  );
}