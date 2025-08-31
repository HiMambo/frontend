import EducationHub from "./EducationHub";
import MamboWallet from "./MamboWallet";
import BusinessPage from "./BusinessPage";


type MainViewRendererProps = {
  selectedSection: string;
};

export default function MainViewRenderer({
  selectedSection,
}: MainViewRendererProps) {
  switch (selectedSection) {
    case "business-page":
      return <BusinessPage />;
    case "marketing-tools":
      return <h1 className="text-3xl font-bold">Marketing Tools Content</h1>;
    case "education-hub":
      return <EducationHub />;
    case "mambo-wallet":
      return <MamboWallet />;
    default:
      return (
        <h1 className="text-3xl font-bold">Welcome to HiMambo Dashboard</h1>
      );
  }
}
