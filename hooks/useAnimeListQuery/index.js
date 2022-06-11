import { useQuery, QUERY } from "./animeList.graphql";

const useAnimeListQuery = () => {
  const { data } = useQuery(QUERY);
  if (data) {
    return data.Page?.media;
  }
  return [];
};

export { useAnimeListQuery };
