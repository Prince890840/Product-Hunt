import React, { Fragment } from "react";

const RightSidebar = () => {
  return (
    <Fragment>
      <div className="review__section">
        <h5>leave a review</h5>
        <div className="review__content">
          <div className="review__header">
            <h4>Linksaber</h4>
            <p>Read later links to your email, weekly.</p>
          </div>
          <div className="review__product__image">
            <img
              src="https://ph-files.imgix.net/0df35b84-2d48-4eea-8a06-f4681fc64d1b.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=40&h=40&fit=crop&dpr=1"
              alt="product-icon"
            />
          </div>
        </div>
        <div className="star__section">
          <label
            data-test="star-1"
            className="styles_star__4FDgy styles_bigStar__DxHkP"
          >
            <input hidden type="radio" value="1" />
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              xmlns="http://www.w3.org/2000/svg"
              data-test="star-1-not-filled"
              className="spacing"
            >
              <path
                d="m12 0 3.709 7.514L24 8.718l-6 5.848 1.416 8.26-7.416-3.9-7.416 3.9L6 14.566 0 8.718l8.291-1.204z"
                fill="rgba(33,41,60,0.2)"
              ></path>
            </svg>
          </label>
          <label
            data-test="star-1"
            className="styles_star__4FDgy styles_bigStar__DxHkP"
          >
            <input hidden type="radio" value="2" />
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              xmlns="http://www.w3.org/2000/svg"
              data-test="star-1-not-filled"
              className="spacing"
            >
              <path
                d="m12 0 3.709 7.514L24 8.718l-6 5.848 1.416 8.26-7.416-3.9-7.416 3.9L6 14.566 0 8.718l8.291-1.204z"
                fill="rgba(33,41,60,0.2)"
              ></path>
            </svg>
          </label>
          <label
            data-test="star-1"
            className="styles_star__4FDgy styles_bigStar__DxHkP"
          >
            <input hidden type="radio" value="3" />
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              xmlns="http://www.w3.org/2000/svg"
              data-test="star-1-not-filled"
              className="spacing"
            >
              <path
                d="m12 0 3.709 7.514L24 8.718l-6 5.848 1.416 8.26-7.416-3.9-7.416 3.9L6 14.566 0 8.718l8.291-1.204z"
                fill="rgba(33,41,60,0.2)"
              ></path>
            </svg>
          </label>
          <label
            data-test="star-1"
            className="styles_star__4FDgy styles_bigStar__DxHkP"
          >
            <input hidden type="radio" value="4" />
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              xmlns="http://www.w3.org/2000/svg"
              data-test="star-1-not-filled"
              className="spacing"
            >
              <path
                d="m12 0 3.709 7.514L24 8.718l-6 5.848 1.416 8.26-7.416-3.9-7.416 3.9L6 14.566 0 8.718l8.291-1.204z"
                fill="rgba(33,41,60,0.2)"
              ></path>
            </svg>
          </label>
          <label
            data-test="star-1"
            className="styles_star__4FDgy styles_bigStar__DxHkP"
          >
            <input hidden type="radio" value="5" />
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              xmlns="http://www.w3.org/2000/svg"
              data-test="star-1-not-filled"
              className="spacing"
            >
              <path
                d="m12 0 3.709 7.514L24 8.718l-6 5.848 1.416 8.26-7.416-3.9-7.416 3.9L6 14.566 0 8.718l8.291-1.204z"
                fill="rgba(33,41,60,0.2)"
              ></path>
            </svg>
          </label>
        </div>
        <div className="review__pagination">
          <button>← Prev</button>
          <button>Don't show again</button>
          <button>Next →</button>
        </div>
      </div>
    </Fragment>
  );
};

export default RightSidebar;
