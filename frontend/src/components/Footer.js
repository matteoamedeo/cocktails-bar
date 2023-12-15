import React from "react";
import MenuLinks from "./MenuLinks";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <div className="container">
      <footer className="py-5 my-5">
        <Newsletter />
        <p className="text-center text-white p-5">© 2023 Campure, Inc</p>
      </footer>
    </div>
  );
};

export default Footer;
