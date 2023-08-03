import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {categories} from "../apis"
import { courseEndpoints } from "../apis";

const {CATEGORIES_API} = categories;
const {
    CREATE_COURSE_API,
    UPDATE_SECTION_API,
    CREATE_SECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    EDIT_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    COURSE_DETAILS_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API
} = courseEndpoints;

export async function fetchCourseCategories() {
    const toastid = toast.loading("Loading");
    let result = [];
    try{
        const response = await apiConnector("GET", CATEGORIES_API);
        console.log("Categories -> ", response);
        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.data

    } catch(error){
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastid);
    return result;
}

export async function addCourseDetails(data, token) {
    const toastId = toast.loading("Loading");
    let result = null;
    try{
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("Add course response -> ", response);
        if(!response?.data?.success) {
            throw new Error("Could not add course")
        }
        toast.success("Course add successfully")
        result = response?.data?.data

    } catch(error){
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }

export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        console.log("courseId ------------", data.courseId);
      const response = await apiConnector("POST", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
      }
      toast.success("Course Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse = async(data, token) => {
    const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

export const getFullCourseDetails = async(courseId, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, {courseId}, {
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not fetch full Course Details")
      }
      toast.success("Full Course Details fetch Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("error while fetch full course Details............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading");
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success) {
            throw new Error("Could not create Section");
        }
        console.log("Section create response -> ", response);
        toast.success("Section created successfully");
        result = response?.data?.updateCourse

    } catch(error){
        toast.error("Could not update Section");
        console.log("error while updateing Section /operations/courseDetails", error);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization:`Bearer ${token}`
        })
        if(!response?.data?.success) {
            throw new Error("Could Not Create Section")
        }
        console.log("updateSection Response -> ", response);
        toast.success("section updated successfully");
        result = response?.data?.data
    } catch(error){
        toast.error("Could not update Section");
        console.log("error while updateing Section /operations/courseDetails", error);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("response after delete section -> ", response);
        if(!response?.data?.success) {
            throw new Error("Could not Delete section");
        }
        toast.success("Section delete successfully");
        result = response?.data?.data

    } catch(error) {
        toast.error("error in deleteSection function in operations/courseDetails ");
        console.log("error in api call ---------------", error);
    }
    toast.dismiss(toastId);
    return result;
}

// subSection
export async function createSubSection(data, token) {
    let result = null;
    const toastId = toast.loading("Loading");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("response after createSubSection: ", response);
        if(!response?.data?.success) {
            throw new Error("could not create subsection");
        }
        toast.success("Subsection create successfuly");
        result = response?.data?.data;
        
    } catch(error) {
        toast.error("Could not create Subsection");
        console.log("error in createSubSection function in operations/courseDetails :-> ", error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function updateSubSection(data, token) {
    let result = null;
    const toastId = toast.loading("Loading");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("response after update SubSection: ", response);
        if(!response?.data?.success) {
            throw new Error("could not update subsection");
        }
        toast.success("Subsection updated successfuly");
        result = response?.data?.data;
        
    } catch(error) {
        toast.error("Could not update Subsection");
        console.log("error in updateSubSection function in operations/courseDetails :-> ", error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteSubsection(data, token) {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        }) 
        console.log("response after delete SubSection: ", response);
        if(!response?.data?.success) {
            throw new Error("Could not delete Sub Section");
        }
        toast.success("Sub section deleted successfully");
        result = response?.data?.data;

    } catch(error) {
        toast.error("error while deleteing Sub section: ");
        console.log("error in deleteSubsection funtion in oparations/courseDetails", error );
    }
    toast.dismiss(toastId);
    return result;
}

export async function fetchInstructorCourses(token) {
    let result = null;
    try{
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("response after fetch InstructorCourses -> ", response);
        if(!response?.data?.success) {
            throw new Error("culd not fetch instructor courses");
        }
        toast.success("fetch instructor courses successfully");
        result = response?.data?.data;

    } catch(error) {
        toast.error("error while deleteing Sub section: ");
        console.log("error in deleteSubsection funtion in oparations/courseDetails", error );
    }
    return result;
} 

export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }

  export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }