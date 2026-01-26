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
    createEvent: builder.mutation({
      query: (event) => {
        return {
          url: "/api/event",
          method: "POST",
          body: event,
        };
      },
      invalidatesTags: ["events"],
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
      invalidatesTags: ["my-events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetAllCreatedEventsQuery,
  usePublishAnEventMutation,
  useDeleteAnEventMutation,
} = eventApi;
