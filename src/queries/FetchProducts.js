import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query posts($first: Int, $after: String) {
    posts(after: $after) {
      edges {
        cursor
        node {
          id
          tagline
          name
          website
          votesCount
          thumbnail {
            url
          }
          topics(first: $first) {
            ...TopicFragment
          }
        }
      }
      totalCount
    }
  }

  fragment TopicFragment on TopicConnection {
    edges {
      node {
        id
        name
      }
    }
  }
`;
