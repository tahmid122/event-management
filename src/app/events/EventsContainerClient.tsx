"use client";

import EventCard from "@/components/custom/reuseable/EventCard";
import { useGetAllEventsQuery } from "@/redux/api/eventApi";
import { useEffect, useState } from "react";
import EventSearch from "./EventSearch";
import { TEvent } from "@/types/event";
import SkeletonUI from "@/components/custom/reuseable/SkeletonUI";

const EventsContainerClient = () => {
  const { data, isLoading } = useGetAllEventsQuery();
  const [events, setEvents] = useState<TEvent[]>([]);
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    if (data?.success) {
      setEvents(data.data);
    }
  }, [data]);

  // handle search
  useEffect(() => {
    if (!query) {
      if (data?.data) {
        setEvents(data.data);
      }
      return;
    }
    const timer = setTimeout(() => {
      const filteredEvents = data?.data.filter((event) =>
        event.name.toLowerCase().includes(query.toLocaleLowerCase()),
      );
      if (filteredEvents) {
        setEvents(filteredEvents);
      }
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);
  if (isLoading) return <SkeletonUI count={12} />;
  return (
    <section className="py-5">
      <EventSearch setQuery={setQuery} />
      <div className="grid grid-cols-4 gap-5 p-5">
        {data?.success &&
          events.map((singleEvent) => (
            <EventCard key={singleEvent.id} event={singleEvent} />
          ))}
      </div>
    </section>
  );
};

export default EventsContainerClient;
