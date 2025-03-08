import express from "express";
import Workout from "../models/Workout.js";
import OldWorkout from "../models/OldWorkout.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new workout
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, duration, level, focus, scheduledDate } = req.body;
    const userId = req.user._id;

    // Create workout in new format
    const workout = await Workout.create({
      userId,
      title,
      duration,
      level,
      focus,
      scheduledDate,
      calories: Math.floor(parseInt(duration) * 6.67)
    });

    // Also create in old format for backward compatibility
    const oldWorkout = await OldWorkout.create({
      user: userId,
      category: focus,
      workoutName: title,
      duration: parseInt(duration),
      date: scheduledDate
    });

    res.status(201).json({ workout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get workouts for a user
router.get("/", verifyToken, async (req, res) => {
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
      ...oldWorkouts.map(w => ({
        _id: w._id,
        title: w.workoutName,
        duration: w.duration,
        level: "Beginner",
        focus: w.category,
        scheduledDate: w.date,
        calories: Math.floor(w.duration * 6.67)
      })),
      ...newWorkouts
    ];

    res.json({ workouts: allWorkouts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a workout
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const workoutId = req.params.id;

    // Try to delete from both collections
    const [oldWorkout, newWorkout] = await Promise.all([
      OldWorkout.findOneAndDelete({
        _id: workoutId,
        user: userId
      }),
      Workout.findOneAndDelete({
        _id: workoutId,
        userId
      })
    ]);

    if (!oldWorkout && !newWorkout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
