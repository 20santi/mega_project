import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

const getCatalogPageData = async(categoryId) => {

    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId:categoryId});
        console.log("response of category page data:-> ", response);

        if(!response?.data?.success) {
            throw new Error("Could not fetch Category page data");
        }
        result = response?.data;

    } catch(error){
        console.log("Catagory page data error, ", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}

export default getCatalogPageData