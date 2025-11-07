// setInterval(function,timeout)

let id = setInterval(() => {
    console.log("hello")
},2000);

console.log(id)

setTimeout(()=>{
    clearInterval(id)
},10000);
    
