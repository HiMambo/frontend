interface LoadingMessageProps {
  message?: string;
}

export default function LoadingMessage({ message = "Loading..." }: LoadingMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--neutral-100)]">
      <div className="flex flex-col items-center gap-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="body-l text-secondary">{message}</span>
      </div>
    </div>
  );
}