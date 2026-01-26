"use client";

import EventDetails from "@/components/custom/reuseable/EventDetails";
import { useGetSingleEventQuery } from "@/redux/api/eventApi";
import { useParams } from "next/navigation";

const SingleEventDetails = () => {
  const { id }: { id: string } = useParams();
  const { data, isLoading } = useGetSingleEventQuery(id);
  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <div>
      <EventDetails event={data.data} />
    </div>
  );
};

export default SingleEventDetails;
