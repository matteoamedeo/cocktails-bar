import React from "react";
import Brand from "./Brand";
import { useDispatch, useSelector } from "react-redux";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/fontawesome-free-solid";
import { fetchLogout } from "../redux/reducers/auth-reducer";
import { checkTokenFromStorage } from "../helpers/LocalStorage";
import instance from "../api";
import "../scss/variables.scss";
fontawesome.library.add(faUser, faHeart);

const Navbar = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const axiosInstance = instance();

  function logout(e) {
    e.preventDefault();
    console.log("LOGOUT");
    dispatch(fetchLogout("/account/logout", axiosInstance));
  }

  return (
    <nav className="navbar container bg-body">
      <Brand />

      <div className="pull-right d-flex container justify-content-center justify-content-sm-end mt-3 mt-sm-5">
        {auth.isAuthenticated && auth.whitelistToken ? (
          <a href="#" onClick={logout}>
            <div className="user px-4 text-white d-flex align-items-center">
              <div className="text-white text-small px-3">Esci</div>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </a>
        ) : (
          <a href="/login">
            <div className="user px-4 text-white">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </a>
        )}

        <a href="/wishlist">
          <div className="wishlist px-4 text-white">
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
