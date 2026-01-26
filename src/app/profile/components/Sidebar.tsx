"use client";
import NavLink from "@/components/custom/reuseable/NavLink";
import { FaPlusCircle } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import ManagerLinks from "./ManagerLinks";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
const Sidebar = () => {
  // logged in user
  const user = useAppSelector(useCurrentUser);
  return (
    <aside className="border h-full border-slate-950 p-4 min-w-50">
      <h2 className="text-xl font-semibold">☪️ Dashboard ☪️</h2>
      <ul className="flex flex-col gap-4 mt-5">
        {user?.role !== "MANAGER" && (
          <>
            <li>
              <NavLink
                text="My Events"
                link="/profile/my-events"
                icon={<FaCalendarCheck />}
              />
            </li>
            <li>
              <NavLink
                text="Create Event"
                link="/profile/create-events"
                icon={<FaPlusCircle />}
              />
            </li>
          </>
        )}

        {/* Manager links */}
        {user?.role === "MANAGER" && <ManagerLinks />}
      </ul>
    </aside>
  );
};

export default Sidebar;
