import React from "react";
import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints;

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{

        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, 
        {
            Authorization: `Bearer ${token}`,
        })

        console.log("response of getUserEnrolledCourses -> ", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data

    } catch(error){
        toast.error("Could not fetch enrolled courses");
        console.log(error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization:`Bearer ${token}`
        })
        console.log("GET_INSTRUCTOR_DATA_API response: ", response);
        result = response?.data?.courseData

    } catch(error) {
        console.log("GET_INSTRUCTOR_API ERROR", error);
        toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
}