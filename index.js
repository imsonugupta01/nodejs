 express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// MongoDB connection string
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const app = express();
app.use(cors());
app.use(express.json());

// Schema and Model for Users
const userSchema = new mongoose.Schema({
    name: String,
    points: { type: Number, default: 0 }
});
const User = mongoose.model('User', userSchema);

// Seed the database with 10 users (run once)
const seedUsers = async () => {
    const users = ['Rahul', 'Kamal', 'Sanaki', 'John', 'Alice', 'Bob', 'David', 'Maya', 'Sophia', 'Elon'];
    for (let user of users) {
        await User.create({ name: user });
    }
};
// seedUsers(); // Uncomment this to seed users and comment after first run

// Get all users and sort them by total points
app.get('/users', async (req, res) => {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
});

// Claim points for a user (random 1 to 10 points)
app.post('/claim', async (req, res) => {
    const { userId } = req.body;
    const pointsToAdd = Math.floor(Math.random() * 10) + 1;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (user) {
            // Add random points and save
            user.points += pointsToAdd;
            await user.save();

            // Fetch all users sorted by points in descending order
            const updatedUsers = await User.find().sort({ points: -1 });

            // Return updated user and the entire sorted list of users
            res.json({ user, pointsToAdd, updatedUsers });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
