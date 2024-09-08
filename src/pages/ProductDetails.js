import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.similarProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="row mb-5">
          <h1 className="text-center">Product Details</h1>
          <div className="col-md-2"></div>
          <div className="col-md-3 text-center bg-primary-subtle p-4">
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
                alt={product?.name}
                style={{
                  height: "12rem",
                  border: "none",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
          <div
            className="col-md-5 p-4 bg-primary-subtle"
            style={{ backgroundColor: "#e3eaff" }}
          >
            <h5>Name: {product?.name}</h5>
            <h5>Description: {product?.description}</h5>
            <h5>Category: {product?.category?.name}</h5>
            <h5>Price: ${product?.price}</h5>
            <div className="mt-3 text-center">
              <button
                className="btn bg-danger-subtle fw-bold"
                style={{ fontSize: "18px" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <hr />
        <div className="row mt-4">
          <h1 className="text-center">Similar Products</h1>
          <div className="d-flex flex-wrap px-4 py-3 justify-content-center">
            {relatedProducts?.length < 1 && <h5>No similar products found</h5>}
            {relatedProducts?.map((prod) => (
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

export default ProductDetails;
