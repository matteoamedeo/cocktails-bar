import React, { useEffect } from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  lastAttemptedUrl,
  checkToken,
  fetchAuth,
  setAuthFromStorage,
} from "../redux/reducers/auth-reducer";
import instance from "../api";

const PrivateRoute = ({ element }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(lastAttemptedUrl(location));
    dispatch(setAuthFromStorage());
  }, []);

  return auth.isAuthenticated && auth.whitelistToken ? (
    <Outlet />
  ) : (
    <Navigate exact to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
