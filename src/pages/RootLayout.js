import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function RootLayout() {
  return (
    <Fragment>
      <Header />
      <main className="wrapper">
        {/* This defines where the content of the child routes should be rendered. */}
        <Outlet />
      </main>
    </Fragment>
  );
}
