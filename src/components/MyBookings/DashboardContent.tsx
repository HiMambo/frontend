import UserProfileDashboard from "./sections/ProfileSection";
import MessagesSection from "./sections/MessagesSection";

interface DashboardContentProps {
  selectedSection: string;
}

export default function DashboardContent({ selectedSection }: DashboardContentProps) {
  switch (selectedSection) {
    case "user-profile":
      return <UserProfileDashboard />;
    case "messages":
      return <MessagesSection />;
    default:
      return <h1 className="text-3xl font-bold">Welcome to HiMambo Dashboard</h1>;
  }
}
