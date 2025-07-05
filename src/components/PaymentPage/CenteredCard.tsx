import { Card, CardContent } from "@/components/ui/card";

export default function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full max-w-md min-h-[400px]">
      <CardContent className="p-6 space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}