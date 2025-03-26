import { env } from "@/utils/env";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const queryClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: env.HYGRAPH_API_URL,
    headers: {
      Authorization: `Bearer ${env.HYGRAPH_QUERY_TOKEN}`,
    },
  }),
});

export const mutationClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: env.HYGRAPH_API_URL,
    headers: {
      Authorization: `Bearer ${env.HYGRAPH_QUERY_TOKEN}`,
    },
  }),
});
