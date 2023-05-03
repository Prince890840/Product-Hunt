import { gql } from "@apollo/client";

export const FETCH_SINGLE_COLLECTION = gql`
  query Collection($collectionId: ID, $after: String, $first: Int) {
    collection(id: $collectionId) {
      id
      name
      url
      description
      posts(after: $after, first: $first) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            reviewsCount
            description
            thumbnail {
              url
            }
          }
        }
      }
    }
  }
`;
