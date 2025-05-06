type Props = {
  title: string;
  location: string;
  price: number;
};

export default function ExperienceCard({ title, location, price }: Props) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-sm text-gray-600">{location}</p>
      <p className="text-blue-600 font-semibold mt-2">€ {price.toFixed(2)}</p>
    </div>
  );
}
