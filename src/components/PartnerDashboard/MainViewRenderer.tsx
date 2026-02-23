import EducationHub from "./EducationHub/EducationHub.container";
import MamboWallet from "./MamboWallet";
import BusinessPage from "./BusinessPage/BusinessPage.container";

type MainViewRendererProps = {
  selectedSection: string;
};

export default function MainViewRenderer({
  selectedSection,
}: MainViewRendererProps) {
  switch (selectedSection) {
    case "business-page":
      return <BusinessPage />;
    case "experiences":
      return <h1 className="heading-h3 text-primary">Experiences Coming Soon!</h1>;
    case "mambo-wallet":
      return <MamboWallet />;
    case "calendar":
      return <h1 className="heading-h3 text-primary">Calendar Coming Soon!</h1>;
    case "inbox":
      return <h1 className="heading-h3 text-primary">Inbox Coming Soon!</h1>;
    case "marketing-tools":
      return <h1 className="heading-h3 text-primary">Marketing Tools Coming Soon!</h1>;
    case "profile":
      return <h1 className="heading-h3 text-primary">Profile Coming Soon!</h1>;
    case "education-hub":
      return <EducationHub />;
    default:
      return <BusinessPage />;
  }
}
