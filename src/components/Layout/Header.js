import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout Successfully!");
    }, 300);
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <img
                src="/images/favicon.ico"
                className="banner-img"
                alt="bannerimage"
                width={"22px"}
                height={"22px"}
                style={{
                  marginRight: "8px",
                }}
              />
              ShopSphere
            </Link>
            <SearchInput />
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${cat.slug}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li
                className="nav-item position-relative"
                style={{ marginRight: cart?.length > 99 ? "30px" : "20px" }}
              >
                <NavLink to="/cart" className="nav-link">
                  Cart
                  <span
                    class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      marginLeft: cart?.length > 99 ? "15px" : "8px",
                      top: "12px",
                    }}
                  >
                    {cart?.length > 99 ? "99+" : cart?.length}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
