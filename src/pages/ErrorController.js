import React, { Fragment } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// style
import "../styles/hunt/_errorcontroller.scss";

const ErrorController = () => {
  return (
    <Fragment>
      <div className="section">
        <h1 className="error">404</h1>
        <div className="page">
          Ooops!!! The page you are looking for is not found
        </div>
        <Link className="back-home" to="/">
          Back to home
        </Link>
      </div>
    </Fragment>
  );
};

export default ErrorController;
