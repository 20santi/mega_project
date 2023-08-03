import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        //initialize order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {
            Authorization: `Bearer ${token}`
        })
        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        //options
        const options = {
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"THank you for purchasing the Course",
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                // send successfull mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);

                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed", function(response) {
            toast.error("oops, Payment failed");
            console.log("error while payment:------------------", response.error);
        })

    } catch(error) {
        console.log("payment api error............", error);
        toast.error("Could not make Payment")
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization: `Bearer ${token}`
        })

    } catch(error) {
        console.log("Payment success email api error: ", error);
    }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verify Payment...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successfully, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch(error) {
        console.log("payment varify error: ", error);
        toast.error("Could not verify Payment")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading());
}