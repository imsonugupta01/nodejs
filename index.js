

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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


const userSchema = new mongoose.Schema({
    name: String,
    points: { type: Number, default: 0 }
});
const User = mongoose.model('User', userSchema);

const seedUsers = async () => {
    const users = ['Rahul', 'Kamal', 'Sanaki', 'John', 'Alice', 'Bob', 'David', 'Maya', 'Sophia', 'Elon'];
    for (let user of users) {
        await User.create({ name: user });
    }
};

app.get('/users', async (req, res) => {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
});

app.post('/claim', async (req, res) => {
    const { userId } = req.body;
    const pointsToAdd = Math.floor(Math.random() * 10) + 1;

    try {
       
        const user = await User.findById(userId);
        if (user) {
           
            user.points += pointsToAdd;
            await user.save();

            
            const updatedUsers = await User.find().sort({ points: -1 });

            
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






