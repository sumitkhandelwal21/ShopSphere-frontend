import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get all categories
  const getAllcategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, cid) => {
    let all = [...checked];
    if (value) {
      all.push(cid);
    } else {
      all = all.filter((c) => c !== cid);
    }
    setChecked(all);
  };

  // get Filtered products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      {/* banner image */}
      <img
        src="/images/banner.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        height={"300px"}
      />
      {/* banner image */}
      <div className="container-fluid my-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex flex-row align-items-center">
              <h4>APPLY FILTERS</h4>
              <div className="d-flex align-items-center ms-auto">
                <Link
                  to="#"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  CLEAR ALL
                </Link>
              </div>
            </div>
            <div className="p-3" style={{ border: "1px solid #C0C0C0" }}>
              <h5>Categories</h5>
              <div className="d-flex flex-column mt-2">
                {categories?.map((cat) => (
                  <Checkbox
                    className="fs-6"
                    key={cat._id}
                    onChange={(e) => handleFilter(e.target.checked, cat._id)}
                  >
                    {cat.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            <hr />
            <div className="p-3" style={{ border: "1px solid #C0C0C0" }}>
              <h5>Price</h5>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                <div className="d-flex flex-column">
                  {Prices?.map((p) => (
                    <Radio key={p._id} value={p.array} className="fs-6">
                      {p.name}
                    </Radio>
                  ))}
                </div>
              </Radio.Group>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            {products?.length === 0 && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <h5>No Products Found!</h5>
              </div>
            )}
            <div className="d-flex flex-wrap justify-content-center">
              {products?.map((prod) => (
                <div
                  className="card m-2"
                  key={prod._id}
                  style={{ width: "16rem", height: "22rem" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prod._id}`}
                    className="card-img-top"
                    alt={prod.name}
                    style={{ height: "10rem" }}
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
                        onClick={() => {
                          setCart([...cart, prod]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, prod])
                          );
                          toast.success("Item added to cart");
                        }}
                        style={{ fontSize: "12px" }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-2 text-center">
              {!checked.length &&
                !radio.length &&
                products &&
                products.length < total && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading..." : "Load more"}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
