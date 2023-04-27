import { gql } from "@apollo/client";

export const GET_SINGLE_POST = gql`
  fragment CommentData on Comment {
    id
    body
    votesCount
    replies(first: $first, order: $repliesOrder2) {
      nodes {
        id
        body
      }
    }
  }

  query Post(
    $postId: ID
    $slug: String
    $order: CommentsOrder
    $after: String
    $first: Int
    $repliesOrder2: CommentsOrder
    $commentsFirst2: Int
  ) {
    post(id: $postId, slug: $slug) {
      id
      name
      slug
      tagline
      url
      description
      votesCount
      website
      commentsCount
      reviewsRating
      media {
        url
      }
      thumbnail {
        url
      }
      comments(order: $order, after: $after, first: $commentsFirst2) {
        edges {
          cursor
          node {
            ...CommentData
          }
        }
      }
    }
  }
`;
