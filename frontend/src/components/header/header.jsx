import React, { useState } from "react";
import SocialMediaIcons from "../socialmediaicons/socialmediaicons";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router";
import { sign_out } from "../../redux/auth/auth.action";
import { authStateSelector } from "../../redux/auth/auth.selector";
import "./header.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
function Header({ history, authState, dispatch }) {
  const [searchInputValue, updateSearchInputValue] = useState("");
  const [hideandshowinpustsearch, updatehideandshowinpustsearch] = useState(
    false
  );
  const search = ({ history }) => {
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
        <div
          className="navbar-brand"
          onClick={() => {
            history.push("/");
          }}
        >
          <p>home</p>
        </div>
        <div className="navbar">
          <input
            type="text"
            className="header-search"
            style={{
              visibility: hideandshowinpustsearch ? "visible" : "hidden",
            }}
            value={searchInputValue}
            onChange={searchInputChange}
          />
          <SearchIcon className="search-icon" onClick={search} />

          {!authState ? (
            <div
              className="navbar-item"
              onClick={() => {
                history.push("/auth");
              }}
            >
              <p>Sign In</p>
            </div>
          ) : (
            <div
              className="navbar-item"
              onClick={() => {
                dispatch(sign_out());
              }}
            >
              <p>Sign out</p>
            </div>
          )}
          {authState && (
            <div
              className="navbar-item"
              onClick={() => {
                history.push("/createpost");
              }}
            >
              <p>create post</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  authState: authStateSelector,
});
export default connect(mapStateToProps)(withRouter(Header));
