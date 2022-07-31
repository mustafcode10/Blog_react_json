import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Blogs from "./../components/Blogs";
import Search from "./../components/Search";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const loadBlogsData = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("something went wrong");
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + "...";
    }
    return str;
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:5000/blogs/${id}`)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Blog deleted successfully");
            loadBlogsData();
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };
  const onInputChange = (e) => {
    if(!e.target.value){
      loadBlogsData();
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
    if(response.status === 200){
      setData(response.data)
    } else {
      toast.error("Something went wrong")
    }
  };

  useEffect(() => {
    loadBlogsData();
  }, []);
  return (
    <>
      <Search
        searchValue={searchValue}
        handleSearch={handleSearch}
        onInputChange={onInputChange}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Blogs Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data &&
                data.map((item, index) => (
                  <Blogs
                    key={index}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Home;
