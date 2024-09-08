import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search Results - ShopSphere"}>
      <div className="container my-3">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found: ${values?.results?.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((prod) => (
              <div
                className="card m-2"
                key={prod._id}
                style={{ width: "16rem", height: "20rem" }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prod._id}`}
                  className="card-img-top"
                  alt={prod.name}
                  style={{ height: "9rem" }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title fw-semibold">{prod.name}</h5>
                  <p className="card-text">
                    {prod.description.substring(0, 26)}...
                  </p>
                  <p className="card-text">
                    Price: <span className="fw-bold">${prod.price}</span>
                  </p>
                  <div className="mt-auto d-flex flex-row justify-content-center">
                    <button
                      className="btn bg-primary-subtle ms-2 fw-semibold"
                      style={{ fontSize: "12px" }}
                      onClick={() => navigate(`/product/${prod.slug}`)}
                    >
                      More Details
                    </button>

                    <button
                      className="btn bg-danger-subtle ms-2 fw-semibold"
                      style={{ fontSize: "12px" }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
