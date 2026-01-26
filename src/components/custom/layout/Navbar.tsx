import {
  FaHome,
  FaCalendarAlt,
  FaThLarge,
  FaMapMarkerAlt,
  FaBlog,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import Link from "next/link";
import NavLink from "../reuseable/NavLink";
import { Button } from "@/components/ui/button";
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
              <NavLink text="Blogs" link="/blogs" icon={<FaBlog />} />
            </li>
            <li>
              <NavLink text="Chat" link="/chat" icon={<FaEnvelope />} />
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
