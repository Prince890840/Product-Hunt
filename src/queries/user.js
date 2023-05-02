import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query user($first: Int) {
    viewer {
      user {
        id
        name
        profileImage
        headline
        username
        votedPosts {
          totalCount
          edges {
            cursor
            node {
              id
              name
              slug
              tagline
              votesCount
              website
              thumbnail {
                url
              }
              topics(first: $first) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
