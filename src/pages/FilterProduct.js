import React, { useEffect, useRef, useState } from "react";

// styles
import "../styles/hunt/_filterproduct.scss";

// components
import ProductThumbnail from "../components/ProductThumbnail/ProductThumbnail";
import PaginationButtons from "./PaginationButtons";

// apollo-client
import { useQuery } from "@apollo/client";

// query
import { GET_FILTERED_PRODUCTS } from "../queries/FilterredProductQuery";

// react-router-dom
import { useLocation } from "react-router-dom";
import ProductModal from "./ProductModal";
import { useCallback } from "react";

const FilterProduct = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [totalCounts, setTotalCounts] = useState("");
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const [postObj, setPostObj] = useState({});
  const [paginationDetails, setPageInfo] = useState({});
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
        formatedDate = parts.slice(2, 4).join("/");
        postedBefore = null;

        const monthFilter = new Date(formatedDate + "UTC");
        monthFilter.setDate(1);
        monthFilter.setUTCHours(0, 0, 0, 0);

        postedAfter = monthFilter.toISOString();
        break;
      default:
        formatedDate = parts.slice(2, 3).join("/");
        postedBefore = null;

        const yearFilter = new Date(formatedDate + "UTC");
        yearFilter.setDate(1);
        yearFilter.setUTCHours(0, 0, 0, 0);

        postedAfter = yearFilter.toISOString();
        break;
    }

    return { postedBefore, postedAfter };
  },[parts]);

  const { loading, fetchMore } = useQuery(GET_FILTERED_PRODUCTS, {
    variables: {
      postedBefore: getUpdatedDate().postedBefore,
      postedAfter: getUpdatedDate().postedAfter,
      after: null,
      first: 2,
    },
    onCompleted: (data) => {
      if (!allPosts.length) {
        const { edges, totalCount, pageInfo } = data?.posts;
        setAllPosts(edges);
        setTotalCounts(totalCount);
        setPageInfo(pageInfo);
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
            const { edges, totalCount, pageInfo } = data?.posts;
            setAllPosts((prevPosts) => [...prevPosts, ...edges]);
            setTotalCounts(totalCount);
            setPageInfo(pageInfo);
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
