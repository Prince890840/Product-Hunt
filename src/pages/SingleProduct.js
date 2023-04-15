import React, { Fragment, useCallback, useEffect, useState } from "react";

// styles
import "../styles/hunt/_singleproduct.scss";

// service
// import getProducts from "../services/fetchproducts.service";

// components
import ProductItem from "./ProductItem";
import { gql, useQuery } from "@apollo/client";

const SingleProduct = () => {
  /*   const [products, setProducts] = useState([]);

  getProducts()
    .then((edges) => setProducts(edges))
    .catch((error) => console.log(error)); */

  // =================================================

  const GET_POSTS = gql`
    query GetPosts($after: String) {
      posts(after: $after) {
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

  const [endCursor, setEndCursor] = useState(null);
  const { data, loading, fetchMore } = useQuery(GET_POSTS, {
    variables: { after: endCursor },
  });

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchMore({
        variables: { after: data?.posts?.pageInfo?.endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult?.posts?.edges;
          const pageInfo = fetchMoreResult?.posts?.pageInfo;

          setEndCursor(pageInfo.endCursor);

          return {
            posts: {
              edges: [...previousResult?.posts?.edges, ...newEdges],
              pageInfo,
            },
          };
        },
      });
    }
  });

  /*   const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      data?.posts?.pageInfo?.hasNextPage
    ) {
      fetchMore({
        variables: { after: data.posts.pageInfo.endCursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: {
              ...fetchMoreResult.posts,
              edges: [...prev.posts.edges, ...fetchMoreResult.posts.edges],
            },
          };
        },
      });
    }
  }); */

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Fragment>
      <div className="header__section">
        <h1>Fresh products Friday</h1>
        <form>
          <select name="product_filter" id="product_filter">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
          </select>
        </form>
      </div>
      <div onScroll={handleScroll}>
        <ProductItem products={data?.posts?.edges} />
        {loading && <p>Loading...</p>}
      </div>
    </Fragment>
  );
};

export default SingleProduct;
