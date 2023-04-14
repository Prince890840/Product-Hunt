import React from "react";

// styles
import "../styles/hunt/_product.scss";

// components
// import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";

const ProductSectionLayout = () => {
  return (
    <>
      <div className="product__section_layout">
        <div className="left_section">
          <LeftSidebar />
        </div>
    {/*     <div className="right_section">
          <RightSidebar />
        </div> */}
      </div>
    </>
  );
};

export default ProductSectionLayout;
