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
import styled from "styled-components";

// slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// prop-types
import PropTypes from "prop-types";
import { GET_SINGLE_POST } from "../queries/FetchSingleProduct";
import { useQuery } from "@apollo/client";

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
  const { isOpen, setIsOpen, postId, slug } = props;

  const { data } = useQuery(GET_SINGLE_POST, {
    variables: { postId: postId, slug: slug, commentsFirst2: 5 },
  });

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
              {data?.post?.thumbnail && (
                <ProductThumbnail thumbnailUrl={data?.post?.thumbnail?.url} />
              )}
            </div>
            <div className="product-semi-content">
              <div className="product__details">
                <h1>{data?.post?.name}</h1>
                <p>{data?.post?.tagline}</p>
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
                  {data?.post?.votesCount ? data?.post?.votesCount : ""}
                </button>
              </div>
            </div>
            <div className="product-last-section">
              <p>{data?.post.description}</p>
            </div>
          </div>
          <Slider {...settings}>
            {data?.post?.media &&
              data?.post?.media?.map((item, index) => (
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
          {data?.post?.comments &&
            data?.post?.comments?.edges?.map((comment, index) => (
              <Comment key={index}>{comment?.node?.body}</Comment>
            ))}
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("app-modal")
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.oneOf([true, false]),
  setIsOpen: PropTypes.func,
  product: PropTypes.object.isRequired
};

export default ProductModal;
