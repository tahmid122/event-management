import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (event) => {
        return {
          url: "/api/event",
          method: "POST",
          body: event,
        };
      },
    }),
  }),
});

export const { useCreateEventMutation } = eventApi;
