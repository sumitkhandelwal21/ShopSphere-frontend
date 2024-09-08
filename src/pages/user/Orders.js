import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid my-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order, index) => {
              return (
                <div className="border shadow mt-3">
                  <table className="table table-borderless">
                    <thead
                      style={{
                        borderBottom: "1px solid silver",
                      }}
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{order.status}</td>
                        <td>{order.buyer.name}</td>
                        <td>{moment(order.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order.products.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container">
                    {order?.products?.map((p) => (
                      <div className="row mb-3 p-3 card bg-light flex-row">
                        <div className="col-md-5">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height={"170px"}
                            width={"100px"}
                          />
                        </div>
                        <div className="col-md-7">
                          <p className="fw-bold">{p.name}</p>
                          <p>
                            {p.description.substring(0, 30)}
                            {p.description.length > 30 ? "......" : ""}
                          </p>
                          <p>Price: ${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
