import { SDGFilterIcon } from "@/components/shared/IconComponents";
import { Clock, Leaf, PuzzleIcon, Sun, Tag, Wallet } from "lucide-react";

export const PAYMENT_PAGE_FAQS = [
  {
    question: "What is included in my booking?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum."
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada."
  },
  {
    question: "Do I need to bring anything?",
    answer:
      "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
  }
]; 

const SDG_DATA = [
  { goal: 1, description: "No Poverty: Helps local people earn enough to live well." },
  { goal: 10, description: "Reduced Inequality: Works to close the gap between the rich and poor within and among nations." },
  { goal: 2, description: "Zero Hunger: Makes sure everyone has access to nutritious food all year round." },
  { goal: 11, description: "Sustainable Cities and Communities: Creates safe, inclusive, and eco-friendly urban living spaces." },
  { goal: 3, description: "Good Health and Well-being: Promotes healthy lifestyles and access to healthcare for everyone." },
  { goal: 12, description: "Responsible Consumption and Production: Encourages recycling and reducing waste to protect our resources." },
  { goal: 4, description: "Quality Education: Provides inclusive and fair learning opportunities for children and adults." },
  { goal: 13, description: "Climate Action: Takes urgent steps to combat climate change and its devastating effects." },
  { goal: 5, description: "Gender Equality: Aims to end discrimination and violence against women and girls." },
  { goal: 14, description: "Life Below Water: Protects our oceans and marine life from pollution and overfishing." },
  { goal: 6, description: "Clean Water and Sanitation: Ensures everyone has safe and affordable drinking water." },
  { goal: 15, description: "Life on Land: Aims to protect forests, stop desertification, and preserve biodiversity." },
  { goal: 7, description: "Affordable and Clean Energy: Switches to renewable energy sources like solar and wind." },
  { goal: 16, description: "Peace, Justice, and Strong Institutions: Fosters peaceful societies and provides access to justice for all." },
  { goal: 8, description: "Decent Work and Economic Growth: Creates good jobs and supports sustainable economic development." },
  { goal: 17, description: "Partnerships for the Goals: Encourages global collaboration between governments, businesses, and citizens." },
  { goal: 9, description: "Industry, Innovation and Infrastructure: Builds resilient infrastructure and fosters new technologies." },
];

export const PARTNER_ONBOARDING_FAQS = [
    {
      icon: <PuzzleIcon />,
      question: 'What does it mean to be a "HiMambo Partner"?',
      answer: "Being a HiMambo Partner means you can showcase your tourism experiences or services to a global audience seeking authentic, sustainable options. You'll get tools to manage your profile, bookings, and communicate with travelers — all in one place."
    },
    {
      icon: <Tag />,
      question: "Do you have to pay to join the platform or is there a cut on bookings?",
      answer: "Signing up and creating your profile is FREE. HiMambo may charge a small commission on bookings or premium features — all details are clearly shown before you commit. There are no hidden fees."
    },
    {
      icon: <Leaf />,
      question: 'What does "sustainable" mean at HiMambo?',
      answer: "Being sustainable means your business or activity is not just fun or comfortable, but also kind to nature, helps local people, and supports the places and cultures you work in. At HiMambo, we help travelers find these responsible experiences by checking that they are truly making a positive difference."
    },
    {
      icon: <Wallet />,
      question: "How do payments work?",
      answer: 'All payments from bookings go to your secure MamboWallet. You can transfer funds directly to your bank account or crypto wallet, track your earnings, and see a clear history of all transactions. Details are found in the "MamboWallet" section of your dashboard.'
    },
    {
      icon: <Sun />,
      question: 'What Makes an Experience "Sustainable" on our platform?',
      answer: (
        <div>
          <p className="mb-800">Sustainable means doing good for the planet and the people who live here! Don`&apos;`t worry if you don`&apos;`t have a &quot;green&quot; certificate or fancy title. If you`&apos;`re honest and caring, we`&apos;`ll help you show travelers all the good you do.</p>
          <p className="mb-800">When you sign up with HiMambo, we`&apos;`ll ask you questions like:</p>
          <ul className="list-disc pl-800 space-y-200">
            <li>How do you help local families or communities?</li>
            <li>What do you do to protect nature (trees, water, animals)?</li>
            <li>Do you pay fair wages and treat workers fairly?</li>
          </ul>
        </div>
      )
    },
    {
      icon: <Clock />,
      question: "How long does it take to get approved?",
      answer: "After submitting your application, our team will review your documents and responses within about 1 week. We'll notify you by email as soon as you're approved or if we need more info."
    },
    {
      icon: <SDGFilterIcon />,
      question: "What are SDGs?",
      answer: (
        <div>
          <p className="mb-600">
            The SDGs are global goals made by the United Nations to make the world a better place by 2030.
          </p>
          <div className="grid grid-cols-2 gap-x-1600 gap-y-600">
            {SDG_DATA.map(({ goal, description }) => (
              <div key={goal} className="flex items-center gap-600">
                <a href={`https://sdgs.un.org/goals/goal${goal}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <img
                    src={`/assets/sdg/E-WEB-Goal-${goal.toString().padStart(2, '0')}.png`}
                    alt={`SDG ${goal}`}
                    className="icon-size-l rounded-100 flex-shrink-0"
                  />
                </a>
                <span className="body-xl text-tertiary">{description}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];