"use client";
import { Button } from "@/components/ui/button";
import { useBuyTicketMutation } from "@/redux/api/eventApi";
import { TEvent } from "@/types/event";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
interface Props {
  event: TEvent;
}
const EventDetails = ({ event }: Props) => {
  const router = useRouter();
  const [buyTicket, { isLoading }] = useBuyTicketMutation();

  const handlePayment = async () => {
    const res = await buyTicket(event.id).unwrap();
    if (res.success) {
      router.push(
        `/events/checkout/${res.data.ticketId}?client_secret=${res.data.clientSecret}`,
      );
    }
  };
  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header / Hero */}
        <div className="overflow-hidden rounded-2xl  shadow-sm">
          <div className="relative h-64 bg-linear-to-r to-pinkish from-purple-600">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <span className="mb-2 inline-block w-fit rounded-full bg-green-500 px-3 py-1 text-xs font-semibold">
                {event.status}
              </span>
              <h1 className="text-3xl font-bold md:text-4xl">{event.name}</h1>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-8 p-6 md:grid-cols-3 bg-black">
            {/* Left: Details */}
            <div className="md:col-span-2">
              <h2 className="mb-3 text-xl font-semibold text-whiter">
                About this event
              </h2>
              <p className="leading-relaxed text-whiter">{event.description}</p>

              {/* Info Grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<FaCalendarAlt />}
                  label="Date & Time"
                  value={new Date(event.date_time).toLocaleString()}
                />
                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={event.location}
                />
                <InfoCard
                  icon={<FaUsers />}
                  label="Capacity"
                  value={`${event.people_capacity} people`}
                />
                <InfoCard
                  icon={<FaDollarSign />}
                  label="Joining Fee"
                  value={`$${event.joining_fee}`}
                />
              </div>
            </div>

            {/* Right: Action Card */}
            <div className="h-fit rounded-xl border border-slate-900 bg-black p-6">
              <h3 className="text-lg font-semibold text-whiter">
                Reserve your spot
              </h3>

              <p className="mt-2 text-sm text-whiter">
                Don’t miss this amazing event. Limited seats available.
              </p>

              <div className="mt-4 flex items-center justify-between text-whiter">
                <span className="text-sm">Price</span>
                <span className="text-2xl font-bold text-whiter">
                  ${event.joining_fee}
                </span>
              </div>

              <Button onClick={handlePayment} className="w-full mt-5">
                {isLoading ? "Booking..." : "Book Now"}
              </Button>

              <p className="mt-3 text-center text-xs text-whiter">
                Free cancellation up to 24 hours before event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Info Card */
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 rounded-lg border border-slate-900 bg-black p-4">
    <div className="text-pinkish">{icon}</div>
    <div>
      <p className="text-xs font-medium text-whiter">{label}</p>
      <p className="font-semibold text-whiter">{value}</p>
    </div>
  </div>
);

export default EventDetails;
