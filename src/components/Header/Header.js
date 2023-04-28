import React, { useRef, useState } from "react";

import "./_header.scss";

// react-router-dom
import { Link } from "react-router-dom";

// components
import FilterModal from "../../pages/HeaderSearchFilterSection/FilterModal";

// react-top-loading-bar
import LoadingBar from "react-top-loading-bar";
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../queries/user";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const ref = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const { loading } = useQuery(USER_PROFILE, {
    variables: {
      first: 2,
    },
    onCompleted: (data) => {
      setUser(data);
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      {isOpen && <FilterModal setIsOpen={setIsOpen} isOpen={isOpen} />}
      <LoadingBar color="#FF6154" ref={ref} shadow={true} />
      <header>
        <nav className="nav__container">
          <div className="navigation__section">
            <Link
              aria-label="Product Hunt Logo"
              to="/"
              onClick={() => ref.current.complete()}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20"
                    fill="#FF6154"
                  ></path>
                  <path
                    d="M22.667 20H17v-6h5.667a3 3 0 0 1 0 6m0-10H13v20h4v-6h5.667a7 7 0 1 0 0-14"
                    fill="#FFF"
                  ></path>
                </g>
              </svg>
            </Link>

            <div className="search__product__section" onClick={openModal}>
              <form>
                <input
                  title="Search"
                  type="search"
                  autoComplete="off"
                  placeholder="Search (ctrl + k)"
                  className="search__box"
                ></input>
              </form>
            </div>
            <div className="navigation__menu">
              <ul className="nav__items">
                <li className="item">
                  <Link className="nav__link" to="/">
                    Products
                  </Link>
                </li>
                <li className="item">
                  <div className="dropdown">
                    <button className="header-dropdown">Community</button>
                    <div className="dropdown-content">
                      <Link to="/collections">
                        <div className="inner-menu">
                          <img
                            src="https://ph-static.imgix.net/nav-collections.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=32&h=32&fit=max&dpr=1"
                            alt="collection"
                          />
                          <div className="content-section">
                            <h3>Collection</h3>
                            <p>Products curated by community</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="item">
                  <Link className="nav__link" to="/">
                    Marketplace
                  </Link>
                </li>
                <li className="item">
                  <Link className="nav__link" to="/">
                    Jobs
                  </Link>
                </li>
                <li className="item">
                  <Link className="nav__link" to="/">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile__section">
            <ul>
              <li className="profile__item">
                <p className="lunch__product">Submit</p>
              </li>
              <li className="profile__item notification">
                <svg width="16" height="18" xmlns="http://www.w3.org/2000/svg">
                  <title>Bell</title>
                  <g fill="none" fillRule="evenodd">
                    <path d="M-2-3h20v24H-2z"></path>
                    <path
                      d="M2.39 7.125A5.617 5.617 0 0 1 8.044 1.5c3.093.023 5.567 2.594 5.567 5.696v.554c0 2.798.585 4.422 1.1 5.31a.625.625 0 0 1-.537.94H1.827a.625.625 0 0 1-.538-.94c.516-.888 1.102-2.512 1.102-5.31v-.625ZM5.5 14v.625a2.5 2.5 0 1 0 5 0V14"
                      stroke="#005EF6"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <p>0</p>
              </li>
              <li className="profile__item">
                <img
                  className="user__profile"
                  src={user?.viewer?.user?.profileImage}
                  alt="profile"
                  height={40}
                  width={40}
                ></img>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
