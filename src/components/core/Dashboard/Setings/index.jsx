import React from "react";
import { Link } from "react-router-dom";
import {MdKeyboardArrowLeft} from "react-icons/md";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import DeleteAccount from "./DeleteAccount";

export default function Setting() {

    return (
        <div className="text-white flex flex-col gap-y-5">
            
            {/* back button */}
            <Link to="/dashboard/my-profile">
                <button className="flex flex-row-reverse items-center pl-6 pt-7 text-[14px] leading-[22px] text-richblack-300 font-inter font-normal">
                    <p>Back</p>
                    <MdKeyboardArrowLeft/>
                </button>
            </Link>

            <h1 className="text-[30px] leading-[38px] font-inter font-semibold text-richblack-5 pl-6 mt-4">
                Edit Profile
            </h1>

            {/* section 1 */}
            <ChangeProfilePicture/>

            <EditProfile/>

            <EditPassword/>

            <DeleteAccount/>
        </div>
    )
}