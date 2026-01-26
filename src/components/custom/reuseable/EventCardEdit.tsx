"use client";
import { Button } from "@/components/ui/button";
import {
  useDeleteAnEventMutation,
  usePublishAnEventMutation,
} from "@/redux/api/eventApi";
import { useCurrentUser } from "@/redux/authSlice";
import { useAppSelector } from "@/redux/store";
import { TEvent } from "@/types/event";
import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
interface Props {
  event: TEvent;
}
const EventCardEdit = ({ event }: Props) => {
  const user = useAppSelector(useCurrentUser);
  const [deleteAnEvent, { isLoading: isDeleting }] = useDeleteAnEventMutation();
  //rtk
  const [publishEvent, { isLoading }] = usePublishAnEventMutation();
  const handleDelete = async (id: string | undefined) => {
    if (id) {
      const res = await deleteAnEvent(id).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
  };
  // only admin can publish event
  // publish event
  const handlePublish = async (id: string | undefined): Promise<void> => {
    if (id) {
      const res = await publishEvent(id).unwrap();
      console.log(res);
    }
  };
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
        <div className="flex gap-2 w-full">
          <Link href={"/"} className="block w-full">
            <Button className="w-full rounded-full cursor-pointer">
              View Details
            </Button>
          </Link>
          {user?.role === "ADMIN" && (
            <Button
              onClick={() => handlePublish(event.id)}
              className="rounded-full cursor-pointer bg-green-700"
            >
              {isLoading ? "Publishing" : "Publish"}
            </Button>
          )}

          <Link href={`/profile/my-events/edit/${event.id}`}>
            <Button className="w-full rounded-full cursor-pointer">Edit</Button>
          </Link>
          <Button
            onClick={() => handleDelete(event.id)}
            className={`rounded-full cursor-pointer bg-red-600 hover:bg-red-800 ${isDeleting && "animate-spin"}`}
          >
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCardEdit;
