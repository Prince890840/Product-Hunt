import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query posts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          tagline
          name
          commentsCount
          votesCount
          thumbnail {
            videoUrl
            url
          }
          media {
            videoUrl
            type
            url
          }
        }
      }
    }
  }
`;
