// console.log("Start");

// setTimeout(function() {
//     console.log("Delayed log after 2000 milliseconds");
// }, 2000);

// console.log("End");


// function outerFunction() {
//     let outerVariable = "I am from the outer function!";
  
//     function innerFunction() {
//       console.log(outerVariable); // Can access the outer function's variable
//     }
  
//     return innerFunction;
//   }
  
//   const closure = outerFunction(); // Call outerFunction and store the inner function
//   closure(); // Outputs: "I am from the outer function!"
  


// async function fetchData() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const data = "Data fetched using Async/Await!";
//         resolve(data);  // Resolving the promise
//       }, 2000); // Simulating a 2-second delay
//     });
//   }
  
//   async function getData() {
//     try {
//       const data = await fetchData();  // Pauses until the promise is resolved
//       console.log(data);  // Outputs: "Data fetched using Async/Await!"
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
  
//   getData();
//   console.log("sonu")
//   setTimeout(()=>{
//     console.log("TimeOut Called after 2000 ms")
//   },2000)
//   console.log("Kumar")

// process.stdout.write("sonu ");
// setTimeout(() => {
//   console.log("\nTimeOut Called after 2000 ms");
// }, 2000);
// process.stdout.write("Kumar");


// const person =  {name: 'Alice', age: 25, city: 'New York'} ;
// for (let key in person) {
//   console.log(person[key]);
//   // Output: 
//   // name: Alice
//   // age: 25
//   // city: New York
// }


// const str = "Hello";
// for (let char of str) {
//   console.log(char);  // Output: H, e, l, l, o
// }



// const numbers=[1,2,3,4,5]
// const newNumbers=numbers.map((num)=>num*2);
// console.log(newNumbers)
// const arr = [1, 2, 3, 4];
// const filtered = arr.filter((element) => element > 2);
// console.log(filtered);  // Output: [10, 20]



// const { MongoClient } = require('mongodb');

// // Connection URL to the MongoDB server
// const url = 'mongodb://127.0.0.1:27017';  // default MongoDB URL
// const client = new MongoClient(url);

// // Database name
// const dbName = 'mydatabase';

// async function main() {
//   try {
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log("Connected successfully to MongoDB");

//     // Select the database
//     const db = client.db(dbName);

//     // Select a collection within the database
//     const collection = db.collection('mycollection');

//     // Insert a document into the collection
//     const insertResult = await collection.insertOne({ name: 'John Doe', age: 30 });
//     console.log('Inserted document:', insertResult.insertedId);

//     // Query the collection to find the document
//     const findResult = await collection.findOne({ name: 'John Doe' });
//     console.log('Found document:', findResult);

//   } catch (err) {
//     console.error(err);
//   } finally {
//     // Close the connection
//     await client.close();
//   }
// }

// main().catch(console.error);




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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
