import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/event";
import Link from "next/link";
import React from "react";
interface Props {
  event: TEvent;
}
const EventCard = ({ event }: Props) => {
  return (
    <div className="max-w-md rounded-2xl bg-black border border-slate-900 shadow-lg overflow-hidden">
      {/* Image */}
      {event.image && (
        <img
          src={event.image}
          alt={event.name}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-5 space-y-3">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
            {event.status}
          </span>

          {event.joining_fee !== null && (
            <span className="text-sm font-semibold text-pinkish">
              ${event.joining_fee}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white">{event.name}</h3>

        {/* Date */}
        <p className="text-sm text-zinc-400">
          {new Date(event.date_time).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}{" "}
          •{" "}
          {new Date(event.date_time).toLocaleTimeString("en-US", {
            timeStyle: "short",
          })}
        </p>

        {/* Location */}
        {event.location && (
          <p className="text-sm text-zinc-400">📍 {event.location}</p>
        )}

        {/* Capacity */}
        {event.people_capacity && (
          <p className="text-sm text-zinc-400">
            👥 Capacity: {event.people_capacity}
          </p>
        )}

        {/* Description */}
        {event.description && (
          <p className="text-sm text-zinc-300 line-clamp-3">
            {event.description}
          </p>
        )}

        {/* Action */}
        <Link href={"/"}>
          <Button className="w-full rounded-full cursor-pointer">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
