import React from "react";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const auth = localStorage.getItem("accessToken");
  if (auth === null || auth === undefined) {
    return children; 
  }
  return <Navigate to="/dashboard" />;
};
