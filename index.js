<<<<<<< HEAD


const express = require('express');
=======
 express = require('express');
>>>>>>> d0045360b0129a9de3066dba2224b8db1eed7ff9
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

<<<<<<< HEAD
=======

>>>>>>> d0045360b0129a9de3066dba2224b8db1eed7ff9
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

<<<<<<< HEAD
=======

>>>>>>> d0045360b0129a9de3066dba2224b8db1eed7ff9
const seedUsers = async () => {
    const users = ['Rahul', 'Kamal', 'Sanaki', 'John', 'Alice', 'Bob', 'David', 'Maya', 'Sophia', 'Elon'];
    for (let user of users) {
        await User.create({ name: user });
    }
};
<<<<<<< HEAD
=======
// seedUsers(); 

>>>>>>> d0045360b0129a9de3066dba2224b8db1eed7ff9

app.get('/users', async (req, res) => {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
});

<<<<<<< HEAD
=======

>>>>>>> d0045360b0129a9de3066dba2224b8db1eed7ff9
app.post('/claim', async (req, res) => {
    const { userId } = req.body;
    const pointsToAdd = Math.floor(Math.random() * 10) + 1;

    try {
<<<<<<< HEAD
       
        const user = await User.findById(userId);
        if (user) {
           
=======
        
        const user = await User.findById(userId);
        if (user) {
            
>>>>>>> d0045360b0129a9de3066dba2224b8db1eed7ff9
            user.points += pointsToAdd;
            await user.save();

            
            const updatedUsers = await User.find().sort({ points: -1 });

<<<<<<< HEAD
            
=======
           
>>>>>>> d0045360b0129a9de3066dba2224b8db1eed7ff9
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






