const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3000;

// Enable CORS for all incoming requests
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI; // Ensure you have this in your .env file
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema and model for storing messages
const StringSchema = new mongoose.Schema({
    inputString: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Add createdAt field
});

const StringModel = mongoose.model('String', StringSchema);

// POST endpoint to accept and save a string
app.post('/save', async (req, res) => {
    try {
        const { inputString } = req.body;

        // Validate input
        if (!inputString || typeof inputString !== 'string') {
            return res.status(400).json({ error: 'Invalid input. Please provide a valid string.' });
        }

        // Create and save the document in MongoDB
        const newString = new StringModel({ inputString });
        await newString.save();

        console.log('String saved to database:', inputString);

        // Respond with a success message
        res.status(200).json({ message: 'String saved successfully!', inputString });
    } catch (error) {
        console.error('Error saving string to database:', error);
        res.status(500).json({ error: 'An error occurred while saving the string.' });
    }
});

// Start the server on port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
