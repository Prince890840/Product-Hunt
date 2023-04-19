import React from "react";

const ProductThumbnail = ({ thumbnailUrl }) => {
  return <img loading="lazy" src={thumbnailUrl} alt="Product thumbnail" />;
};

export default ProductThumbnail;
