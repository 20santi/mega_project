const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImage } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    try{

        //fetch data
        const {sectionid, title, description,} = req.body;

        // extract file/video
        const video = req.files.video

        //validation
        if(!sectionid || !title || !description || !video) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // upload video to cloudinary for geting video url
        const  uploadDetails = await uploadImage(video, process.env.FOLDER_NAME)

        //create a subsection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl: uploadDetails.secure_url,
        })

        //update section with this subsection ObjectId
        const updateSection = await Section.findByIdAndUpdate({_id:sectionid},
            {
                $push:{
                    subSection:subSectionDetails._id,
                } 
            }, {new:true}).populate("subSection");
        

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
            data:updateSection
        });

    } catch(error) {
        return res.status(200).json({
            success:false,
            message:"Could not create subsection"
        });
    }
}

// hw updatesubSection
exports.updateSubsection = async(req,res) => {
    try{

        //get data
        const {subSectionId, sectionId, title, description} = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
          }

        if(title) {
            subSection.title = title;
        }
       
        if(description) {
            subSection.description = description;
        }

        if(req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadedVideo = await uploadImage(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadedVideo.secure_url;
            subSection.timeDuration = `${uploadedVideo.duration}`;
        }

        // create subsection
        await subSection.save();

        const updateSection = await Section.findById(sectionId).populate("subSection");

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub section updated successfully",
            data:updateSection
        });

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Sub section can not be updated"
        });
    }
}

// hw delete Subsection
exports.deleteSubsection = async(req,res) => {
    try{

        // fetch subsection id
        const {subSectionId,sectionId} = req.body;

        //delete subsection id from section
        await Section.findByIdAndUpdate(sectionId,
            {
                $pull:{
                    subSection: subSectionId
                }
            });

        const subSection = await SubSection.findByIdAndDelete({_id:subSectionId})

        if(!subSection) {
            return res.status(404).json({
                success:false,
                message:"Subsection not found"
            })
        }

        const updateSection = await Section.findById(sectionId).populate("subSection");

        //return response
        return res.status(200).json({
            success:true,
            message:"sub section deleted successfully",
            data:updateSection
        })

    } catch(error){
        return res.status(200).json({
            success:false,
            message:"Sub section can not be deleted"
        });
    }
}