import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/oparations/SettingsApi";

const EditPassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState:{errors}    
    } = useForm();

    const handleOnSubmit = (data) => {
        try{
            dispatch(changePassword(token, data));

        } catch(error) {
            console.log("Error in change password -> ", error);
        }
    }

    return (
        <div className="w-[792px] h-[310px] rounded-lg bg-richblack-800 ml-[370px]">
            <h1 className="text-[18px] leading-[26px] font-inter font-semibold text-richblack-5 pl-6 mt-5">
                Password
            </h1>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="flex flex-col gap-y-5">
                    {/* left */}
                    <div className="flex flex-col pl-6 mt-5">
                        <label htmlFor="oldPassword">
                            Current Password
                        </label>
                        <input
                            type={showPassword ? "password" : "text"}
                            name="oldPassword"
                            id="oldPassword"
                            {...register("oldPassword", {required:true})}
                            className="w-[360px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                            leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                            shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                    </div>

                    {/* right */}
                    <div className="flex">
                        {/* new password */}
                        <div className="flex flex-col ml-6">
                            <label htmlFor="newPassword">
                                New Password
                            </label>
                            <input
                                type={showNewPassword ? "password" : "text"}
                                name="newPassword"
                                id="newPassword"
                                {...register("newPassword", {required:true})}
                                className="w-[360px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                            />
                        </div>

                        {/* confim new password */}
                        <div className="">
                            <div className="flex flex-col ml-6">
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    type={showConfirmPassword ? "password" : "text"}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    {...register("confirmPassword", {required:true})}
                                    className="w-[360px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div className="ml-6 mt-5 flex gap-x-4">
                    <button onClick={() => navigate("/dashboard/my-profile")} 
                        className=" bg-richblack-700 text-richblack-50 rounded-lg font-semibold w-[90px] h-[41px]">
                        Cancell
                    </button>

                    <IconBtn type="submit" text="Save"/>
                </div>
            </form>
        </div>
    )
}

export default EditPassword;