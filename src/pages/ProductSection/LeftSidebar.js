import React, { Fragment } from "react";

// components
import SearchProduct from "../MainSearchSection/SearchProduct";
import Products from "../HeroSectionProduct/Products";

const LeftSidebar = () => {
  return (
    <Fragment>
      <SearchProduct />
      <Products />
    </Fragment>
  );
};

export default LeftSidebar;
