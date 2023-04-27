import { gql } from "@apollo/client";

export const GET_FILTERED_PRODUCTS = gql`
  query Posts(
    $postedBefore: DateTime
    $postedAfter: DateTime
    $after: String
    $before: String
    $order: PostsOrder
    $first: Int
  ) {
    posts(
      postedBefore: $postedBefore
      postedAfter: $postedAfter
      after: $after
      before: $before
      order: $order
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          name
          website
          slug
          commentsCount
          tagline
          votesCount
          createdAt
          thumbnail {
            url
          }
          topics(first: $first) {
            ...TopicFragment
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
  fragment TopicFragment on TopicConnection {
    edges {
      cursor
      node {
        id
        name
      }
    }
  }
`;
