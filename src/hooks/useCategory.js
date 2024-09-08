import { useState, useEffect } from "react";
import axios from "axios";

import React from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    getAllcategories();
  }, []);

  return categories;
};

export default useCategory;
