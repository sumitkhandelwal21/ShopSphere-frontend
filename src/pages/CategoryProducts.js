import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryProducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      if (data?.success) {
        setProducts(data?.products);
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container-fluid my-3 p-3">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h2 className="text-center">{category?.name}</h2>
            {products?.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                <h4>No Products Found!</h4>
              </div>
            ) : (
              <h5 className="text-center text-success">
                Products found: {products?.length}
              </h5>
            )}
            <div className="d-flex flex-wrap justify-content-center mt-4">
              {products?.map((prod) => (
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
          <div className="col-md-1"></div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
