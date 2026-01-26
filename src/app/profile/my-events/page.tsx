import EventCardEdit from "@/components/custom/reuseable/EventCardEdit";

const MyEvents = () => {
  return (
    <section className="grid grid-cols-4 gap-5">
      <EventCardEdit
        event={{
          id: "ddd",
          name: "Global Tech Summit 2031",
          date_time: "2026-05-15T09:00:00.000Z",
          location: "Convention Center, San Francisco",
          category: null,
          people_capacity: 502,
          description: null,
          image: null,
          joining_fee: 50,
          status: "ACTIVE",
          hostId: "vmH3pQL2t9F5FhbBwZ05WygK3Kmzj4o5",
          managerId: "jfyRvWpN85x5lpwDoMJXpyEYgvP2Qge5",
        }}
      />
    </section>
  );
};

export default MyEvents;
