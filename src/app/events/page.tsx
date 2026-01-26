import EventCard from "@/components/custom/reuseable/EventCard";
import { TEvent } from "@/types/event";
import React from "react";
import EventsContainerClient from "./EventsContainerClient";

const Events = () => {
  return (
    <section>
      <EventsContainerClient />
    </section>
  );
};

export default Events;
