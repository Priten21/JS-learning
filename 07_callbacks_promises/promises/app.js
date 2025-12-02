function saveToDB(data) {
    return new Promise((resolve,reject) =>{
        let internetSpeed = Math.floor(Math.random() * 10) + 1;
        if(internetSpeed > 4) {
        resolve("success : data was saved");
        } else {
        reject("failure : week connection")
    }
    });
}

// saveToDB("Hello world")
// .then(() =>{
//     console.log("promise was resolved");
//     console.log((request));
// })
// .catch(() =>{
//     console.log("promise was rejected");
//     console.log((request));
    
// })



// =========== Promise Chaining ================

saveToDB("Hello world")
    .then(() =>{
        console.log("data 1 was saved "); 
        return saveToDB("This is statement 2")
    })
    .then(()=>{
        console.log("data 2 was saved");
        return saveToDB("this is statement 3")    
    })
    .then(()=> {
        console.log("data three was saved");
    }
    )
    .catch(() =>{
        console.log("promise was rejected");
        
    })