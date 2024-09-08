import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p
        className="text-center"
        style={{ fontSize: "16px", fontWeight: "bolder" }}
      >
        <Link to="/about">About</Link>&nbsp;|&nbsp;
        <Link to="/contact">Contact</Link>&nbsp;|&nbsp;
        <Link to="/policy">Privacy Policy</Link>
      </p>
      <p className="text-center">All Rights Reserved &copy; ShopSphere</p>
    </div>
  );
};

export default Footer;
