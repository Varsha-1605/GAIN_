const express = require("express");
const session = require('express-session');
const passport = require('./src/Auth/googleAuth');
require('dotenv').config();
const cors = require("cors");
const { UserRoute } = require("./Constant");
const connectToDatabase = require("./src/DB/Connect");

// Importing Routes
const userRoutes = require("./src/routes/userRoutes");
const userDataRoutes = require("./src/routes/userDataRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();
const port = process.env.PORT || 5001;

console.log("App is starting...");

const corsOptions = {
  origin: ['https://gain-pi.vercel.app', 'http://localhost:3000'], // Allow both production and local development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS requests)
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Required for cross-site cookie in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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
