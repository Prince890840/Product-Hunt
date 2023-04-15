import React, { Fragment, useState } from "react";

// styles
import "../styles/hunt/_singleproduct.scss";

// service
import getProducts from "../services/fetchproducts.service";

// components
import ProductItem from "./ProductItem";

const SingleProduct = () => {
  const [products, setProducts] = useState([]);

  getProducts()
    .then((edges) => setProducts(edges))
    .catch((error) => console.log(error));

  return (
    <Fragment>
      <div className="header__section">
        <h1>Fresh products Friday</h1>
        <form>
          <select name="product_filter" id="product_filter">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
          </select>
        </form>
      </div>
      <ProductItem products={products} />
    </Fragment>
  );
};

export default SingleProduct;
