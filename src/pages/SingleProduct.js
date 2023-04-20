import React, { Fragment, useEffect, useRef, useState } from "react";

// styles
import "../styles/hunt/_singleproduct.scss";

// components
import ProductItem from "./ProductItem";

// apollo/client
import { useQuery } from "@apollo/client";

// query
import { GET_POSTS } from "../queries/FetchProducts";

const SingleProduct = () => {
  const [after, setAfter] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { loading, fetchMore } = useQuery(GET_POSTS, {
    variables: { after },
    onCompleted: (data) => {
      if (!allPosts.length) {
        const { pageInfo, edges } = data.posts;
        setHasMore(pageInfo.hasNextPage);
        setAfter(pageInfo?.endCursor);
        setAllPosts(edges);
      }
    },
  });

  const intersectionObserverRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) {
        fetchMore({
          variables: {
            after: after,
          },
        }).then(({ data }) => {
          const { pageInfo, edges } = data.posts;
          setHasMore(pageInfo.hasNextPage);
          setAfter(pageInfo?.endCursor);
          setAllPosts((prevPosts) => [...prevPosts, ...edges]);
        });
      }
    }, options);

    if (intersectionObserverRef.current) {
      observer.observe(intersectionObserverRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, fetchMore, after]);

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
      <div ref={intersectionObserverRef}>Loading more posts...</div>
    </Fragment>
  );
};

export default SingleProduct;
