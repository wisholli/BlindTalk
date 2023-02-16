import { GlobalFeedIn } from "./dto/global-feed.in";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.realworld.io/api" }),
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<GlobalFeedIn, string>({
      query: (name) => ({ url: `/${name}`, method: "get" }),
    }),
  }),
});

export const { useGetGlobalFeedQuery } = feedApi;
