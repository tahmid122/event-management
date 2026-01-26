"use client";

import EventCardEdit from "@/components/custom/reuseable/EventCardEdit";
import { useGetAllEventsQuery } from "@/redux/api/eventApi";
import { useCurrentUser } from "@/redux/authSlice";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

const AllEvents = () => {
  const router = useRouter();
  const user = useAppSelector(useCurrentUser);
  if (user?.role !== "MANAGER") {
    router.back();
  }
  const { data, isLoading } = useGetAllEventsQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <section className="grid grid-cols-4 gap-5">
      {data &&
        data.data.map((singleEvent) => (
          <EventCardEdit key={singleEvent.id} event={singleEvent} />
        ))}
    </section>
  );
};

export default AllEvents;
