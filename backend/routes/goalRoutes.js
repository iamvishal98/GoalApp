import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

import {
  getGoals,
  updateGoals,
  createGoals,
  deleteGoals,
} from "../controllers/goalController.js";

router.route("/").post(protect, createGoals).get(protect, getGoals);
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

export default router;
