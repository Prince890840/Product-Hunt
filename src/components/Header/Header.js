import React, { useRef, useState } from "react";

import "../../styles/layouts/_header.scss";

// react-router-dom
import { Link } from "react-router-dom";

// components
import FilterModal from "../../pages/HeaderSearchFilterSection/FilterModal";

// react-top-loading-bar
import LoadingBar from "react-top-loading-bar";

// apollo-client
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../queries/user";

// others
import Logo from "../SVG/Logo";
import Bell from "../SVG/Bell";

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
              <Logo />
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
                <Bell />
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
