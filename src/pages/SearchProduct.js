import React, { Fragment } from "react";

// styles
import "../styles/hunt/_searchbox.scss";

// components
import SingleProduct from "./SingleProduct";

const SearchProduct = () => {
  return (
    <Fragment>
      <div className="searchbox__wrapper">
        <div className="search__box">
          <h1>What is your favorite tool for data analytics? 📈</h1>
          <div className="icon__section">
            <span className="icon">
              <svg
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm7 4.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-1.68-.919L5.681 6.92m.001 2.161 3.637 2.338"
                  stroke="#4B587C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <button type="button" className="icon">
              X
            </button>
          </div>
        </div>
        <form>
          <input
            title="Search"
            type="search"
            autoComplete="off"
            placeholder="Search for a product"
            className="input__box"
          ></input>
        </form>

        <div className="answered__section">
          <div className="image__section">
            <img
              src="https://ph-avatars.imgix.net/5365443/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=28&h=28&fit=crop&dpr=1"
              alt="people-profile"
            />
            <img
              src="https://ph-avatars.imgix.net/5365443/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=28&h=28&fit=crop&dpr=1"
              alt="people-profile"
            />
            <img
              src="https://ph-avatars.imgix.net/5365443/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=28&h=28&fit=crop&dpr=1"
              alt="people-profile"
            />
            <p>+ 1,581 others answered</p>
          </div>
          <div className="more__product__sections">
            <p>More questions</p>
          </div>
        </div>
      </div>
      <SingleProduct />
    </Fragment>
  );
};

export default SearchProduct;
