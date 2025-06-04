import HoverWrapper from "./HoverWrapper";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  RightArrow,
} from "./IconComponents";

export default function Footer() {
  return (
    <footer className="bg-footer-background text-footer-text py-10 px-6 md:px-16">
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
              Email:<HoverWrapper><a href="mailto:info@himambo.com" className="ml-1">info@himambo.com</a></HoverWrapper>
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-2">Subscribe to our newspaper</h3>
            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Input your email here"
                className="flex-1 bg-footer-inputBackground placeholder-footer-inputPlaceholder text-sm px-4 py-2 rounded-md"
              />
              <HoverWrapper>
                <button
                type="submit"
                className="bg-footer-button w-10 h-10 flex items-center justify-center rounded-md"
              >
                <RightArrow className="w-5 h-5"/>
                </button>
              </HoverWrapper>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between space-y-6 text-sm">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className = "w-6 h-6 text-footer-socialIcon">
              <HoverWrapper><Facebook /></HoverWrapper>
            </a>
            <a href="#" aria-label="Twitter" className = "w-6 h-6 text-footer-socialIcon">
              <HoverWrapper><Twitter /></HoverWrapper>
            </a>
            <a href="#" aria-label="Linkedin" className = "w-6 h-6 text-footer-socialIcon">
              <HoverWrapper><LinkedIn /></HoverWrapper>
            </a>
            <a href="#" aria-label="Instagram" className = "w-6 h-6 text-footer-socialIcon">
              <HoverWrapper><Instagram /></HoverWrapper>
            </a>
          </div>

          {/* Description Text */}
          <p className="max-w-md">
            A new way of exploring the world!
          </p>

          {/* Navigation Links */}
          <div className="grid grid-cols-3 gap-x-6">
            <div className="flex flex-col space-y-2">
              <HoverWrapper><a href="#">Home</a></HoverWrapper>
              <HoverWrapper><a href="#">Testimonials</a></HoverWrapper>
              <HoverWrapper><a href="#">Destinations</a></HoverWrapper>
              <HoverWrapper><a href="#">Sign In</a></HoverWrapper>
            </div>
            <div className="flex flex-col space-y-2">
              <HoverWrapper><a href="#">About Us</a></HoverWrapper>
              <HoverWrapper><a href="#">Packages</a></HoverWrapper>
              <HoverWrapper><a href="#">Events</a></HoverWrapper>
              <HoverWrapper><a href="#">Gallery</a></HoverWrapper>
            </div>
            <div className="flex flex-col space-y-2">
              <HoverWrapper><a href="#">Our Team</a></HoverWrapper>
              <HoverWrapper><a href="#">Blog</a></HoverWrapper>
              <HoverWrapper><a href="#">Contact Us</a></HoverWrapper>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs mt-10 text-footer-text">
        Copyright HiMambo 2025
      </div>
    </footer>
  );
}