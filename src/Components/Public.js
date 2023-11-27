import React from 'react'

import { Navigate, useLocation } from "react-router-dom"
const PublicRoute = ({ children }) => {
  let isuser= localStorage.getItem("UserAuth")
 
    if (isuser==true) {
        return <Navigate to="/" />
    }
    return children
};
export default PublicRoute;