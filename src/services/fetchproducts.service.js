// apollo client
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { ACCESS_TOKEN } from "../constant/Constant";

const client = new ApolloClient({
  uri: "https://api.producthunt.com/v2/api/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

const getProducts = async () => {
  const GET_PRODUCTS = gql`
    {
      posts {
        edges {
          node {
            id
            name
            description
            votesCount
            website
            tagline
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
      }
    }
  `;

  try {
    const result = await client.query({ query: GET_PRODUCTS });
    return result.data.posts.edges;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getProducts;
