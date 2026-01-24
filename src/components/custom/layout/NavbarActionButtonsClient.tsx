"use client";
import { Button } from "@/components/ui/button";
import { useLogoutUserMutation } from "@/redux/api/authApi";
import { logout, useCurrentUser } from "@/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { toast } from "sonner";

const NavbarActionButtonsClient = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  console.log(user);
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
    <div className="hidden lg:flex items-center gap-2">
      {user?.email ? (
        <>
          <h5 className="font-bold mr-5">{user.name}</h5>
          <Button
            onClick={handleLogout}
            className="bg-transparent uppercase text-pinkish font-bold border border-pinkish hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            <FaSignOutAlt />
            {isLoading ? "Logging out.." : "Logout"}
          </Button>
        </>
      ) : (
        <>
          <Link href={"/login"}>
            <Button className="bg-transparent uppercase text-pinkish font-bold border border-pinkish hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
              <FaSignInAlt />
              Login
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button className="bg-white text-black font-semibold uppercase hover:bg-pinkish hover:text-white transition-all duration-300 cursor-pointer">
              <FaUserPlus />
              Signup
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarActionButtonsClient;
