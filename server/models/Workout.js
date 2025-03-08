import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    focus: {
      type: String,
      enum: ["Full Body", "Upper Body", "Lower Body", "Core", "Cardio", "Flexibility"],
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Workout", WorkoutSchema);
