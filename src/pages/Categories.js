import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container-fluid my-3 p-3 mt-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="btn btn-outline-dark mx-5 my-4 py-4 px-5 fw-bold fs-5 d-flex justify-content-center align-items-center"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
