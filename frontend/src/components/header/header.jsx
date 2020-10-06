import React, { useState } from "react";
import SocialMediaIcons from "../socialmediaicons/socialmediaicons";
import SearchIcon from "@material-ui/icons/Search";
import "./header.scss";
function Header() {
  const [searchInputValue, updateSearchInputValue] = useState("");
  const [hideandshowinpustsearch, updatehideandshowinpustsearch] = useState(
    false
  );
  const search = () => {
    if (!searchInputValue) {
      updatehideandshowinpustsearch((preval) => !preval);
    }
  };
  const searchInputChange = (e) => {
    const { value } = e.target;
    updateSearchInputValue(value);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <div className="navbar-item">
            <p>home</p>
          </div>
          <div className="navbar-item">
            <p>about</p>
          </div>
          <div className="navbar-item">
            <p>archevs</p>
          </div>
          <div className="navbar-item">
            <p>contact me </p>
          </div>
        </div>
        <SocialMediaIcons />
        <input
          type="text"
          className="header-search"
          style={{ display: hideandshowinpustsearch ? "block" : "none" }}
          value={searchInputValue}
          onChange={searchInputChange}
        />
        <SearchIcon className="search-icon" onClick={search} />
      </div>
      
    </div>
  );
}

export default Header;
