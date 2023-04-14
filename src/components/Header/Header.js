import React from "react";
import "./_header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="nav__container">
        <div className="navigation__section">
          <a aria-label="Product Hunt Logo" href="/">
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
          </a>

          <div className="search__product__section">
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
                <Link className="nav__link" to="/">
                  Community
                </Link>
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
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                alt="profile"
                height={40}
                width={40}
              ></img>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
