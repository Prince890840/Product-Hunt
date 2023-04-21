import React, { useState } from "react";

// styles
import "../styles/hunt/_productitem.scss";

// components
import ProductThumbnail from "../components/ProductThumbnail/ProductThumbnail";
import ProductModal from "./ProductModal";

const ProductItem = (props) => {
  const { product } = props;
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
          <h4>{product?.node?.name}</h4>
          <p>{product?.node?.tagline}</p>
          <div className="tag__section">
            <p>Free</p>
            <p>Productivity</p>
          </div>
        </div>
        <div className="product__vote">
          <div className="vote__box">
            <button>
              {product?.node?.votesCount ? product?.node?.votesCount : "-"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
