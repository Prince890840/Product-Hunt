import { gql } from "@apollo/client";

export const SEARCH_PRODUCT = gql`
  query Post($slug: String) {
    post(slug: $slug) {
      id
      name
      slug
      tagline
      thumbnail {
        url
      }
    }
  }
`;
