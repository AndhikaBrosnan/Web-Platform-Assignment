import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
        id
        bannerImage
        title {
          romaji
          english
          native
        }
        type
        genres
      }
    }
  }
`;

export { useQuery, QUERY };
