import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [allProducts, setAllProducts] = useState();

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) {
        setAllProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid my-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {allProducts?.map((prod, index) => (
                <Link
                  to={`/dashboard/admin/product/${prod.slug}`}
                  key={prod._id}
                  className="product-link"
                >
                  <div
                    className="card m-2"
                    style={{ width: "16rem", height: "16rem" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prod._id}`}
                      className="card-img-top"
                      alt={prod.name}
                      style={{ height: "10rem" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{prod.name}</h5>
                      {prod.description.substring(0, 26)}...
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
