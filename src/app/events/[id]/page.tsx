"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import EventDetails from "@/components/custom/reuseable/EventDetails";
import { useGetSingleEventQuery } from "@/redux/api/eventApi";
import { useParams } from "next/navigation";

const SingleEventDetails = () => {
  const { id }: { id: string } = useParams();
  const { data, isLoading } = useGetSingleEventQuery(id);
  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen w-full flex items-center justify-center   bg-black px-4 py-10">
          <Card
            className="w-full bg-black border-slate-900"
            style={{ width: "450px", height: "450px" }}
          >
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="h-full">
              <Skeleton className="h-full w-full" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <EventDetails event={data.data} />
      )}
    </div>
  );
};

export default SingleEventDetails;
