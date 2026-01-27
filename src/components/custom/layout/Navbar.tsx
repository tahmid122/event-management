import {
  FaHome,
  FaCalendarAlt,
  FaThLarge,
  FaMapMarkerAlt,
  FaBlog,
  FaEnvelope,
} from "react-icons/fa";

import NavLink from "../reuseable/NavLink";
import MobileNavlinks from "./MobileNavlinks";
import Logo from "../reuseable/Logo";
import NavbarActionButtonsClient from "./NavbarActionButtonsClient";

const Navbar = () => {
  return (
    <header className="bg-black sticky top-0 left-0 py-4 border-b border-b-slate-900 z-999">
      <nav className="container text-whiter">
        {/* main */}
        <div className="flex items-center justify-between">
          <Logo />
          {/* nav links */}
          <ul className="hidden lg:flex items-center gap-10">
            <li>
              <NavLink text="Home" link="/" icon={<FaHome />} />
            </li>
            <li>
              <NavLink text="Events" link="/events" icon={<FaCalendarAlt />} />
            </li>
            <li>
              <NavLink
                text="Categories"
                link="/categories"
                icon={<FaThLarge />}
              />
            </li>
            <li>
              <NavLink
                text="Locations"
                link="/locations"
                icon={<FaMapMarkerAlt />}
              />
            </li>
            <li>
              <NavLink text="Charts" link="/charts" icon={<FaBlog />} />
            </li>
          </ul>
          {/* buttons */}
          <NavbarActionButtonsClient />
          {/* Mobile Nav */}
          <MobileNavlinks />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
