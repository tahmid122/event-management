"use client";

import EventCard from "@/components/custom/reuseable/EventCard";
import { useGetAllEventsQuery } from "@/redux/api/eventApi";

const EventsContainerClient = () => {
  const { data, isLoading } = useGetAllEventsQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="grid grid-cols-4 gap-5 p-5">
      {data?.success &&
        data.data.map((singleEvent) => (
          <EventCard key={singleEvent.id} event={singleEvent} />
        ))}
    </div>
  );
};

export default EventsContainerClient;
