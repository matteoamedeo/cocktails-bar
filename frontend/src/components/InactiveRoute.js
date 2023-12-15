import React, { useEffect } from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const InactiveRoute = () => {
  const { auth } = useSelector((state) => state);

  return auth.isAuthenticated && auth.data.token !== null ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default InactiveRoute;
