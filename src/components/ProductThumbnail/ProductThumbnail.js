import React from "react";

// prop-types
import PropTypes from "prop-types";

const ProductThumbnail = (props) => {
  const { thumbnailUrl } = props;
  return <img loading="lazy" src={thumbnailUrl} alt="Product thumbnail" />;
};

ProductThumbnail.propTypes = {
  thumbnailUrl: PropTypes.string || undefined,
};

export default ProductThumbnail;
