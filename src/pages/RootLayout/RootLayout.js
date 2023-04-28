import React, { Fragment } from "react";

// react-router-dom
import { Outlet, useLocation } from "react-router-dom";

// components
import Header from "../../components/Header/Header";

// styles
import "../../styles/hunt/_rootlayout.scss";

export default function RootLayout() {
  const path = useLocation();
  return (
    <Fragment>
      <Header />
      {path.pathname === "/collections" && (
        <img
          className="collection__img"
          src={require("../../assets/images/pattern_rainbow.jpg")}
          alt="rainbow-img"
        />
      )}

      <main className="wrapper">
        {/* This defines where the content of the child routes should be rendered. */}
        <Outlet />
      </main>
    </Fragment>
  );
}
