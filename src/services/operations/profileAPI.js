import { toast } from "react-hot-toast"
import { settingsEndpoints, profileEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../slices/profileSlice";
import { store } from '../../store'


const {
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API } = settingsEndpoints;

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_API } = profileEndpoints

export async function updateDisplayPicture(displayPicture, token) {


    const BEARER_TOKEN = 'Bearer ' + token;
    //console.log('display picture in client side  function:', [...displayPicture])
    const loading = toast.loading("Loading...")
    let response;
    try {
        response = await apiConnector('PUT',
            UPDATE_DISPLAY_PICTURE_API,
            displayPicture,
            {
                Authorisation: BEARER_TOKEN.trim(),
                "Content-Type": "multipart/form-data"
            })

        store.dispatch(setUser({ ...response.data.updatedProfile }));
        localStorage.setItem("user", JSON.stringify({ ...response.data.updatedProfile }))
        toast.success("Profile Picture Updated");
    } catch (error) {
        console.log('error while uploading profile pic ', error.message);
        toast.error(error.response.data.message);
    }

    toast.dismiss(loading)

}

export async function updateProfileInfo(profileData, token) {
    const loading = toast.loading("Loading...");
    try {
        const response = await apiConnector('PUT',
            UPDATE_PROFILE_API,
            {
                ...profileData,
                token
            })


        store.dispatch(setUser({ ...response.data.updatedProfile }));
        localStorage.setItem("user", JSON.stringify({ ...response.data.updatedProfile }))
        toast.success("Profile information Updated");
    } catch (error) {
        console.log('error while updating profile inforamtion :', error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(loading)
}

export async function changePassword(passwordData, token) {
    const loading = toast.loading("Loading...");
    try {
        const response = await apiConnector('POST',
            CHANGE_PASSWORD_API,
            {
                ...passwordData,
                token
            })

        toast.success(response.data.message);
    } catch (error) {
        console.log('error while updating password :', error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(loading)
}


export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorisation: `Bearer ${token}`,
            }
        )

        //   if (!response.data.success) {
        //     throw new Error(response.data.message)
        //   }
        console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response)
        result = response.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_API,
            null,
            {
                Authorisation: `Bearer ${token}`,
            }
        )

        //   if (!response.data.success) {
        //     throw new Error(response.data.message)
        //   }
        console.log("GET_INSTRUCTOR_API API RESPONSE............", response)
        result = response.data.data
    } catch (error) {
        console.log("GET_INSTRUCTOR_API API ERROR............", error)
        toast.error("Could Not Get data for dashboard")
    }
    toast.dismiss(toastId)
    return result
}
