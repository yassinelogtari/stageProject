import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../pages/login/Login'

export default function ProtectedRoutes() {

    let isAuthenticated= localStorage.getItem("isLogged")
    
    
    return (
        isAuthenticated === "true" ? <Outlet/>:<Login/>
    ) 
}
