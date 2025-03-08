import mongoose from "mongoose";

const HealthProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      default: "moderate"
    },
    goals: {
      type: [String],
      default: []
    },
    bmi: {
      type: Number,
      required: true
    },
    dietaryRestrictions: {
      type: [String],
      default: []
    },
    medicalConditions: {
      type: [String],
      default: []
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Calculate BMI before saving
HealthProfileSchema.pre("save", function(next) {
  // Height in meters (convert from cm)
  const heightInMeters = this.height / 100;
  // Calculate BMI: weight (kg) / (height (m))^2
  this.bmi = (this.weight / (heightInMeters * heightInMeters)).toFixed(2);
  next();
});

export default mongoose.model("HealthProfile", HealthProfileSchema);
