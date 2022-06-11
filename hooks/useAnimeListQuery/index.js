import { useQuery, QUERY } from "./animeList.graphql";

const useAnimeListQuery = (page, perPage) => {
  let variables = { page, perPage };

  const { data } = useQuery(QUERY, { variables });

  if (data) {
    return data.Page?.media;
  }
  return [];
};

export { useAnimeListQuery };
