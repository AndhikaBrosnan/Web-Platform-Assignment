import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      description
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      title {
        romaji
        english
        native
      }
    }
  }
`;

export { useQuery, QUERY };
