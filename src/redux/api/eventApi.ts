import { TEvent } from "@/types/event";
import { baseApi } from "./baseApi";
import { TPayment } from "@/types/payment";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all active events
    getAllEvents: builder.query<
      { success: boolean; message: string; data: TEvent[] },
      void
    >({
      query: () => {
        return {
          url: "/api/event",
        };
      },
      providesTags: ["events"],
    }),
    // create events
    createEvent: builder.mutation({
      query: (event) => {
        return {
          url: "/api/event",
          method: "POST",
          body: event,
        };
      },
      invalidatesTags: ["events", "my-events"],
    }),
    getAllCreatedEvents: builder.query<{ data: TEvent[] }, void>({
      query: () => {
        return {
          url: "/api/event/my-events",
        };
      },
      providesTags: ["my-events"],
    }),
    // Delete event
    deleteAnEvent: builder.mutation({
      query: (id: string) => {
        return {
          url: `/api/event/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["events", "my-events"],
    }),
    // only admin can
    //publish event
    publishAnEvent: builder.mutation<
      { success: boolean; message: string; data: TEvent },
      string
    >({
      query: (id: string) => {
        return {
          url: "/api/event/publish",
          method: "PATCH",
          body: { event_id: id },
        };
      },
      invalidatesTags: ["my-events", "events"],
    }),
    // update events
    updateAnEvent: builder.mutation<
      { success: boolean; message: string; data: TEvent },
      TEvent
    >({
      query: (details) => {
        return {
          url: "/api/event/edit",
          method: "PATCH",
          body: details,
        };
      },
      invalidatesTags: ["my-events", "events"],
    }),
    // get single event details
    getSingleEvent: builder.query({
      query: (id: string) => {
        return {
          url: `/api/event/${id}`,
        };
      },
      providesTags(result, error, id) {
        return [{ type: "events", id: id }];
      },
    }),
    // get my bookings
    getBookings: builder.query<
      { success: boolean; message: string; data: TPayment[] },
      void
    >({
      query: () => {
        return {
          url: "/api/ticket/my-tickets",
        };
      },
      providesTags: ["bookings"],
    }),
    // buy ticket
    buyTicket: builder.mutation({
      query: (event_id) => {
        return {
          url: "/api/ticket/buy",
          method: "POST",
          body: { event_id: event_id },
        };
      },
    }),
    // cancel ticket
    cancelTicket: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => {
        return {
          url: "/api/ticket/cancel",
          method: "POST",
          body: { ticket_id: id },
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetAllCreatedEventsQuery,
  usePublishAnEventMutation,
  useDeleteAnEventMutation,
  useUpdateAnEventMutation,
  useGetSingleEventQuery,
  useGetBookingsQuery,
  useBuyTicketMutation,
  useCancelTicketMutation,
} = eventApi;
