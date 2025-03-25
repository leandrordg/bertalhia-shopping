import { queryClient } from "@/lib/apollo-client";
import { GET_COLLECTIONS } from "@/models/get-collections";

export async function getCollections(): Promise<Collection[]> {
  const { data } = await queryClient.query({
    query: GET_COLLECTIONS,
    fetchPolicy: "network-only",
  });

  return data.collections;
}
