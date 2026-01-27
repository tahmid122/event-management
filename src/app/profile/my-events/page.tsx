"use client";
import EventCardEdit from "@/components/custom/reuseable/EventCardEdit";
import SkeletonUI from "@/components/custom/reuseable/SkeletonUI";
import { useGetAllCreatedEventsQuery } from "@/redux/api/eventApi";

const MyEvents = () => {
  const { data, isLoading } = useGetAllCreatedEventsQuery();
  if (isLoading) return <SkeletonUI count={12} />;
  return (
    <section className="grid grid-cols-4 gap-5">
      {data &&
        data.data.map((singleEvent) => (
          <EventCardEdit key={singleEvent.id} event={singleEvent} />
        ))}
    </section>
  );
};

export default MyEvents;
