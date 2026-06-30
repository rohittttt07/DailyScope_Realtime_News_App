import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">

      <h1 className="display-1">404</h1>

      <h3>Page Not Found</h3>

      <p>The page you're looking for doesn't exist.</p>

      <Link className="btn btn-primary" to="/">
        Back Home
      </Link>

    </div>
  );
};

export default NotFound;
