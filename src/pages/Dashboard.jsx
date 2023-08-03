import React from "react";
import { useSelector } from "react-redux";
import {Outlet} from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard()  {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading) {
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;