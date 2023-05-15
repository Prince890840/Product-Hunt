import React from "react";
import ReactDOM from "react-dom";

// query and apollo-client
import { GET_SINGLE_POST } from "../../queries/FetchSingleProduct";
import { useQuery } from "@apollo/client";

// prop-types
import PropTypes from "prop-types";

// component
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";
import styled from "styled-components";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, HashNavigation } from "swiper";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Modal,
  ModalContent,
  ModalShadow,
} from "../../components/Modal/ModalStyle";

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
  const { postId, slug, onCloseModal } = props;

  const { data } = useQuery(GET_SINGLE_POST, {
    variables: { postId: postId, slug: slug, commentsFirst2: 5 },
  });

  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={onCloseModal} />
      <div className="overlaw">
        <div className="outer-close-btn" onClick={onCloseModal}>
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
                <p>{data?.post?.description}</p>
              </div>
            </div>
            <Swiper
              spaceBetween={8}
              slidesPerView={3}
              hashNavigation={{
                watchState: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation, HashNavigation]}
              className="mySwiper"
            >
              {data?.post?.media &&
                data?.post?.media?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img src={item.url} alt={item.type} />
                  </SwiperSlide>
                ))}
            </Swiper>
            {data?.post?.comments &&
              data?.post?.comments?.edges?.map((comment, index) => (
                <Comment key={index}>{comment?.node?.body}</Comment>
              ))}
          </ModalContent>
        </Modal>
      </div>
    </>,
    document.getElementById("app-modal")
  );
};

ProductModal.propTypes = {
  onCloseModal: PropTypes.func,
};

export default ProductModal;
