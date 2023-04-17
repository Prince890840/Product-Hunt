import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($after: String, $order: PostsOrder) {
    posts(after: $after, order: $order) {
      edges {
        node {
          id
          name
          description
          votesCount
          website
          tagline
          productLinks {
            type
            url
          }
          thumbnail {
            url
          }
          media {
            videoUrl
            type
            url
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;
