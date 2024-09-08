import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="flex-grow-1">
        <Toaster />
        {children}
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

Layout.defaultProps = {
  title: "ShopSphere - Shop Now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Sumit Khandelwal",
};

export default Layout;
