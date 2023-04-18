import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts($order: CommentsOrder) {
    posts {
      edges {
        node {
          id
          name
          reviewsCount
          reviewsRating
          slug
          userId
          votesCount
          description
          commentsCount
          tagline
          website
          url
          thumbnail {
            videoUrl
            url
          }
          comments(order: $order) {
            nodes {
              body
            }
          }
          media {
            videoUrl
            type
            url
          }
          user {
            id
            profileImage
            name
            coverImage
            headline
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
