import { toast } from "react-hot-toast";
import { setLoading} from "../../slices/authSlice";
import {setUser} from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authApi";

const {
    UPDATE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

export function updatedisplayPicture(token, formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading");
        try{
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);
           
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully");
            dispatch(setUser(response.data.data));

        } catch(error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId);
    }
} 

export function updateProfile(token, formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading")
        try{

            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`
            })

            console.log("updateProfile response ", response);
            if(!response.data.success) {
                throw new Error(response.data.success);
            }
            toast.success("Profile Updated Successfully")

        } catch(error){
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(token, data) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading");
        try{
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
                Authorization: `Bearer ${token}`
            })
            console.log("response of after change Password -> ", response);
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password changed successfully")

        } catch(error){
            console.log("error while changing Password -> ", error);
            toast.error("password could not change");
        }
        toast.dismiss(toastId);
    }
}

export function deleteProfile(token, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Account Deleted Successfully");
            dispatch(logout(navigate));

        } catch(error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
          }
          toast.dismiss(toastId)
    }
}