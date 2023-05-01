import React, { useEffect, useRef, useState, useCallback } from "react";

// react-router-dom
import { useLocation } from "react-router-dom";

// styles
import "../../styles/hunt/_filterproduct.scss";

// components
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";
import PaginationButtons from "./PaginationButtons";
import ProductModal from "../HeroSectionProduct/ProductModal";

// apollo-client
import { useQuery } from "@apollo/client";

// query
import { GET_FILTERED_PRODUCTS } from "../../queries/FilterredProductQuery";

const FilterProduct = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [totalCounts, setTotalCounts] = useState("");
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const [postObj, setPostObj] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (product) => {
    setIsOpen(true);
    setPostObj(product);

    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
    setPostObj({});

    document.body.style.overflow = "unset";
  };

  const getUpdatedDate = useCallback(() => {
    let formatedDate, postedBefore, postedAfter;

    switch (parts.length) {
      case 5:
        // Situation 1: Yesterday's launches
        formatedDate = parts.slice(2, 5).join("/");

        const date = new Date(formatedDate + " UTC");
        date.setDate(date.getDate() + 1);
        date.setUTCHours(0, 0, 0, 0);

        postedBefore = date.toISOString();

        const afterDate = new Date(formatedDate + "UTC");
        afterDate.setUTCHours(0, 0, 0, 0);
        afterDate.toISOString();

        postedAfter = afterDate.toISOString();
        break;
      case 4:
        // Situation 2: Last month's launches
        formatedDate = parts.slice(2, 4).join("/");
        postedBefore = null;

        const monthFilter = new Date(formatedDate + " UTC");
        monthFilter.setUTCMonth(monthFilter.getUTCMonth() + 1);
        monthFilter.setDate(1);
        monthFilter.setUTCHours(0, 0, 0, 0);

        postedBefore = monthFilter.toISOString();
        postedAfter = new Date(formatedDate + " UTC").toISOString();
        break;
      default:
        // Situation 3: This year's launches
        formatedDate = parts.slice(2, 3).join("/");

        const now = new Date();
        const currentDate = new Date(now);
        currentDate.setUTCHours(0, 0, 0, 0);
        postedBefore = currentDate.toISOString();

        postedAfter = new Date(formatedDate + " UTC").toISOString();
        break;
    }

    return { postedBefore, postedAfter };
  }, [parts]);

  const { loading, fetchMore } = useQuery(GET_FILTERED_PRODUCTS, {
    variables: {
      postedBefore: getUpdatedDate().postedBefore,
      postedAfter: getUpdatedDate().postedAfter,
      first: 2,
    },
    onCompleted: (data) => {
      const { edges, totalCount } = data?.posts;
      if (!allPosts.length) {
        setAllPosts(edges);
        setTotalCounts(totalCount);
      } else {
        setAllPosts(data?.posts?.edges);
        setTotalCounts(totalCount);
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
      if (entry.isIntersecting && !loading && totalCounts > 0) {
        try {
          if (allPosts.length > 0) {
            const lastPost = allPosts[allPosts?.length - 1];
            const { data } = await fetchMore({
              variables: {
                after: lastPost.cursor,
                postedBefore: getUpdatedDate().postedBefore,
                postedAfter: getUpdatedDate().postedAfter,
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
  }, [loading, fetchMore, allPosts, totalCounts, getUpdatedDate]);

  return (
    <>
      {isOpen && (
        <ProductModal
          postId={postObj?.node?.id}
          slug={postObj?.node?.slug}
          onCloseModal={closeModal}
        />
      )}
      <div className="filter-products-container">
        <PaginationButtons />
        <div className="product-section">
          <ul className="product-area">
            {allPosts &&
              allPosts.length > 0 &&
              allPosts.map((product, index) => (
                <li key={index}>
                  <div
                    className="filter-product-zone"
                    onClick={() => openModal(product)}
                  >
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
    </>
  );
};

export default FilterProduct;
