import React, { useState, useRef, useEffect } from 'react';

const STEP = 50;
const MIN = 0;
const MAX = 1000;
const MIN_DISTANCE = 50;

interface PriceFilterProps {
  minValue: number;
  maxValue: number;
  min?: number;
  max?: number;
  step?: number;
  minDistance?: number;
  onMinPriceChange: (min: number) => void;
  onMaxPriceChange: (max: number) => void;
}

export default function PriceFilter({
  minValue,
  maxValue,
  min = MIN,
  max = MAX,
  step = STEP,
  minDistance = MIN_DISTANCE,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFilterProps) {
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Clamp helpers
  const clampMin = (val: number) => Math.max(min, Math.min(val, maxValue - minDistance));
  const clampMax = (val: number) => Math.min(max, Math.max(val, minValue + minDistance));

  const getPositionFromEvent = (e: React.MouseEvent | MouseEvent): number => {
    if (!sliderRef.current) return minValue;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    return Math.round((percentage * (max - min) + min) / step) * step;
  };

  const handleRangeChange = (newMin: number, newMax: number) => {
    if (newMax - newMin >= minDistance) {
      if (newMin !== minValue) onMinPriceChange(newMin);
      if (newMax !== maxValue) onMaxPriceChange(newMax);
    }
  };

  const handleMinInput = (val: number) => {
    if (isNaN(val)) return;
    const clamped = clampMin(val);
    handleRangeChange(clamped, maxValue);
  };

  const handleMaxInput = (val: number) => {
    if (isNaN(val)) return;
    const clamped = clampMax(val);
    handleRangeChange(minValue, clamped);
  };

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging === null) return;
    
    const newValue = getPositionFromEvent(e);

    if (isDragging === 0) {
      const newMin = Math.min(newValue, maxValue - minDistance);
      handleRangeChange(newMin, maxValue);
    } else {
      const newMax = Math.max(newValue, minValue + minDistance);
      handleRangeChange(minValue, newMax);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, minValue, maxValue]);

  const getThumbPosition = (value: number): string => {
    return `${((value - min) / (max - min)) * 100}%`;
  };

  const getTrackFillWidth = (): string => {
    return `${((maxValue - minValue) / (max - min)) * 100}%`;
  };

  const getTrackFillLeft = (): string => {
    return `${((minValue - min) / (max - min)) * 100}%`;
  };

  return (
    <div className="p-4 mb-6">
      {/* Range Slider */}
      <div className="relative mb-4">
        <div
          ref={sliderRef}
          className="relative h-2 w-full rounded bg-gray-300 cursor-pointer"
        >
          {/* Active track */}
          <div
            className="absolute h-2 bg-blue-500 rounded"
            style={{
              left: getTrackFillLeft(),
              width: getTrackFillWidth(),
            }}
          />

          {/* Min thumb */}
          <div
            className="absolute h-5 w-5 bg-white border-2 border-blue-500 rounded-full shadow cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{ left: getThumbPosition(minValue) }}
            onMouseDown={handleMouseDown(0)}
          />

          {/* Max thumb */}
          <div
            className="absolute h-5 w-5 bg-white border-2 border-blue-500 rounded-full shadow cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{ left: getThumbPosition(maxValue) }}
            onMouseDown={handleMouseDown(1)}
          />
        </div>
      </div>

      {/* Manual Inputs */}
      <div className="flex justify-center items-center gap-6 mt-4 text-gray-700">
        <div className="flex flex-col items-center">
          <label htmlFor="minInput" className="text-sm text-gray-600 mb-2">Min (€)</label>
          <input
            id="minInput"
            type="number"
            min={min}
            max={maxValue - minDistance}
            step={step}
            value={minValue}
            onChange={(e) => handleMinInput(Number(e.target.value))}
            className="border rounded p-2 h-10 w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="maxInput" className="text-sm text-gray-600 mb-2">Max (€)</label>
          <input
            id="maxInput"
            type="number"
            min={minValue + minDistance}
            max={max}
            step={step}
            value={maxValue}
            onChange={(e) => handleMaxInput(Number(e.target.value))}
            className="border rounded p-2 h-10 w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Current Range Display */}
      <div className="text-center mt-2 text-sm text-gray-600">
        Range: €{minValue} - €{maxValue}
      </div>
    </div>
  );
}
