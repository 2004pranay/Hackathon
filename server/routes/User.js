import express from "express";
import { 
  UserRegister, 
  UserSignIn, 
  addWorkout, 
  getUserDashboard, 
  getWorkoutsByDate 
} from "../controllers/User.js";
import { verifyToken } from "../middleware/auth.js";
import Workout from "../models/Workout.js";
import OldWorkout from "../models/OldWorkout.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserSignIn);

router.get("/dashboard", verifyToken, getUserDashboard);

// Get workouts by date (for dashboard)
router.get("/workout", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { date } = req.query;

    // Get both old and new workouts
    const oldWorkouts = await OldWorkout.find({
      user: userId,
      ...(date && {
        date: {
          $gte: new Date(date).setHours(0, 0, 0, 0),
          $lte: new Date(date).setHours(23, 59, 59, 999)
        }
      })
    }).sort({ date: -1 });

    const newWorkouts = await Workout.find({
      userId,
      ...(date && {
        scheduledDate: {
          $gte: new Date(date).setHours(0, 0, 0, 0),
          $lte: new Date(date).setHours(23, 59, 59, 999)
        }
      })
    }).sort({ scheduledDate: -1 });

    // Combine and format workouts
    const allWorkouts = [
      ...oldWorkouts,
      ...newWorkouts.map(w => ({
        ...w.toObject(),
        category: w.focus,
        workoutName: w.title,
        date: w.scheduledDate
      }))
    ];

    res.json({
      todaysWorkouts: allWorkouts,
      totalWorkouts: allWorkouts.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add workout from dashboard
router.post("/workout", verifyToken, async (req, res) => {
  try {
    const { workoutString } = req.body;
    const userId = req.user._id;

    // Parse workout string
    const lines = workoutString.split('\n');
    const category = lines[0].replace('#', '').trim();
    const workoutName = lines[1].replace('-', '').trim();
    const sets = lines[2].replace('-', '').split('X')[0].trim();
    const reps = lines[2].replace('-', '').split('X')[1].replace('reps', '').trim();
    const weight = lines[3].replace('-', '').replace('kg', '').trim();
    const duration = lines[4].replace('-', '').replace('min', '').trim();

    // Create workout in new format
    const workout = await Workout.create({
      userId,
      title: `${category} - ${workoutName}`,
      duration: parseInt(duration),
      level: "Beginner", // Default value
      focus: category,
      scheduledDate: new Date(),
      calories: Math.floor(parseInt(duration) * 6.67)
    });

    // Also create in old format for backward compatibility
    const oldWorkout = await OldWorkout.create({
      user: userId,
      category,
      workoutName,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseInt(weight),
      duration: parseInt(duration)
    });

    res.status(201).json({ workout: oldWorkout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
