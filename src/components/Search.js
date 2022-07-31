import React from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const Search = ({handleSearch, searchValue, onInputChange}) => {
  return (
    <div className="searchForm">
        <form className="d-flex" onSubmit={handleSearch}>
            <input type="search" className="form-control" value={searchValue} onChange={onInputChange} placeholder="Search Blog ..." />
            <MDBBtn type="submit" >Search</MDBBtn>
        </form>
    </div>
  )
};

export default Search;
