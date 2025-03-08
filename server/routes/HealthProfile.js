import express from "express";
import {
  createOrUpdateHealthProfile,
  getHealthProfile,
  getDietSuggestions
} from "../controllers/HealthProfile.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create or update health profile
router.post("/", verifyToken, createOrUpdateHealthProfile);

// Get health profile
router.get("/", verifyToken, getHealthProfile);

// Get diet suggestions
router.get("/diet-suggestions", verifyToken, getDietSuggestions);

export default router;
