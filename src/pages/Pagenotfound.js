import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout title={"Page not found"}>
      <div className="pnf">
        <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
          <span className="display-1 fw-bold">4</span>
          <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
          <span className="display-1 fw-bold">4</span>
        </h2>
        <h2 className="pnf-heading mb-2">Oops! You're lost.</h2>
        <p className="mb-5">The page you are looking for was not found.</p>
        <Link
          className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
          to="/"
          role="button"
        >
          Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
