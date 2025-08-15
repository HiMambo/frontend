import {
  BrandButton,
  BrandDropdown,
  BrandLabeledInput,
  MenuLabel,
} from "@/components/brand";

export function Example() {
  return (
    <div className="space-y-400">
      <BrandButton>Label</BrandButton>
      <BrandButton variant="outline">Label →</BrandButton>

      <BrandLabeledInput label="Email" placeholder="Your email" type="email" />

      <BrandDropdown
        label="Category"
        items={[
          { value: "nature", label: "Nature & Wildlife" },
          { value: "culture", label: "Cultural Immersion" },
          { value: "adventure", label: "Adventure & Outdoor" },
        ]}
      />

      <MenuLabel href="#">Menu Label</MenuLabel>
    </div>
  );
}
