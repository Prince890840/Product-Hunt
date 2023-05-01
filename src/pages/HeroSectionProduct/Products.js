import React, { Fragment, useEffect, useRef, useState } from "react";

// styles
import "../../styles/hunt/_singleproduct.scss";

// components
import ProductItem from "./ProductItem";

// apollo/client
import { useQuery } from "@apollo/client";

// query
import { GET_POSTS } from "../../queries/FetchProducts";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [filteredProduct, setFilteredProduct] = useState(null);

  const navigate = useNavigate();

  const { loading, fetchMore } = useQuery(GET_POSTS, {
    variables: filteredProduct
      ? { first: 2, order: filteredProduct }
      : {
          first: 2,
        },
    onCompleted: (data) => {
      if (!allPosts.length) {
        const { edges } = data?.posts;
        setAllPosts(edges);
      } else {
        setAllPosts(data?.posts?.edges);
      }
    },
    fetchPolicy: "cache-and-network",
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
                order: filteredProduct,
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
  }, [loading, fetchMore, allPosts, filteredProduct]);

  const getFilteredProducts = (event) => {
    if (event.target.value === "NEWEST") {
      navigate(`${event.target.value.toLowerCase()}`);
      setFilteredProduct(event.target.value);
    } else {
      navigate("/");
      setFilteredProduct(null);
    }
  };

  return (
    <Fragment>
      <div className="header__section">
        <h1>Is the next 🦄 here?</h1>
        <form>
          <select name="order" id="order" onChange={getFilteredProducts}>
            <option value="FEATURED_AT">Featured</option>
            <option value="NEWEST">Newest</option>
          </select>
        </form>
      </div>
      {allPosts.map((product) => (
        <ProductItem key={product?.node?.id} product={product} />
      ))}
      <div ref={intersectionObserverRef}>Loading more posts...</div>
    </Fragment>
  );
};

export default Products;
