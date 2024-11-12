import express from "express";
import {
  addNewProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getSingleProject,
} from '../controller/projectController.js'
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", addNewProject);
router.get("/getAll", getAllProjects);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/get/:id", getSingleProject);

export default router;
