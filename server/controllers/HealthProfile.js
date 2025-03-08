import HealthProfile from "../models/HealthProfile.js";

export const createOrUpdateHealthProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      height,
      weight,
      age,
      gender,
      activityLevel,
      goals,
      dietaryRestrictions,
      medicalConditions
    } = req.body;

    // Find and update if exists, create if it doesn't
    const profile = await HealthProfile.findOneAndUpdate(
      { userId },
      {
        userId,
        height,
        weight,
        age,
        gender,
        activityLevel,
        goals,
        dietaryRestrictions,
        medicalConditions,
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

export const getHealthProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await HealthProfile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({ error: "Health profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

export const getDietSuggestions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await HealthProfile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({ error: "Health profile not found" });
    }

    // Generate diet suggestions based on BMI and profile data
    const suggestions = {
      bmi: profile.bmi,
      bmiCategory: getBMICategory(profile.bmi),
      recommendations: getDietaryRecommendations(profile),
      restrictions: profile.dietaryRestrictions,
      medicalConsiderations: profile.medicalConditions
    };

    res.status(200).json(suggestions);
  } catch (error) {
    next(error);
  }
};

// Helper function to get BMI category
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

// Helper function to get dietary recommendations
const getDietaryRecommendations = (profile) => {
  const recommendations = [];
  const { bmi, activityLevel, goals } = profile;

  // Basic recommendations based on BMI
  if (bmi < 18.5) {
    recommendations.push(
      "Increase caloric intake with nutrient-dense foods",
      "Focus on protein-rich foods",
      "Add healthy fats to meals"
    );
  } else if (bmi >= 25) {
    recommendations.push(
      "Focus on portion control",
      "Increase fiber intake",
      "Choose lean proteins"
    );
  }

  // Activity level recommendations
  switch (activityLevel) {
    case "sedentary":
      recommendations.push("Gradually increase physical activity", "Start with walking");
      break;
    case "active":
    case "very_active":
      recommendations.push("Ensure adequate protein intake", "Focus on post-workout nutrition");
      break;
  }

  // Add goal-specific recommendations
  if (goals.includes("muscle_gain")) {
    recommendations.push("Increase protein intake", "Focus on strength training");
  }
  if (goals.includes("weight_loss")) {
    recommendations.push("Create a moderate caloric deficit", "Include more vegetables");
  }

  return recommendations;
};
