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
  }),
});

export const { useCreateEventMutation, useGetAllEventsQuery } = eventApi;
