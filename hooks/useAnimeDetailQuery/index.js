import { useQuery, QUERY } from "./animeDetail.graphql";

const useAnimeListQuery = () => {
  var variables = {
    id: 15125,
  };

  const { data } = useQuery(QUERY, variables);
  if (data) {
    return data;
  }
  return {};
};

export { useAnimeListQuery };
