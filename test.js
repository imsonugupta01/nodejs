// console.log("HEllo world")
// setTimeout(()=>{
//   console.log("TimeOut 2 ms")  ;
// },2000)
// console.log("THis is node js server")
async function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = "Data fetched using Async/Await!";
        resolve(data);  // Resolving the promise
      }, 5000); // Simulating a 2-second delay
    });
  }
  
  async function getData() {
    try {
      const data = await fetchData();  // Pauses until the promise is resolved
      console.log(data);  // Outputs: "Data fetched using Async/Await!"
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  getData();

