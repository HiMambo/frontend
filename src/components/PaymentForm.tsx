export default function PaymentForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border p-2 w-full"
        />
        <input type="email" placeholder="Email" className="border p-2 w-full" />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Sign up
        </button>
      </form>
    </div>
  );
}
