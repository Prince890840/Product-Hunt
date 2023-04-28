import { gql } from "@apollo/client";

export const FETCH_SINGLE_COLLECTION = gql`
  query Collection($after: String, $collectionId: ID) {
    collection(id: $collectionId) {
      id
      name
      description
      posts(after: $after) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            reviewsCount
            thumbnail {
              url
            }
            description
          }
        }
      }
    }
  }
`;
