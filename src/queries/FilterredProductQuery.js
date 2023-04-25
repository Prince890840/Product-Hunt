import { gql } from "@apollo/client";

export const GET_FILTERED_PRODUCTS = gql`
  query FilteredPosts(
    $first: Int
    $postedBefore: DateTime
    $postedAfter: DateTime
    $after: String
  ) {
    posts(
      postedBefore: $postedBefore
      postedAfter: $postedAfter
      after: $after
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          name
          website
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
