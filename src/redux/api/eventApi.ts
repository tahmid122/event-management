import { TEvent } from "@/types/event";
import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<{ data: TEvent[] }, void>({
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
    publishAnEvent: builder.mutation({
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
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetAllCreatedEventsQuery,
  usePublishAnEventMutation,
  useDeleteAnEventMutation,
  useUpdateAnEventMutation,
} = eventApi;
