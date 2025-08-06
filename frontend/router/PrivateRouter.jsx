import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  //   const location = useLocation();
  //  console.log("🔒 PrivateRoute rendered at:", location.pathname);

  // Redux se token aur role fetch karo
  const userrole = useSelector((state) => state.auth.role);
  // console.log(userrole);
  
  const token = useSelector((state) => state.auth.token);
  // console.log(token)


  if (!token) {
    // Agar token hi nahi hai, to login pe bhej do
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userrole)) {
    // Role allowed nahi hai to unauthorized page dikhao (or redirect to home)
    return <Navigate to="/signin" replace />;
  }

  // Sab sahi hai to andar ka component dikhaye
  return <Outlet />;
};

export default PrivateRoute;
