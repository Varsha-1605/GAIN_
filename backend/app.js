const express = require("express");
const session = require('express-session');
const passport = require('./src/Auth/googleAuth');
require('dotenv').config();
const cors = require("cors");
const { UserRoute } = require("./Constant");
const connectToDatabase = require("./src/DB/Connect");

const allowedOrigins = ['https://gain-pi.vercel.app'];

// Importing Routes
const userRoutes = require("./src/routes/userRoutes");
const userDataRoutes = require("./src/routes/userDataRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();
const port = process.env.PORT || 5001;

console.log("App is starting...");
const corsOptions = {
  origin: 'https://gain-pi.vercel.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};
// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS requests)
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Add the new root route here
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// For User Routes
app.use(UserRoute, userRoutes);
app.use('/api/userdata', userDataRoutes);
app.use('/api/admin', adminRoutes);

const start = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
