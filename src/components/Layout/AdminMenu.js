import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <NavLink
            to="/dashboard/admin"
            style={{ textDecoration: "none", border: "none" }}
          >
            <h4 className="text-primary">Admin Panel</h4>
          </NavLink>
          <NavLink
            to="/dashboard/admin/manage-categories"
            className="list-group-item list-group-item-action"
          >
            Manage Categories
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products List
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Manage Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
