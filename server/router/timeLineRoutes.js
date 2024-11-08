import express from "express";

import { isAuthenticated } from "../middleware/auth.js";
import {postTimeLine,deleteTimeline,getAllTimeLines} from '../controller/timeLineController.js'

const router = express.Router();

router.post("/add",isAuthenticated,postTimeLine)
router.delete("/delete/:id",isAuthenticated,deleteTimeline)
router.get('/getall',getAllTimeLines)



export default router;

