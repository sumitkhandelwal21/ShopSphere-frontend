import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${data?.category?.name} is created`);
        getAllcategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

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
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllcategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${selected?.name} is updated to ${updatedName}.`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllcategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete category
  const handleDelete = async (cat) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${cat._id}`
      );
      if (data?.success) {
        toast.success(`${cat?.name} is deleted successfully.`);
        getAllcategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid my-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Manage Categories</h1>
            <div className="my-3 w-75 mx-auto">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                task="Create"
              />
            </div>
            <div className="w-75 mt-3 mx-auto">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cat, idx) => (
                    <>
                      <tr>
                        <th scope="row" id={cat._id}>
                          {idx + 1}
                        </th>
                        <td id={cat._id}>{cat.name}</td>
                        <td id={cat._id}>
                          <button
                            className="btn btn-success ms-2 text-center px-3"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(cat.name);
                              setSelected(cat);
                            }}
                          >
                            <TbEdit
                              color="white"
                              size={20}
                              style={{ marginRight: "4px" }}
                            />
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2 text-center px-3"
                            onClick={() => {
                              handleDelete(cat);
                            }}
                          >
                            <MdDeleteOutline
                              color="white"
                              size={20}
                              style={{ marginRight: "4px" }}
                            />
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
                task="Update"
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
