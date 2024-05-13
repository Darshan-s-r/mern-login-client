import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Activate from "./auth/Activate";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import PrivateRoute from "./auth/PrivateRoute";

function Router(){
    return (
        <BrowserRouter>
           <Routes>
            <Route path="/" exact element={<PrivateRoute />} /> 
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/signin" exact element={<SignIn />} />
            <Route path="/accountActivation/:token" element={<Activate />} />
            <Route path="/password/forgot" exact element={<Forgot />} />
            <Route path="/password/reset/:resetPasswordLink" element={<Reset />} />
           </Routes>
        </BrowserRouter>
    )
}; 

export default Router; 