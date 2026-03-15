export default function UserMenu() {
  return (
    <div className="sticky top-0 right-0 z-50 bg-gray-100 py-4 px-8 shadow">
      <div className="flex justify-end">
        <button className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-purple-700">EM</span>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-700">
              Enrique Maldonado
            </div>
            <div className="text-xs text-gray-400">ID: HM-2025-0501</div>
          </div>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
