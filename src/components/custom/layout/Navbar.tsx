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

const Navbar = () => {
  return (
    <header className="bg-black sticky top-0 left-0 py-4">
      <nav className="container text-whiter">
        {/* main */}
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className="text-xl lg:text-2xl font-semibold text-pinkish"
          >
            Event SMT
          </Link>
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
              <NavLink text="Contact" link="/contact" icon={<FaEnvelope />} />
            </li>
          </ul>
          {/* buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href={"/login"}>
              <Button className="bg-transparent uppercase text-pinkish font-bold border border-pinkish hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                <FaSignInAlt />
                Login
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button className="bg-white text-black font-semibold uppercase hover:bg-pinkish hover:text-white transition-all duration-300 cursor-pointer">
                <FaUserPlus />
                Signup
              </Button>
            </Link>
          </div>
          {/* Mobile Nav */}
          <MobileNavlinks />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
