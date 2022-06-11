import { useQuery, QUERY } from "./animeDetail.graphql";

const useAnimeDetailQuery = (id) => {
  let variables = {
    id,
  };

  const { data } = useQuery(QUERY, { variables });

  if (data) {
    return data?.Media;
  }
  return {};
};

export { useAnimeDetailQuery };
