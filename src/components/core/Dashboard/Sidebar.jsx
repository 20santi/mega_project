import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/oparations/authApi";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import {useNavigate} from "react-router-dom";
import {VscSignOut} from "react-icons/vsc";
import { toast } from "react-hot-toast";

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState(null);

    if(authLoading || profileLoading) {
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }

    const handleOnClick = () => {
        try{
            dispatch(logout(navigate));

        } catch(error){
            toast.error("You can not log out");
            console.log("error while log out", error);
        }
    }

    return (
        <div>
            <div className="mt-10 fixed flex min-w-[222px] h-screen flex-col border-r-[1px] border-r-richblack-700
            bg-richblack-800 py-10 overflow-auto">

                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type) 
                                return null
                            
                            return (
                                <div className="" >
                                    <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="mx-auto w-10/12 mt-6 mb-6 h-[1px] bg-richblack-400"></div>

                <div className="flex flex-col gap-y-3">
                    <SidebarLink link={{name:"Settings", path:"dashboard/settings"}}
                    iconName="VscSettingsGear"
                    />

                    <button className="text-sm font-medium text-richblack-300 pl-8">
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg"/>
                            <span onClick={handleOnClick}>Log Out</span>
                        </div>

                    </button>
                </div>

            </div>
        </div>
    )
}

export default Sidebar;