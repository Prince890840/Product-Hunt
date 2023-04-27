import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

// styles
import "../styles/hunt/_filtermodal.scss";
import {
  Modal,
  ModalContent,
  ModalShadow,
} from "../components/Modal/FilterModalStyle";

// react-router-dom
import { useNavigate } from "react-router-dom";

// prop-types
import PropTypes from "prop-types";

// apollo-client
import { useQuery } from "@apollo/client";

// query
import { SEARCH_PRODUCT } from "../queries/SearchProduct";

// component
import ProductThumbnail from "../components/ProductThumbnail/ProductThumbnail";
import LoadingBar from "react-top-loading-bar";

const FilterModal = (props) => {
  const { isOpen, setIsOpen } = props;

  const ref = useRef(null);

  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  //  Jan to Dec -> returns the zero based index

  const navigateToProduct = (type) => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month;
    let day = currentDate.getDate() - 1;

    switch (type) {
      case "Yesterday":
        month = currentDate.getMonth() + 1;
        navigate(`/time-travel/${year}/${month}/${day}`);
        break;
      case "lastMonth":
        month = currentDate.getMonth();
        navigate(`/time-travel/${year}/${month}`);
        break;
      default:
        navigate(`/time-travel/${year}`);
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
            <svg
              width="32"
              height="32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="styles_arrowIcon__IF9oe"
            >
              <g
                opacity="0.8"
                stroke="#4B587C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"></path>
                <path d="M16.757 20.243 21 16l-4.243-4.243M11 16h10"></path>
              </g>
            </svg>
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
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="styles_rewindIcon__B0lm_"
                      >
                        <path
                          d="M7.4 4.4v3.255L4.58 9.282a.6.6 0 0 0 .3 1.118.533.533 0 0 0 .3-.082l3.12-1.8h.015l.03-.016.022-.022.023-.015.022-.023.015-.015c.015-.007.023-.022.03-.03l.015-.015.015-.03.015-.022.015-.023a.037.037 0 0 0 .015-.03l.015-.022c0-.008.008-.015.008-.03a.03.03 0 0 0 .007-.023l.015-.03a.03.03 0 0 1 .008-.022c0-.015 0-.023.007-.03v-.03c0-.015.008-.023.008-.03V4.4a.6.6 0 0 0-1.2 0ZM.56 2.322a.6.6 0 0 1 .652.135L2.285 3.53l.622-.623a7.2 7.2 0 1 1 0 10.185.6.6 0 0 1 .848-.847 6 6 0 1 0 0-8.49l-.623.622 1.08 1.08a.6.6 0 0 1-.427 1.02h-3a.6.6 0 0 1-.6-.6v-3a.615.615 0 0 1 .375-.555Z"
                          fill="#fff"
                        ></path>
                      </svg>
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
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="styles_rewindIcon__B0lm_"
                      >
                        <path
                          d="M7.4 4.4v3.255L4.58 9.282a.6.6 0 0 0 .3 1.118.533.533 0 0 0 .3-.082l3.12-1.8h.015l.03-.016.022-.022.023-.015.022-.023.015-.015c.015-.007.023-.022.03-.03l.015-.015.015-.03.015-.022.015-.023a.037.037 0 0 0 .015-.03l.015-.022c0-.008.008-.015.008-.03a.03.03 0 0 0 .007-.023l.015-.03a.03.03 0 0 1 .008-.022c0-.015 0-.023.007-.03v-.03c0-.015.008-.023.008-.03V4.4a.6.6 0 0 0-1.2 0ZM.56 2.322a.6.6 0 0 1 .652.135L2.285 3.53l.622-.623a7.2 7.2 0 1 1 0 10.185.6.6 0 0 1 .848-.847 6 6 0 1 0 0-8.49l-.623.622 1.08 1.08a.6.6 0 0 1-.427 1.02h-3a.6.6 0 0 1-.6-.6v-3a.615.615 0 0 1 .375-.555Z"
                          fill="#fff"
                        ></path>
                      </svg>
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
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="styles_rewindIcon__B0lm_"
                      >
                        <path
                          d="M7.4 4.4v3.255L4.58 9.282a.6.6 0 0 0 .3 1.118.533.533 0 0 0 .3-.082l3.12-1.8h.015l.03-.016.022-.022.023-.015.022-.023.015-.015c.015-.007.023-.022.03-.03l.015-.015.015-.03.015-.022.015-.023a.037.037 0 0 0 .015-.03l.015-.022c0-.008.008-.015.008-.03a.03.03 0 0 0 .007-.023l.015-.03a.03.03 0 0 1 .008-.022c0-.015 0-.023.007-.03v-.03c0-.015.008-.023.008-.03V4.4a.6.6 0 0 0-1.2 0ZM.56 2.322a.6.6 0 0 1 .652.135L2.285 3.53l.622-.623a7.2 7.2 0 1 1 0 10.185.6.6 0 0 1 .848-.847 6 6 0 1 0 0-8.49l-.623.622 1.08 1.08a.6.6 0 0 1-.427 1.02h-3a.6.6 0 0 1-.6-.6v-3a.615.615 0 0 1 .375-.555Z"
                          fill="#fff"
                        ></path>
                      </svg>
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
