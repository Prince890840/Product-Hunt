import { gql } from "@apollo/client";

export const FETCH_TOP_TOPICS = gql`
  query Topics {
    topics(first: 5) {
      edges {
        node {
          id
          name
          slug
          description
          followersCount
          image
          isFollowing
          postsCount
          url
          createdAt
        }
      }
    }
  }
`;
