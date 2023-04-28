import { gql } from "@apollo/client";

export const GET_ALL_COLLECTIONS = gql`
  query Collections($after: String, $first: Int) {
    collections(after: $after) {
      edges {
        cursor
        node {
          id
          name
          description
          url
          posts(first: $first) {
            totalCount
            edges {
              cursor
              node {
                id
                name
                thumbnail {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
