import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const auth = React.useContext(AuthContext);
  const location = useLocation();
  if (!auth?.user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
};
