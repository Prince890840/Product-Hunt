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
  const [allPosts, setAllPosts] = useState([]);

  const { loading, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: 2 },
    onCompleted: (data) => {
      if (!allPosts.length) {
        const { edges } = data?.posts;
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

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && !loading) {
        try {
          if (allPosts.length > 0) {
            const lastPost = allPosts[allPosts?.length - 1];
            const { data } = await fetchMore({
              variables: {
                after: lastPost?.cursor,
              },
            });
            const { edges } = data?.posts;
            setAllPosts((prevPosts) => [...prevPosts, ...edges]);
          } else {
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, options);

    if (intersectionObserverRef.current) {
      observer.observe(intersectionObserverRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, fetchMore, allPosts]);

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
      {allPosts.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
      <div ref={intersectionObserverRef}>Loading more posts...</div>
    </Fragment>
  );
};

export default SingleProduct;
