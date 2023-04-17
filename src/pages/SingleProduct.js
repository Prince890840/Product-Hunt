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

  const [filteredProductValue, setFilterProductValue] = useState(null);

  const { data, loading, fetchMore } = useQuery(GET_POSTS, {
    variables: filteredProductValue
      ? { after: endCursor, order: filteredProductValue }
      : { after: endCursor },
  });

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchMore({
        variables: { after: data?.posts?.pageInfo?.endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult?.posts?.edges;
          const pageInfo = fetchMoreResult?.posts?.pageInfo;

          // Remove duplicates from the newEdges array
          const filteredEdges = newEdges.filter((newEdge) => {
            const ids = previousResult.posts.edges.map((edge) => edge.node.id);
            return !ids.includes(newEdge.node.id);
          });

          setEndCursor(pageInfo.endCursor);

          return {
            posts: {
              edges: [...previousResult?.posts?.edges, ...filteredEdges],
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

  const onProductFilterSelected = (event) => {
    setFilterProductValue(event.target.value);
  };

  return (
    <Fragment>
      <div className="header__section">
        <h1>Your next favorite thing 👇</h1>
        <form>
          <select name="order" id="order" onChange={onProductFilterSelected}>
            <option value="FEATURED_AT">Featured</option>
            <option value="NEWEST">Newest</option>
          </select>
        </form>
      </div>
      <div onScroll={handleScroll}>
        {data?.posts?.edges &&
          data?.posts?.edges?.length > 0 &&
          data?.posts?.edges?.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        {loading && <p>Loading...</p>}
      </div>
    </Fragment>
  );
};

export default SingleProduct;

