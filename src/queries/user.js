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
          edges {
            cursor
            node {
              name
              slug
              tagline
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
