require('dotenv').config();
const { connect } = require('mongoose');
const { listen } = require('./app.js');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ...rest of your code

// Ensure MONGODB_URI is defined
if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not set in the environment variables.');
    process.exit(1);
}

connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected');
        console.log('Mongo URI:', MONGODB_URI);
        listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });