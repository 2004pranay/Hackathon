import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import HealthProfileRoutes from "./routes/HealthProfile.js";
import WorkoutRoutes from "./routes/Workout.js";

// Load environment variables first
dotenv.config();

// Validate required environment variables
if (!process.env.MONGODB_URL) {
  console.error("MONGODB_URL is not defined in environment variables");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection with debug logging
mongoose.set('debug', true); // Enable mongoose debug mode

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 2000,
    });
    
    console.log('MongoDB Connected');
    
    // Log when the connection is lost
    mongoose.connection.on('disconnected', () => {
      console.log('Lost MongoDB Connection!');
    });
    
    // Log when the connection is reconnected
    mongoose.connection.on('reconnected', () => {
      console.log('Reconnected to MongoDB!');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/health-profile", HealthProfileRoutes);
app.use("/api/workouts", WorkoutRoutes);

// Default route with MongoDB connection status
app.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  
  res.json({
    message: "FitTrack API is running!",
    mongoDBStatus: dbStates[dbState] || 'unknown'
  });
});

// Error handling middleware with detailed logging
app.use((err, req, res, next) => {
  // Log the full error details
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    status: err.status,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers
  });

  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  
  res.status(status).json({
    success: false,
    status,
    message,
    timestamp: new Date().toISOString(),
    path: req.path,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5003;

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});