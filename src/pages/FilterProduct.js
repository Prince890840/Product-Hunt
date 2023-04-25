import React, { useEffect, useRef, useState } from "react";

// styles
import "../styles/hunt/_filterproduct.scss";

// components
import ProductThumbnail from "../components/ProductThumbnail/ProductThumbnail";

// apollo-client
import { useQuery } from "@apollo/client";

// query
import { GET_FILTERED_PRODUCTS } from "../queries/FilterredProductQuery";

// react-router-dom
import { useLocation } from "react-router-dom";

const FilterProduct = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [totalCounts, setTotalCounts] = useState("");

  const [postedBefore, setPostedBefore] = useState(new Date().toISOString());

  const [postedAfter, setPostedAfter] = useState(new Date().toISOString());

  const location = useLocation();

  const pathname = location.pathname;

  const parts = pathname.split("/");
  
  const splittedDate = parts.slice(2, 5).join("/");

  useEffect(() => {
    const now = new Date();
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const isoString = date.toISOString(); // outputs "2023-04-25T00:00:00.000Z"

    const yesterday = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1)
    );
    const dayBeforeDate = yesterday.toISOString();

    setPostedBefore(isoString);
    setPostedAfter(dayBeforeDate);
  }, [splittedDate]);

  const { loading, fetchMore } = useQuery(GET_FILTERED_PRODUCTS, {
    variables: {
      first: 2,
      postedBefore: postedBefore,
      postedAfter: postedAfter,
    },
    onCompleted: (data) => {
      if (!allPosts.length) {
        const { edges, totalCount } = data?.posts;
        setAllPosts(edges);
        setTotalCounts(totalCount);
      }
    },
    fetchPolicy: "cache-first",
  });

  const intersectionObserverRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && !loading && totalCounts > 0) {
        try {
          if (allPosts.length > 0) {
            const lastPost = allPosts[allPosts?.length - 1];
            const date = new Date(splittedDate);
            const { data } = await fetchMore({
              variables: {
                after: lastPost?.cursor,
                postedBefore: new Date().toISOString(),
                postedAfter: date.toISOString(),
              },
            });
            const { edges, totalCount } = data?.posts;
            setAllPosts((prevPosts) => [...prevPosts, ...edges]);
            setTotalCounts(totalCount);
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
  }, [loading, fetchMore, allPosts, totalCounts, splittedDate]);

  return (
    <div className="filter-products-container">
      <div className="header-section">
        <h2>Posts for April 23, 2023 | Product Hunt</h2>
        <div className="pagination-buttons">
          <button className="button">←</button>
          <button className="button button-spacing">Daily</button>
          <button className="button button-spacing">→</button>
        </div>
      </div>
      <div className="product-section">
        <ul className="product-area">
          {allPosts &&
            allPosts.length > 0 &&
            allPosts.map((product, index) => (
              <li key={index}>
                <div className="filter-product-zone">
                  <div className="product__image">
                    {product?.node?.thumbnail && (
                      <ProductThumbnail
                        thumbnailUrl={product?.node?.thumbnail?.url}
                      />
                    )}
                  </div>
                  <div className="product__content">
                    <h4>
                      {product?.node?.name}
                      <a
                        href={product.node.website}
                        className="website__link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            stroke="#4B587C"
                            strokeWidth="1.5"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <path d="M9.6 4H4.2a2.4 2.4 0 0 0-2.4 2.4V10"></path>
                            <path d="M6.6 7l3-3-3-3M12 10v3H0"></path>
                          </g>
                        </svg>
                      </a>
                    </h4>
                    <p>{product?.node?.tagline}</p>
                    <div className="tag__section">
                      <p>Artificial Intelligence</p>
                      <p>Design tools</p>
                    </div>
                  </div>
                  <div className="product__vote">
                    <div className="vote__box">
                      <button>
                        <div className="animated__arrow-image"></div>
                        {product?.node?.votesCount
                          ? product?.node?.votesCount
                          : "-"}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          <div ref={intersectionObserverRef}>Loading more posts...</div>
        </ul>
      </div>
    </div>
  );
};

export default FilterProduct;
