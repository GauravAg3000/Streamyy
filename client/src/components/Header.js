import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div
      className="ui secondary pointing menu"
      style={{ padding: "0.3rem", fontSize: "1.1rem", marginBottom: "2rem" }}
    >
      <Link
        to="/"
        className="item"
        style={{ fontWeight: "bolder", fontFamily: "sans-serif" }}
      >
        Streamyy
        <i className="laptop icon" style={{ marginLeft: "7px" }}></i>
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
