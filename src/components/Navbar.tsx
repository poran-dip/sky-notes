import { Link } from "react-router";
import Logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full flex py-2 md:py-3 px-3 sm:px-4 md:px-6">
      <Link to="/">
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 cursor-pointer hover:-translate-y-1 transition-all duration-200">
          <img
            alt="Sky Notebook logo"
            src={Logo}
            className="h-8 sm:h-10 md:h-12 w-auto"
          />
          <p className="text-lg sm:text-xl md:text-2xl font-black text-blue-50">
            SkyNotes
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
