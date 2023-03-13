import React from 'react';
import {Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function PrivateRoute({children}) {
    const {tokens} = React.useContext(AuthContext);
    if (tokens) {
        return (
            <Outlet/>
        )
    }
    return (
        <Navigate to="/login" replace />
    )
}