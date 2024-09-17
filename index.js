const express = require("express");
const courseRouter = require("./routes/courses");
require("dotenv").config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, your URL is working.");
});

// Use course router for "/c" path
app.use("/c", courseRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
