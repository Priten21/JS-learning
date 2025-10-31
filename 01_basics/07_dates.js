//Dates

let myDate =  new Date()
console.log(myDate);
console.log(myDate.toString())
console.log(myDate.toDateString())
console.log(myDate.getDay())
console.log(myDate.getDate())
console.log(myDate.getFullYear())
console.log(myDate.getHours())
console.log(myDate.getUTCDate())
console.log(typeof(myDate)) // utc is universal :IST = UTC + 5:30


let myCreatedDate = new Date(2025 , 0 , 23) // in JS moths start form
console.log(myCreatedDate.toDateString()) 

let newCreatedDate = new Date(2025, 9 , 30 ,13 , 50)
console.log(newCreatedDate.toLocaleString());
console.log(newCreatedDate.toString());

let createdDate = new Date("2025-10-30")
console.log(createdDate.toDateString())

let mdyDate = new Date("10-30-2025")
console.log(mdyDate.toDateString())

myTimeStamp = Date.now()
console.log(myTimeStamp);

console.log(newCreatedDate.getTime());

// to convert in seconds 
console.log(Math.floor(Date.now()/1000));

newDate = new Date()
console.log(newDate.toLocaleString('default',{
    weekday : "long"
}))