const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = express.Router();

// MongoDB connection details
const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const dbName = "courseDB";
const client = new MongoClient(url);

// Connect to MongoDB
async function connectDB() {
    await client.connect();
    console.log("Connected to MongoDB...");
    const db = client.db(dbName);
    return db.collection("courses");
}

// Create a new course (POST)
router.post("/courses", async (req, res) => {
    try {
        const coursesCollection = await connectDB();
        const { name } = req.body;
        const newCourse = { name };
        const result = await coursesCollection.insertOne(newCourse);
        res.status(201).send(result.ops[0]);
    } catch (err) {
        res.status(500).send("Error creating course");
    }
});

// Get all courses (GET)
router.get("/courses", async (req, res) => {
    try {
        const coursesCollection = await connectDB();
        const courses = await coursesCollection.find({}).toArray();
        res.status(200).send(courses);
    } catch (err) {
        res.status(500).send("Error fetching courses");
    }
});

// Get a specific course by ID (GET)
router.get("/courses/:id", async (req, res) => {
    try {
        const coursesCollection = await connectDB();
        const courseId = new ObjectId(req.params.id);
        const course = await coursesCollection.findOne({ _id: courseId });
        if (!course) return res.status(404).send("Course not found");
        res.status(200).send(course);
    } catch (err) {
        res.status(500).send("Error fetching course");
    }
});

// Update a course by ID (PUT)
router.put("/courses/:id", async (req, res) => {
    try {
        const coursesCollection = await connectDB();
        const courseId = new ObjectId(req.params.id);
        const { name } = req.body;
        const result = await coursesCollection.updateOne(
            { _id: courseId },
            { $set: { name } }
        );
        if (result.matchedCount === 0) return res.status(404).send("Course not found");
        res.status(200).send("Course updated successfully");
    } catch (err) {
        res.status(500).send("Error updating course");
    }
});

// Delete a course by ID (DELETE)
router.delete("/courses/:id", async (req, res) => {
    try {
        const coursesCollection = await connectDB();
        const courseId = new ObjectId(req.params.id);
        const result = await coursesCollection.deleteOne({ _id: courseId });
        if (result.deletedCount === 0) return res.status(404).send("Course not found");
        res.status(200).send("Course deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting course");
    }
});

module.exports = router;
