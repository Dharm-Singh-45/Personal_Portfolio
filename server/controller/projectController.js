import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length == 0) {
    return next(new ErrorHandler("Project Banner Image Required"));
  }
  const { projectBanner } = req.files;
  const { title, description, gitRepoLink, projectLink,technology, stack, deployed } =
    req.body;
  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technology||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All Details"));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    {
      folder: "Project Image",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error : ",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed to upload project banner to cloudinary", 500)
    );
  }
  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technology,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "New Project Added",
    project,
  });
});

export const updateProject = catchAsyncError(async (req, res, next) => {
  const newProjectData = {
    title:req.body.title,
    description:req.body.description,
    gitRepoLink:req.body.gitRepoLink,
    projectLink:req.body.projectLink,
    stack:req.body.stack,
    deployed:req.body.deployed,
    technology:req.body.technology
  };
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      {
        folder: "PROJECT IMAGES",
      }
    );
    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  const project = await Project.findByIdAndUpdate(req.params.id,newProjectData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true,
    message:"Project Updated Successfully",
    project
  })
});

export const deleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id)
  if(!project){
    return next(
        new ErrorHandler("Project Not Found", 404)
      );
  }
  await project.deleteOne()
  res.status(200).json({
    success:true,
    message:"Project Deleted Successfully",
    project
  })
});
export const getAllProjects = catchAsyncError(async (req, res, next) => {
    const projects = await Project.find()
    res.status(200).json({
        success:true,
        message:"All projects",
        projects
      })
});
export const getSingleProject = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  const project = await Project.findById(id)
  if(!project){
    return next(
        new ErrorHandler("Project Not Found", 404)
      );
  }
  res.status(200).json({
    success:true,
   
    project
  })
});
