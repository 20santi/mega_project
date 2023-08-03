import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatedisplayPicture } from "../../../../services/oparations/SettingsApi";

export default function ChangeProfilePicture() {

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const fileInputRef = useRef();

    const handleOnClick = () => {
        fileInputRef.current.click();
    }

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            previewState(file);
        }
    }

    const previewState = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        }
    }

    const handleUpload = () => {
        try{
            console.log("Uploading...");
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            dispatch(updatedisplayPicture(token, formData)).then(() => {
                setLoading(false);
            });

        } catch(error){
            console.log("ERROR MESSAGE - ", error.message) 
        }
    }

    useEffect(() => {
        if (imageFile) {
            previewState(imageFile)
        }
      }, [imageFile])

    return (
        <div className="flex gap-x-2 w-[792px] h-[126px] bg-richblack-800 rounded-lg ml-[370px] p-6">
                
                <img 
                    src={imageUrl ? imageUrl : user?.image} alt={`profile-${user?.firstName}`} 
                    className="rounded-full w-[78px] h-[78px]"
                />
                <div className="flex flex-col ml-2">
                    <p>Change Profile Picture</p>
                    <div className="flex gap-x-4 mt-2">
                        <input
                            type="file"
                            onChange={handleOnChange}
                            ref={fileInputRef}
                            className=" hidden"
                            accept="image/jpeg, image/png, image/gif"
                        />
                        <button 
                            onClick={handleOnClick}
                            disabled={loading}
                            className="bg-yellow-50 rounded-lg font-semibold w-[96px] h-[36px] text-richblack-900"
                        >
                            Select
                        </button>
                        <button 
                            onClick={handleUpload}
                            disabled={loading}
                            className="bg-richblack-700 text-richblack-50 rounded-lg font-semibold w-[96px] h-[36px]"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
    )
} 