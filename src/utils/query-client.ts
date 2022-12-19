import { QueryClient } from "@tanstack/react-query";

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: process.env.NODE_ENV === "development" ? 0 : CACHE_TIME,
    },
  },
});
