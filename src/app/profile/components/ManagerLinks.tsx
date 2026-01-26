"use client";

import NavLink from "@/components/custom/reuseable/NavLink";
import { FaPlusCircle } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";

const ManagerLinks = () => {
  return (
    <>
      <li>
        <NavLink
          text="All Events"
          link="/profile/all-events"
          icon={<FaCalendarCheck />}
        />
      </li>
      {/* <li>
        <NavLink
          text="Create Event"
          link="/profile/create-events"
          icon={<FaPlusCircle />}
        />
      </li> */}
    </>
  );
};

export default ManagerLinks;
