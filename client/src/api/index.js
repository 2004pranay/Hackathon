import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5003/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('fittrack-app-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// Auth APIs
export const UserSignUp = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    console.log('SignUp Response:', response);
    return response;
  } catch (error) {
    console.error('SignUp Error:', error.response?.data || error);
    throw error;
  }
};

export const UserSignIn = async (data) => {
  try {
    const response = await API.post("/user/signin", data);
    console.log('SignIn Response:', response);
    return response;
  } catch (error) {
    console.error('SignIn Error:', error.response?.data || error);
    throw error;
  }
};

// Dashboard APIs
export const getDashboardDetails = async () =>
  await API.get("/user/dashboard");

// Old Workout APIs (for dashboard)
export const getWorkouts = async (date) =>
  await API.get(`/user/workout${date ? `?date=${date}` : ''}`);

export const addWorkout = async (data) =>
  await API.post(`/user/workout`, data);

// New Workout APIs (for workouts page)
export const createWorkout = async (workoutData) => {
  const response = await API.post("/workouts", workoutData);
  return response;
};

export const fetchWorkouts = async () => {
  const response = await API.get("/workouts");
  return response;
};

export const deleteWorkout = async (workoutId) => {
  const response = await API.delete(`/workouts/${workoutId}`);
  return response;
};

// Health Profile APIs
export const createOrUpdateHealthProfile = async (data) => {
  const response = await API.post("/health-profile", data);
  return response;
};

export const getHealthProfile = async () => {
  const response = await API.get("/health-profile");
  return response;
};

export const getDietSuggestions = async () => {
  const response = await API.get("/health-profile/diet-suggestions");
  return response;
};
