import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

// styles
import "../../styles/hunt/_filtermodal.scss";
import {
  Modal,
  ModalContent,
  ModalShadow,
} from "../../components/Modal/FilterModalStyle";

// react-router-dom
import { useNavigate } from "react-router-dom";

// prop-types
import PropTypes from "prop-types";

// apollo-client
import { useQuery } from "@apollo/client";

// query
import { SEARCH_PRODUCT } from "../../queries/SearchProduct";

// component
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";
import LoadingBar from "react-top-loading-bar";

// utility and others
import {
  getCurrentYear,
  getPreviousDay,
  getPreviousMonth,
} from "../../utility/helper";
import Arrow from "../../components/SVG/Arrow";
import Time from "../../components/SVG/Time";

const FilterModal = (props) => {
  const { isOpen, setIsOpen } = props;

  const ref = useRef(null);

  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const navigateToProduct = (type) => {
    switch (type) {
      case "Yesterday":
        navigate(
          `/time-travel/${getCurrentYear()}/${getPreviousMonth()}/${getPreviousDay().getDate()}`
        );
        break;
      case "lastMonth":
        navigate(`/time-travel/${getCurrentYear()}/${getPreviousMonth()}`);
        break;
      default:
        navigate(`/time-travel/${getCurrentYear()}`);
        break;
    }

    setIsOpen(!isOpen);
  };

  const getSearchProduct = (event) => {
    setSearchValue(event.target.value);
  };

  const { data } = useQuery(SEARCH_PRODUCT, {
    variables: { slug: searchValue.toLowerCase() },
  });

  return ReactDOM.createPortal(
    <>
      <LoadingBar color="#FF6154" ref={ref} shadow={true} />
      <ModalShadow onClick={() => setIsOpen(!isOpen)} />
      <div className="outer-close-btn" onClick={() => setIsOpen(!isOpen)}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4.586l4.24-4.24a1 1 0 1 1 1.416 1.413L7.413 6l4.24 4.24a1 1 0 1 1-1.413 1.416L6 7.413l-4.24 4.24A1 1 0 1 1 .344 10.24L4.587 6 .347 1.76A1 1 0 1 1 1.757.343L6 4.587z"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      <Modal>
        <ModalContent>
          <button className="close-button" onClick={() => setIsOpen(!isOpen)}>
            <Arrow />
          </button>
          <div className="search__product__section">
            <form>
              <input
                title="Search"
                type="text"
                autoComplete="off"
                value={searchValue}
                placeholder="Search for products, launches, or people..."
                className="search__box"
                onChange={getSearchProduct}
              ></input>
            </form>
          </div>
          {!data?.post ? (
            <>
              <div className="trending-topics">
                <h5 className="trending__topics_title">Trending</h5>
                <div className="topics__link">
                  <div className="item">Chatgpt</div>
                  <div className="item spacing">Chat</div>
                  <div className="item spacing">Notion</div>
                  <div className="item spacing">Gpt</div>
                  <div className="item spacing">Prompt</div>
                </div>
              </div>
              <div className="time-filter-section">
                <div
                  className="filter"
                  onClick={() => {
                    navigateToProduct("Yesterday");
                    ref.current.complete();
                  }}
                >
                  <div className="heading__section">
                    <div className="filter__image_section">
                      <Time />
                    </div>
                    <div className="heading__content">
                      <h3>Yesterday</h3>
                      <p>Top products from yesterday</p>
                    </div>
                  </div>
                  <div className="time__travel_button">
                    <p>Time travel</p>
                  </div>
                </div>
                <div
                  className="filter"
                  onClick={() => navigateToProduct("lastMonth")}
                >
                  <div className="heading__section">
                    <div className="filter__image_section month__filter">
                      <Time />
                    </div>
                    <div className="heading__content">
                      <h3>Last Month</h3>
                      <p>Top products from last month</p>
                    </div>
                  </div>
                  <div className="time__travel_button">
                    <p>Time travel</p>
                  </div>
                </div>
                <div
                  className="filter"
                  onClick={() => navigateToProduct("Year")}
                >
                  <div className="heading__section">
                    <div className="filter__image_section year__filter">
                      <Time />
                    </div>
                    <div className="heading__content">
                      <h3>2023</h3>
                      <p>Top products from this year</p>
                    </div>
                  </div>
                  <div className="time__travel_button">
                    <p>Time travel</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="time-filter-section">
                <div className="filter">
                  <div className="heading__section">
                    <div className="search__image-section">
                      {data?.post?.thumbnail && (
                        <ProductThumbnail
                          thumbnailUrl={data?.post?.thumbnail?.url}
                        />
                      )}
                    </div>
                    <div className="heading__content">
                      <h3>{data?.post?.name}</h3>
                      <p>{data?.post?.tagline}</p>
                    </div>
                  </div>
                  <div className="time__travel_button">
                    <p>Product</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("app-modal")
  );
};

FilterModal.propTypes = {
  isOpen: PropTypes.oneOf([true, false]),
  setIsOpen: PropTypes.func,
};

export default FilterModal;
