import React, { Fragment, useRef, useState } from "react";

// styles
import "../styles/hunt/_singleproduct.scss";

// components
import ProductItem from "./ProductItem";

// Intersection-observer
import { InView } from "react-intersection-observer";

// apollo/client
import { useQuery } from "@apollo/client";

// query
import { GET_POSTS } from "../queries/FetchProducts";

const SingleProduct = () => {
  const [after, setAfter] = useState(null);

  const [allPosts, setAllPosts] = useState([]);
  
  const { loading, fetchMore } = useQuery(GET_POSTS, {
    variables: { after },
    onCompleted: (data) => {
      if (!allPosts.length) {
        const { pageInfo, edges } = data.posts;
        setAfter(pageInfo?.endCursor);
        setAllPosts(edges);
      }
    },
  });

  const intersectionObserverRef = useRef();

  const handleIntersection = async (inView) => {
    if (inView && !loading) {
      const { data } = await fetchMore({
        variables: {
          after: after,
        },
      });
      const { pageInfo, edges } = data.posts;
      setAfter(pageInfo?.endCursor);
      setAllPosts((prevPosts) => [...prevPosts, ...edges]);
    }
  };

  return (
    <Fragment>
      <div className="header__section">
        <h1>Your next favorite thing 👇</h1>
        <form>
          <select name="order" id="order">
            <option value="FEATURED_AT">Featured</option>
            <option value="NEWEST">Newest</option>
          </select>
        </form>
      </div>
      {allPosts.map((product) => (
        <ProductItem key={product.node.id} product={product} />
      ))}
      <InView ref={intersectionObserverRef} onChange={handleIntersection}>
        <div>Loading more posts...</div>
      </InView>
    </Fragment>
  );
};

export default SingleProduct;
