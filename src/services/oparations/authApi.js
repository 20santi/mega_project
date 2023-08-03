import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API} = endpoints;

export function sendOtp(email, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", SENDOTP_API, { 
                email,
                userExist:true
            })

            console.log("send otp response....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Otp sent successfully");
            navigate("/verify-email");

        } catch(error){
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signup(accountType, firstName, lastName, email, password, 
    confirmPassword, phoneNumber, otp, navigate) {
        return async(dispatch) => {
            const toastId = toast.loading("Loading...");
            dispatch(setLoading(true));

            try{

                const response = await apiConnector("POST", SIGNUP_API, {
                    firstName, 
                    lastName, 
                    email, 
                    password, 
                    confirmPassword, 
                    otp, 
                    accountType, 
                    phoneNumber
                })

                console.log("signup respponse.....", response);
                if(!response.data.success) {
                    throw new Error(response.error.message);
                }

                toast.success("signup successfully");
                navigate("/login")

            } catch(error){
                console.log("Error while signup: ",error);
                toast.error("could not signup");
                navigate("/signup")
            }

            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }

export function login(email, password, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });
            console.log("login response....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Loged in successfully");
            dispatch(setToken(response.data.token));

            const userImage = response.data?.User?.image
            ? response.data.User.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.User.firstName} ${response.data.User.lastName}`
            
            dispatch(setUser({ ...response.data.User, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.User));
            navigate("/dashboard/my-profile");

        } catch(error){
            console.log("login error: ",error);
            toast.error("could not login")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return async(dispatch) => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Log out");
        navigate("/");
    }
}

export function getResetPasswordToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
            console.log("reset password token response.......", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            } 

            toast.success("reset email sent");
            setEmailSent(true);

        } catch{
            toast.error("Failed to sent email for reseting Password");
            //console.log("error is: ", error.message);
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token
            })

            console.log("reset password response...", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been sent successfully");
            navigate("/dashboard/my-profile");

        } catch{
            console.log('reset password token error');
            toast.error("Unable to reset password");
        }

        dispatch.setLoading(false);
    }
}