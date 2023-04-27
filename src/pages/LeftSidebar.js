import React, { Fragment } from "react";

// components
import SearchProduct from "./SearchProduct";
import Products from "./Products";

const LeftSidebar = () => {
  return (
    <Fragment>
      <SearchProduct />
      <Products />
    </Fragment>
  );
};

export default LeftSidebar;
