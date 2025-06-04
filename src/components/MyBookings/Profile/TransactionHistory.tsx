import React from "react";

type Transaction = {
  name: string; // Partner Name
  experience: string; // Experience Name
  amount: number; // Amount Paid
  experienceDate: string; // Experience Date
  paymentDate: string; // Booking Date
  status?: string; // Status (optional)
};

type TransactionHistoryProps = {
  allTransactions: Transaction[];
  showAllTransactions: boolean;
  setShowAllTransactions: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="relative group">
    <button
      className="w-5 h-5 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors text-xs"
      type="button"
    >
      ?
    </button>
    <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-48">
      {text}
    </div>
  </div>
);

export default function TransactionHistory({
  allTransactions,
  showAllTransactions,
  setShowAllTransactions,
}: TransactionHistoryProps) {
  // Limit display to first 5 unless "showAllTransactions" is true
  const displayedTransactions = showAllTransactions
    ? allTransactions
    : allTransactions.slice(0, 5);

  // Helper to get 2-letter abbreviation
  const getAbbreviation = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase(); // Single word -> first 2 letters
    } else {
      return (parts[0][0] + parts[1][0]).toUpperCase(); // First letter of first and second word
    }
  };

  if (!allTransactions.length) {
    return (
      <div className="bg-white rounded-lg shadow-md flex-1 p-8 flex justify-center items-center text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md flex-1">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold">Transaction History</h3>
          <InfoTooltip text="Track all your financial transactions, payments, and experience bookings in one place." />
        </div>

        {/* Header */}
        <div className="grid grid-cols-6 gap-0 mb-2 text-xs font-medium text-gray-500">
          <div className="px-3 text-left">Partner Name</div>
          <div className="px-3 text-center">Experience Name</div>
          <div className="px-3 text-center">Amount Paid</div>
          <div className="px-3 text-center">Experience Date</div>
          <div className="px-3 text-right">Booking Date</div>
          <div className="px-3 text-right">Invoice</div>
        </div>

        {/* Transactions */}
        <div
          className="space-y-2 overflow-y-auto"
          style={{ maxHeight: "calc(100% - 4rem)" }}
        >
          {displayedTransactions.map((transaction, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-0 items-center py-2 border-b border-gray-100"
            >
              {/* Partner Name */}
              <div className="flex items-center px-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mr-2">
                  <span className="text-sm font-semibold">
                    {getAbbreviation(transaction.name)}
                  </span>
                </div>
                <span className="text-xs font-medium">{transaction.name}</span>
              </div>

              {/* Experience Name */}
              <div className="flex justify-center px-3">
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-center bg-green-100 text-green-800">
                  {transaction.experience}
                </span>
              </div>

              {/* Amount */}
              <div className="text-center font-medium text-green-600 text-xs px-3">
                ${transaction.amount.toFixed(2)}
              </div>

              {/* Experience Date */}
              <div className="text-center px-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === "pending"
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-500"
                  }`}
                >
                  {transaction.status === "pending" ? (
                    <div className="flex flex-col items-center">
                      <span>Upcoming</span>
                      <span className="text-xs text-blue-600">
                        {new Date(
                          transaction.experienceDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  ) : (
                    new Date(transaction.experienceDate).toLocaleDateString()
                  )}
                </span>
              </div>

              {/* Booking Date */}
              <div className="text-right text-xs text-gray-500 px-3">
                {new Date(transaction.paymentDate).toLocaleDateString()}
              </div>

              {/* Invoice Button */}
              <div className="px-3 text-right">
                <button
                  onClick={() => {
                    console.log(
                      `Downloading invoice for transaction ${index + 1}`
                    );
                  }}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Invoice
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See More Transactions Button */}
        {!showAllTransactions && (
          <div className="flex justify-end mt-4 border-t border-gray-100 pt-3">
            <button
              onClick={() => setShowAllTransactions(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span>See More Transactions</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
