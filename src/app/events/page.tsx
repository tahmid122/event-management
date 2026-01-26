import EventCard from "@/components/custom/reuseable/EventCard";
import { TEvent } from "@/types/event";
import React from "react";
import EventsContainerClient from "./EventsContainerClient";

const Events = () => {
  return (
    <section className="w-full">
      <EventsContainerClient />
    </section>
  );
};

export default Events;
