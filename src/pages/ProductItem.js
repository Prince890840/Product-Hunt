import React, { useState } from "react";

// styles
import "../styles/hunt/_productitem.scss";

// components
import ProductThumbnail from "../components/ProductThumbnail/ProductThumbnail";
import ProductModal from "./ProductModal";

// prop-types
import PropTypes from "prop-types";

const ProductItem = (props) => {
  const { product } = props;

  const topics = product?.node.topics.edges;

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <ProductModal
          {...props}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          product={product}
        />
      )}
      <div className="product__zone" onClick={openModal}>
        <div className="product__image">
          {product?.node?.thumbnail && (
            <ProductThumbnail thumbnailUrl={product?.node?.thumbnail?.url} />
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
            {topics?.map((topic, index) => (
              <p key={index}>{topic.node.name}</p>
            ))}
          </div>
        </div>
        <div className="product__vote">
          <div className="vote__box">
            <button>
              <div className="animated__arrow-image"></div>
              {product?.node?.votesCount ? product?.node?.votesCount : "-"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
