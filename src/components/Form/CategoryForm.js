import React from "react";
import { MdAdd } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

const CategoryForm = ({ handleSubmit, value, setValue, task }) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ margin: task === "Create" ? "30px 0px" : "50px 0px 20px 0px" }}
      >
        <div className="d-flex flex-row">
          <div className="flex-grow-1" style={{ marginRight: "20px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="d-flex flex-row justify-content-center align-items-center btn btn-primary ms-auto"
          >
            {task === "Create" ? (
              <MdAdd color="white" size={22} style={{ marginRight: "4px" }} />
            ) : (
              <MdOutlineSystemUpdateAlt
                color="white"
                size={18}
                style={{ marginRight: "6px" }}
              />
            )}
            {task}
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
