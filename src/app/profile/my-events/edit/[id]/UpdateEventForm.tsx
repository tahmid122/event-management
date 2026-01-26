"use client";
import { DatePicker } from "@/components/custom/reuseable/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateEventMutation,
  useUpdateAnEventMutation,
} from "@/redux/api/eventApi";
import { TEvent } from "@/types/event";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
const UpdateEventForm = () => {
  const router = useRouter();
  const { id: paramId }: { id: string } = useParams();
  // rtk
  const [date, setDate] = useState<Date>();
  const [updateAnEvent, { isLoading }] = useUpdateAnEventMutation();
  const [eventDetails, setEventDetails] = useState<TEvent>({
    name: "",
    location: "",
    date_time: "",
    joining_fee: 0,
    people_capacity: 0,
    managerId: "jfyRvWpN85x5lpwDoMJXpyEYgvP2Qge5",
  });
  // handle submit
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (paramId && date) {
      const finalDetails: TEvent = {
        ...eventDetails,
        id: paramId,
        date_time: new Date(date || "").toISOString(),
      };
      const res = await updateAnEvent(finalDetails).unwrap();
      if (res.success) {
        toast.success(res.message);
        router.push("/profile/my-events");
      } else {
        toast.error(res.message);
      }
    }
  };
  return (
    <Card className="w-full max-w-sm bg-black text-whiter border-slate-900 ">
      <CardHeader>
        <CardTitle className="text-whiter text-center text-xl">
          Update event
        </CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                type="text"
                value={eventDetails.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEventDetails((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Event name"
                className="border-slate-800 outline-none"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Event Location</Label>
              <Input
                id="location"
                type="text"
                value={eventDetails.location}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEventDetails((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="Event location"
                className="border-slate-800 outline-none"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">People Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={eventDetails.people_capacity}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEventDetails((prev) => ({
                    ...prev,
                    people_capacity: parseInt(e.target.value),
                  }))
                }
                placeholder="People capacity"
                className="border-slate-800 outline-none"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Joining Fee</Label>
              <Input
                id="joining"
                type="number"
                value={eventDetails.joining_fee}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEventDetails((prev) => ({
                    ...prev,
                    joining_fee: parseInt(e.target.value),
                  }))
                }
                placeholder="Joining fee"
                className="border-slate-800 outline-none"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Event Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>

          <Button type="submit" className="w-full mt-5 cursor-pointer">
            {isLoading ? "Updating..." : "Update Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateEventForm;
