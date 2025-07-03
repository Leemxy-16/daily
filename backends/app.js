require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const baseRouter = require('./routes');
const morgan = require('morgan');
const app = express();

const allowedOrigins = [
    process.env.APP_URL,
    "http://localhost:5173",
    // Add more allowed origins as needed
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.options("*", cors()); // For preflight

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.json("Welcome to movie app web service...");
});

// Routes
app.use("/api", baseRouter);

// Optional: Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;