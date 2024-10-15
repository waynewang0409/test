import React, { Component } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../home/Home";
import ListEmployeesCP from "../employee/ListEmployeesCP";
import ListEmployeesNP from "../employee/ListEmployeesNP";
import ViewEmployee from "../employee/ViewEmployee";
import JwtLogin from "../jwtAuthentication/jwtLogin";
import VerifyJwtToken from "../jwtAuthentication/verifyJwtToken";

class RouteContent extends Component {
    render() {
        return (
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/ListEmployeesNP" element={<ListEmployeesNP />} />
                <Route exact path="/ListEmployeesCP" element={<ListEmployeesCP />} />
                <Route exact path="/ViewEmployee" element={<ViewEmployee />} />

                <Route exact path="/JwtLogin" element={<JwtLogin />} />
                <Route exact path="/VerifyJwtToken" element={<VerifyJwtToken />} />
            </Routes>
        )
    }
}

export default RouteContent;
