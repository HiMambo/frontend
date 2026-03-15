import { AlertCircle } from "lucide-react";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <h3 className="text-lg font-semibold text-gray-800">{message}</h3>
    </div>
  );
}
