import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Countrycode from "../../../../data/countrycode.json"
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconButton";
import {updateProfile} from "../../../../services/oparations/SettingsApi"

export default function EditProfile() {

    const navigate = useNavigate();

    const genders = ["Male", "Female", "Other"];

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const handleOnSubmit = (data) => {
        console.log("form data -> ", data);
        dispatch(updateProfile(token, data));
    }

    return (
        <div className="flex flex-col w-[792px] h-[415px] bg-richblack-800 rounded-lg ml-[370px] ">
            <h1 className="text-[18px] leading-[26px] font-inter font-semibold text-richblack-5 pl-6 mt-5">
                Profile Information
            </h1>

            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div  className="flex gap-x-6 mt-5 pl-6">
                    {/* left side */}
                    <div className="flex flex-col gap-y-6 w-[360px]">
                        <div className="flex flex-col ">
                            <lable htmlFor="firstName" className="text-[14px] leading-[22px] font-inter font-normal text-richblack-5">
                                First Name
                            </lable>
                            <input 
                            type="text"
                                defaultValue={user?.firstName}
                                name="firstName"
                                id="firstName"
                                placeholder="Enter your First Name"
                                className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                {...register("firstName", {required:true})}
                            />
                            {
                                errors.firstName && (
                                    <span>
                                        Please Enter your First Name
                                    </span>
                                )
                            }
                    </div>

                        <div className="flex flex-col">
                            <label htmlFor="dateOfBirth">
                                Date Of Birth
                            </label>
                            <input
                                type="date"
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                                name="dateOfBirth"
                                id="dateOfBirth"
                                placeholder="Enter your Date Of Birth"
                                className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                {...register("dateOfBirth", {
                                    required:{
                                        value:true,
                                        message:"Plese enter your Date Of Birth"
                                    },
                                    max:{
                                        value: new Date().toISOString().split("T")[0],
                                        message:"Date of Birth Cannot be in future.",
                                    }
                                })}
                            />
                            {
                                errors.dateOfBirth && (
                                    <span>
                                        {errors.dateOfBirth.message}
                                    </span>
                                )
                            }
                        </div>

                        <div className="">
                            <label>
                                Phone Number
                            </label>
                            <div className="flex gap-5">
                                <select 
                                    name="country" 
                                    id="countryDropdown"
                                    {...register("countryCode", {required:true})}
                                    className="w-[75px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                >
                                    {
                                        Countrycode.map((Code, index) => {
                                            return (
                                                <option key={index} value={Code.code}>
                                                    {Code.code} {Code.country}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <input 
                                    type="tel"
                                    name="contactNumber"
                                    id="contactNumber"
                                    placeholder="Enter Your Phone Number"
                                    className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                    defaultValue={user?.additionalDetails?.phoneNumber}
                                    {...register("contactNumber", {required:{
                                        value:true,
                                        message:"Please enter your contact Number"
                                    },
                                    maxLength:{value:12, message:"Invalid Contact Number"},
                                    minLength:{value:10, message:"Invalid Contact Number"}
                                })}
                                />
                                {
                                    errors.contactNumbr && (
                                        <span>
                                            {errors.contactNumbr.message}
                                        </span>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="flex flex-col gap-y-6 w-[360px]">
                        <div className="">
                            <label htmlFor="lastName">
                                Last Name
                            </label>
                            <input 
                                type="text"
                                defaultValue={user?.lastName}
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your Last Name"
                                {...register("lastName", {required:true})}
                                className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                            />
                            {
                                errors.lastName && (
                                    <span>
                                        Please Enter your Last Name
                                    </span>
                                )
                            }
                        </div>

                        <fieldset>
                            <legend>
                                Gender
                            </legend>
                            <div className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px] flex
                                        leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                        shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)] gap-x-5 justify-center">
                                <label className="flex gap-x-2 items-center">
                                    <input 
                                        type="radio"
                                        value="male"
                                        id="male"
                                        {...register("gender")}
                                    />
                                    Male
                                </label>
                                <label className="flex gap-x-2 items-center">
                                    <input 
                                        type="radio"
                                        value="female"
                                        id="female"
                                        {...register("gender")}
                                    />
                                    Female
                                </label>
                                <label className="flex gap-x-2 items-center">
                                    <input 
                                        type="radio"
                                        value="other"
                                        id="other"
                                        {...register("gender")}
                                    />
                                    Other
                                </label>
                            </div>
                        </fieldset>
                        <div className="flex flex-col">
                            <label htmlFor="about">
                                About
                            </label>
                            <input 
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                defaultValue={user?.additionalDetails?.about}
                                {...register("about", {required:true})}
                                className="w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px] flex
                                        leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-700 opacity-[0.9]
                                        shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)] gap-x-5 justify-center"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-x-4 ml-6 mt-7">
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