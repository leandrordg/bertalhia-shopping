import { env } from "@/utils/env";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const queryClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: env.HYGRAPH_API_URL }),
});

export const mutationClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: env.HYGRAPH_API_URL }),
});
