"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaBars } from "react-icons/fa6";
import NavLink from "../reuseable/NavLink";
import {
  FaHome,
  FaCalendarAlt,
  FaThLarge,
  FaMapMarkerAlt,
  FaBlog,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout, useCurrentUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { useLogoutUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
const MobileNavlinks = () => {
  const user = useAppSelector(useCurrentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const handleLogout = async () => {
    const res = await logoutUser(null).unwrap();
    if (res.success) {
      dispatch(logout());
      toast.success("Logout successful");
      router.push("/login");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="block lg:hidden">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <FaBars className="text-xl text-whiter cursor-pointer" />
        </DrawerTrigger>
        <DrawerContent className="bg-black text-whiter border-none p-5 z-999">
          <DialogTitle></DialogTitle>
          <DrawerClose asChild className="flex items-end justify-end w-full">
            <div>
              <FaArrowLeft className="text-xl text-whiter cursor-pointer" />
            </div>
          </DrawerClose>
          <ul className="flex flex-col gap-4 mt-5">
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
            <li>
              <Link href={"/profile"} className="font-bold mr-5 underline">
                {user?.name}
              </Link>
            </li>
            <li className="flex gap-2 flex-wrap mt-5">
              {user?.email ? (
                <Button
                  onClick={handleLogout}
                  className="bg-transparent uppercase text-pinkish font-bold border border-pinkish hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <FaSignOutAlt />
                  {isLoading ? "Logging out.." : "Logout"}
                </Button>
              ) : (
                <>
                  <Link href={"/login"}>
                    <Button className="bg-transparent uppercase text-pinkish font-bold border border-pinkish hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                      <FaSignInAlt />
                      Login
                    </Button>
                  </Link>{" "}
                  <Link href={"/signup"}>
                    <Button className="bg-white text-black font-semibold uppercase hover:bg-pinkish hover:text-white transition-all duration-300 cursor-pointer">
                      <FaUserPlus />
                      Signup
                    </Button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavlinks;
