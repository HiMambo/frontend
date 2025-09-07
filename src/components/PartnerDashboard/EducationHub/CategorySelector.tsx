"use client";

import { BrandButton } from "@/components/brand";

export type CategoryType =
  | "All"
  | "Marketing Content"
  | "Blockchain / Crypto"
  | "Sustainability"
  | "Premium";

interface Props {
  selected: CategoryType;
  onChange: (cat: CategoryType) => void;
}

const CategorySelector: React.FC<Props> = ({ selected, onChange }) => {
  const categories: CategoryType[] = [
    "All",
    "Marketing Content",
    "Blockchain / Crypto",
    "Sustainability",
    "Premium",
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-3">
      {categories.map((category) => (
        <BrandButton
          key={category}
          onClick={() => onChange(category)}
          selected={selected === category}
          variant="outline"
        >
          {category}
        </BrandButton>
      ))}
    </div>
  );
};

export default CategorySelector;
