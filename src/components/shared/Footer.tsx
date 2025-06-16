import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  RightArrow,
} from "./IconComponents";
import { Button } from "../ui/button";

interface FooterProps {
  variant?: "default" | "home";
}

const variantStyles = {
  default: {
    footerBg: "bg-footer-background",
    text: "text-footer-text",
    iconColor: "text-footer-socialIcon",
    inputBg: "bg-footer-inputBackground",
    placeholder: "placeholder-footer-inputPlaceholder",
    button: "bg-footer-button text-footer-text hover:brightness-110",
    hoverText: "hover:text-footer-texthover",
  },
  home: {
    footerBg: "bg-footerhome-background",
    text: "text-white",
    iconColor: "text-white",
    inputBg: "bg-footer-inputBackground",
    placeholder: "placeholder-footer-inputPlaceholder",
    button: "bg-footerhome-button text-white hover:bg-footerhome-buttonhover",
    hoverText: "hover:text-footerhome-texthover",
  },
};

export default function Footer({ variant = "default" }: FooterProps) {
  const styles = variantStyles[variant];

  const Hover = ({ children }: { children: React.ReactNode }) => (
    <span
      className={`transition hover:scale-[1.03] ${styles.hoverText}`}
    >
      {children}
    </span>
  );

  return (
    <footer className={`py-10 px-6 md:px-16 ${styles.footerBg} ${styles.text}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">
              If you have any questions,<br />Let us help you!
            </h2>
            <p className="mt-4 text-sm max-w-md">
              If you have any questions or would like to book a tour with us, please don’t hesitate to contact us.
            </p>
            <p className="flex mt-2 text-sm">
              Email:<Hover><a href="mailto:info@himambo.com" className="ml-1">contact@himambo.com</a></Hover>
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-2">Subscribe to our newspaper</h3>
            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Input your email here"
                className={`flex-1 ${styles.inputBg} ${styles.placeholder} text-sm px-4 py-2 rounded-md text-black`}
                required
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Subscribe"
                className={styles.button}
              >
                <RightArrow className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between space-y-6 text-sm">
          {/* Social Icons */}
          <div className={`flex items-center gap-4 ${styles.iconColor}`}>
            <Hover>
              <a href="#" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
            </Hover>
            <Hover>
              <a href="#" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
            </Hover>
            <Hover>
              <a href="#" aria-label="LinkedIn">
                <LinkedIn className="w-6 h-6" />
              </a>
            </Hover>
            <Hover>
              <a href="#" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
            </Hover>
          </div>

          {/* Description Text */}
          <p className="max-w-md">
            A new way of exploring the world!
          </p>

          {/* Navigation Links */}
          <nav aria-label="Footer links" className="grid grid-cols-3 gap-x-6">
            <div className="flex flex-col space-y-2">
              <Hover><a href="#">Home</a></Hover>
              <Hover><a href="#">Testimonials</a></Hover>
              <Hover><a href="#">Destinations</a></Hover>
              <Hover><a href="#">Sign In</a></Hover>
            </div>
            <div className="flex flex-col space-y-2">
              <Hover><a href="#">About Us</a></Hover>
              <Hover><a href="#">Packages</a></Hover>
              <Hover><a href="#">Events</a></Hover>
              <Hover><a href="#">Gallery</a></Hover>
            </div>
            <div className="flex flex-col space-y-2">
              <Hover><a href="#">Our Team</a></Hover>
              <Hover><a href="#">Blog</a></Hover>
              <Hover><a href="#">Contact Us</a></Hover>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs mt-10">
        Copyright HiMambo 2025
      </div>
    </footer>
  );
}
