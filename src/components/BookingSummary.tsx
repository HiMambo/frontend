export default function BookingSummary() {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
      <ul className="text-sm">
        <li>
          <strong>Trip:</strong> Hidden Caves & Mountain Trekking
        </li>
        <li>
          <strong>Date:</strong> 4 May 2025
        </li>
        <li>
          <strong>Guests:</strong> 2
        </li>
        <li>
          <strong>Total:</strong> $920.00
        </li>
      </ul>
    </div>
  );
}
