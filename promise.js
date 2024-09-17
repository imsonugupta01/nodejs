async function fetchData() {
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{
        resolve("Promise Returned")
       },2000)
    })

    
}


async function getData() {
    try {
        const response= await fetchData();
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    
}
getData();