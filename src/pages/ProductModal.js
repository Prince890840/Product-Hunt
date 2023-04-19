import React from "react";
import ReactDOM from "react-dom";

// styles
import "../styles/hunt/_productmodal.scss";
import {
  Modal,
  ModalContent,
  ModalShadow,
} from "../components/Modal/ModalStyle";

// component
import ProductThumbnail from "../components/ProductThumbnail/ProductThumbnail";

// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";

const Comment = styled.div`
  white-space: pre-wrap;
  text-align: start;
  position: relative;
  padding-left: 20px;
  margin-top: 10px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    border-width: 2px;
    height: 98%;
    border: 2px solid #d9e1ec;
    border-radius: 5px;
  }
`;

const ProductModal = (props) => {
  const { isOpen, setIsOpen, product } = props;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrow: true,
  };

  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={() => setIsOpen(!isOpen)} />
      <Modal>
        <ModalContent>
          <button className="close-button" onClick={() => setIsOpen(!isOpen)}>
            X
          </button>
          <div className="modal__main_content">
            <div className="product__image">
              {product?.node?.thumbnail && (
                <ProductThumbnail
                  thumbnailUrl={product?.node?.thumbnail?.url}
                />
              )}
            </div>
            <div className="product-semi-content">
              <div className="product__details">
                <h1>{product?.node?.name}</h1>
                <p>{product?.node?.tagline}</p>
              </div>
              <div className="product__visit">
                <div className="dropdown">
                  <button className="dropbtn">
                    <span>Visit</span>
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.998 6.244a.99.99 0 0 1-.703-.292L1.048 1.705A1.003 1.003 0 0 1 1.05.293.996.996 0 0 1 2.462.29L6 3.83 9.538.29a1.003 1.003 0 0 1 1.412.003.997.997 0 0 1 .002 1.412L6.705 5.952a.992.992 0 0 1-.702.29z"
                        fill="#CCC8C7"
                      ></path>
                    </svg>
                  </button>
                  <div className="dropdown-content">
                    <a href="/">Link 1</a>
                    <a href="/">Link 2</a>
                    <a href="/">Link 3</a>
                  </div>
                </div>
                <button className="btn">
                  upvote
                  {product?.node?.votesCount ? product?.node?.votesCount : ""}
                </button>
              </div>
            </div>
            <div className="product-last-section">
              <p>{product.node.description}</p>
            </div>
          </div>
          <Slider {...settings}>
            {product.node.media.map((item, index) => (
              <div key={index}>
                <img
                  src={item.url}
                  style={{
                    width: "368px",
                    height: "220px",
                    paddingRight: "44px",
                  }}
                  alt={item.type}
                />
              </div>
            ))}
          </Slider>
          {product?.node?.comments?.nodes?.map((comment, index) => (
            <Comment key={index}>{comment?.body}</Comment>
          ))}
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("app-modal")
  );
};

export default ProductModal;
