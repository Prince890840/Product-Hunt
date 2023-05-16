import React, { useRef } from "react";
// prop-types
import PropTypes from "prop-types";

// react-router-dom
import { createPortal } from "react-dom";

// google-oauth
import { GoogleLogin } from "@react-oauth/google";

// styles
import {
  Modal,
  ModalContent,
  ModalShadow,
} from "../../components/Modal/FilterModalStyle";

// lodingbar
import LoadingBar from "react-top-loading-bar";

const AuthenticationModal = (props) => {
  const { userCredentialModal, setUserCredentialModal } = props;

  const ref = useRef(null);

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return createPortal(
    <>
      <LoadingBar color="#FF6154" ref={ref} shadow={true} />
      <ModalShadow
        onClick={() => setUserCredentialModal(!userCredentialModal)}
      />
      <div
        className="outer-close-btn"
        onClick={() => setUserCredentialModal(!userCredentialModal)}
      >
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
          <div className="auth_modal_section">
            <div className="modal_inner-section">
              <img
                src={require("../../assets/images/kitty.jpg")}
                alt="kitty-icon"
              />
              <h1>Sign up on Product Hunt</h1>
              <p className="community_content">
                Join our community of friendly folks discovering and sharing the
                latest products in tech.
              </p>
              <div className="google_oauth_btn">
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                />
              </div>
              <div className="social_media_icons">
                <button className="social_icon_button">
                  <svg
                    viewBox="0 0 16 13"
                    xmlns="http://www.w3.org/2000/svg"
                    height="13"
                  >
                    <path
                      fill=" #00aced"
                      d="M15.999 1.537a6.57 6.57 0 0 1-1.885.517A3.296 3.296 0 0 0 15.557.238a6.576 6.576 0 0 1-2.084.796A3.282 3.282 0 0 0 7.88 4.027 9.32 9.32 0 0 1 1.112.599 3.28 3.28 0 0 0 2.13 4.98a3.27 3.27 0 0 1-1.487-.41v.042a3.284 3.284 0 0 0 2.633 3.217 3.29 3.29 0 0 1-1.483.056 3.286 3.286 0 0 0 3.067 2.28A6.587 6.587 0 0 1 0 11.523a9.29 9.29 0 0 0 5.032 1.475c6.038 0 9.34-5.001 9.34-9.338 0-.143-.004-.284-.01-.425a6.673 6.673 0 0 0 1.637-1.698H16z"
                    ></path>
                  </svg>
                </button>
                <button className="social_icon_button">
                  <svg
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                  >
                    <g fill="none">
                      <circle fill="#1877F2" cx="8" cy="8" r="8"></circle>
                      <path
                        d="M11.114 10.312 11.47 8H9.25V6.5c0-.633.31-1.25 1.304-1.25h1.008V3.281a12.28 12.28 0 0 0-1.79-.156c-1.828 0-3.022 1.107-3.022 3.113V8H4.719v2.312h2.03v5.59c.83.13 1.673.13 2.501 0v-5.59h1.864z"
                        fill="#FFF"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button className="social_icon_button">
                  <svg
                    viewBox="0 0 14 16"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                  >
                    <path d="M13.608 11.905c-.362.8-.534 1.158-1 1.865-.648.987-1.563 2.217-2.696 2.227-1.007.01-1.266-.655-2.633-.647-1.367.008-1.652.66-2.659.65-1.133-.01-2-1.12-2.648-2.109-1.815-2.762-2.004-6.002-.885-7.725.795-1.225 2.05-1.941 3.23-1.941 1.2 0 1.956.658 2.949.658.963 0 1.55-.659 2.94-.659 1.049 0 2.161.571 2.954 1.559-2.597 1.423-2.175 5.13.448 6.122zm-4.31-9.409c.505-.648.887-1.561.748-2.496-.824.056-1.788.58-2.35 1.264-.511.62-.933 1.54-.77 2.435.9.028 1.831-.51 2.372-1.203z"></path>
                  </svg>
                </button>
                <button className="social_icon_button">
                  <svg
                    width="25"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    size="16"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.538 2.838A1.838 1.838 0 0 1 3.376 1h18.322a1.837 1.837 0 0 1 1.84 1.838V21.16A1.84 1.84 0 0 1 21.7 23H3.375a1.839 1.839 0 0 1-1.838-1.839V2.838Zm8.709 6.55h2.979v1.496c.43-.86 1.53-1.634 3.182-1.634 3.17 0 3.92 1.713 3.92 4.856v5.822h-3.206v-5.106c0-1.79-.43-2.8-1.522-2.8-1.515 0-2.146 1.089-2.146 2.8v5.106h-3.208V9.388Zm-5.5 10.403h3.207V9.25H4.746v10.541ZM8.412 5.812a2.063 2.063 0 1 1-4.125.09 2.063 2.063 0 0 1 4.125-.09Z"
                      fill="#4B587C"
                    ></path>
                  </svg>
                </button>
              </div>
              <p className="content-section">
                We'll never post to any of your accounts without your
                permission.
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("app-modal")
  );
};

AuthenticationModal.propTypes = {
  userCredentialModal: PropTypes.oneOf([true, false]),
  setUserCredentialModal: PropTypes.func,
};

export default AuthenticationModal;
