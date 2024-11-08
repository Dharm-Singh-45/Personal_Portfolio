import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import {SoftwareApplication} from '../models/softwareApplicationSchema.js'
import {v2 as cloudinary} from 'cloudinary'


export const addNewApplication = catchAsyncError(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Software application Icon/Scg Required", 400));
      }
      const { svg } = req.files;
      const { name } = req.body;
      if(!name){
        return next(new ErrorHandler("Softwares application Name is required", 400));
      }
    
      const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath,
        { folder: "Portfolio_Software_Applications" }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error : ",
          cloudinaryResponse.error || "Unknown Cloudinary Error"
        );
      }
      const softwareApplication = await SoftwareApplication.create({
        name,
        svg:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
      })
      res.status(200).json({
        success:true,
        message:"New Software Application Added",
        softwareApplication
      })

})


export const deleteApplication = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const softwareApplication = await SoftwareApplication.findById(id)
    if(!softwareApplication){
        return next(new ErrorHandler("Softwares application is not found", 404));
    }
    const softwareApplicationSvgId = softwareApplication.svg.public_id
    await cloudinary.uploader.destroy(softwareApplicationSvgId)
    await softwareApplication.deleteOne()
    res.status(200).json({
        success:true,
        message:"Software Application Deleted"
    })
})


export const getAllApplication = catchAsyncError(async(req,res,next)=>{
    const softwareApplication = await SoftwareApplication.find()
    res.status(200).json({
        success:true,
        softwareApplication
    })
})