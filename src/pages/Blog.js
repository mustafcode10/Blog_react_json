import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBContainer,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import Badge from "./../components/Badge";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Blog = () => {
  //states
  const [blog, setBlog] = useState();
  // params
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog(id);
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);

    if (response.status === 200) {
      setBlog(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const styleInfo = {
    display: "inline",
    marginLeft: "10px",
    float: "right",
    marginTop: "7px",
  };

  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
      <Link to="/">
        <strong style={{ float: "left", color: "black" }} className="mt-3">
          Go Back
        </strong>
      </Link>
      <MDBTypography
        tag="h2"
        className="text-muted mt-2"
        style={{ display: "inline-block" }}
      >
        {blog && blog.title}
      </MDBTypography>
      <img
        src={blog && blog.imageUrl}
        className="img-fluit rounded"
        alt={blog && blog.title}
        style={{ width: "100%", maxHeight: "600px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px", backgroundColor: "#f6f6f6" }}>
          <MDBIcon
            style={{ float: "left" }}
            className="mt-3"
            far
            icon="calendar-alt"
            size="lg"
          />
            <strong
              style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}
            >
              {blog && blog.date}
            </strong>
          
          <Badge styleInfo={styleInfo} >{blog && blog.category}</Badge>
        </div>
        <MDBTypography className="lead md-0">
          {blog && blog.description}
        </MDBTypography>
      </div>
    </MDBContainer>
  );
};

export default Blog;
