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

  const getUpdatedDate = () => {
    const now = new Date();
    const date = new Date(now);
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString();
  };

  const { loading, fetchMore } = useQuery(GET_POSTS, {
    variables: filteredProduct
      ? { first: 2, order: filteredProduct }
      : {
          first: 2,
          postedBefore: getUpdatedDate(),
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
              variables: filteredProduct
                ? {
                    after: lastPost?.cursor,
                    order: filteredProduct,
                    postedBefore: getUpdatedDate(),
                  }
                : {
                    after: lastPost?.cursor,
                    postedBefore: getUpdatedDate(),
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

  const groupedData = allPosts.reduce((acc, item) => {
    const date = new Date(item.node.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(item);
    return acc;
  }, {});

  console.log(groupedData);

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
      {allPosts.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
      <div ref={intersectionObserverRef}>Loading more posts...</div>
    </Fragment>
  );
};

export default Products;
