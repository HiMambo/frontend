export default function FilterSidebar() {
  return (
    <aside className="w-64 bg-gray-50 p-4 border-r">
      <h3 className="font-semibold mb-2">Filters</h3>
      <ul className="space-y-2">
        <li>
          <input type="checkbox" /> Nature & Wildlife
        </li>
        <li>
          <input type="checkbox" /> Cultural Immersion
        </li>
        <li>
          <input type="checkbox" /> Adventure & Outdoor
        </li>
      </ul>
    </aside>
  );
}
