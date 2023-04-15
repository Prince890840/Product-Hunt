import React, { Fragment, useCallback, useEffect, useState } from "react";

// styles
import "../styles/hunt/_singleproduct.scss";

// components
import ProductItem from "./ProductItem";

// apollo/client
import { useQuery } from "@apollo/client";

// query
import { GET_POSTS } from "../queries/FetchProducts";

const SingleProduct = () => {
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
  }, [data, fetchMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Fragment>
      <div className="header__section">
        <h1>Your next favorite thing 👇</h1>
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
