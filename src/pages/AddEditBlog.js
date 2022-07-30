import React, { useState } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//p7quwbvy
const initailState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

//Categories
const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const AddEditBlog = () => {
  // navigation
  const navigate = useNavigate();

  // state
  const [formValue, setFormValue] = useState(initailState);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState(null);
  const { title, description, category, imageUrl } = formValue;

  //methods
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = async (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pf9d0d7m");
    axios
      .post("https://api.cloudinary.com/v1_1/mservices/image/upload", formData)
      .then((res) => {
        console.log("res", res);
        setFormValue({ ...formValue, imageUrl: res.data.url });
        toast.success("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Image Upload Failed");
      });
  };

  const onCategoryChange = (e) => {
    setCategoryErrorMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrorMsg("Please select a category");
    }
    if (title && description && imageUrl && category) {
      const currentDate = getDate();
      const updatedBlogData = { ...formValue, date: currentDate };
      const response = await axios.post(
        "http://localhost:5000/blogs",
        updatedBlogData
      );
      if (response.status === 201) {
        toast.success("Blog Added Successfully");
      } else {
        toast.error("Blog Add Failed");
      }
      setFormValue(initailState);
      navigate("/");
    }
  };

  return (
    <MDBValidation
      className="row g-3 justify-content-center"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">Add Blog</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          label="Title"
          validation="please provide a title"
          required
          invalid
        />
        <br />
        <MDBInput
          value={description || ""}
          name="description"
          type="text"
          onChange={onInputChange}
          required
          label="Description"
          validation="please provide a description"
          textarea
          rows={4}
          invalid
        />
        <br />
        <MDBInput
          type="file"
          onChange={(e) => onUploadImage(e.target.files[0])}
          // validation="please provide a title"
          required
          invalid
        />
        <br />
        <select
          className="categoryDropdown"
          value={category}
          onChange={onCategoryChange}
        >
          <option>Please select category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrorMsg && (
          <div className="categoryErrorMsg">{categoryErrorMsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type="submit" color="primary" style={{ marginRight: "15px" }}>
          Add
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "15px" }}
          onClick={() => navigate("/")}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditBlog;
