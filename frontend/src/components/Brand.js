import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../static/images/cocktail-logo.png";

const Brand = () => {
  return (
    <>
      <div className="container-fluid">
        <a
          className="p-0 navbar-brand d-flex justify-content-center align-items-center m-auto text-white"
          href="/"
        >
          <img
            src={logo}
            alt="Logo"
            width="55"
            height="70"
            className="d-inline-block align-text-top logo"
          />
          <div className="logoText text-white">
            Campure's <span className="text-primary mx-3">DRINKS</span>
          </div>
        </a>
      </div>
    </>
  );
};

export default Brand;
