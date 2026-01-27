"use client";

import EventCard from "@/components/custom/reuseable/EventCard";
import { useGetAllEventsQuery } from "@/redux/api/eventApi";
import { useEffect, useState } from "react";
import EventSearch from "./EventSearch";
import { TEvent } from "@/types/event";
import SkeletonUI from "@/components/custom/reuseable/SkeletonUI";
import { Button } from "@/components/ui/button";
import { FaXmark } from "react-icons/fa6";

const EventsContainerClient = () => {
  const { data, isLoading } = useGetAllEventsQuery();
  const [events, setEvents] = useState<TEvent[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
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
    setSearching(true);
    const timer = setTimeout(() => {
      const filteredEvents = data?.data.filter((event) =>
        event.name.toLowerCase().includes(query.toLocaleLowerCase()),
      );
      if (filteredEvents) {
        setEvents(filteredEvents);
      }
      setSearching(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
      setSearching(false);
    };
  }, [query]);
  // handle reset
  const handleReset = (): void => {
    if (Array.isArray(data?.data)) {
      setEvents(data?.data);
      setQuery("");
    }
  };
  return (
    <section className="py-5">
      <div className="flex items-center justify-center gap-2">
        <EventSearch setQuery={setQuery} query={query} />
        {query && (
          <Button
            onClick={handleReset}
            className="text-whiter cursor-pointer bg-red-700 hover:bg-red-800"
          >
            <FaXmark />
          </Button>
        )}
      </div>
      {isLoading || searching ? (
        <SkeletonUI count={12} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 p-5">
          {data?.success &&
            events.map((singleEvent) => (
              <EventCard key={singleEvent.id} event={singleEvent} />
            ))}
        </div>
      )}
    </section>
  );
};

export default EventsContainerClient;
