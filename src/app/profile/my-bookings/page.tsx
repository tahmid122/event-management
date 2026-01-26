"use client";

import { useGetBookingsQuery } from "@/redux/api/eventApi";
import BookingTable from "./BookingTable";

const Bookings = () => {
  const { data, isLoading } = useGetBookingsQuery();
  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <div>
      <BookingTable bookings={data?.data} />
    </div>
  );
};

export default Bookings;
