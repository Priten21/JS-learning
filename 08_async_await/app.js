// // async functions returns promise by default.
// async function greet() {
//     // throw "some random error";
//     return "hello";
// }

// greet()
// .then((result) => {
//     console.log("promise was resolved");
//     console.log("result was :",result);
    
    
// })
// .catch((error) => {
//     console.log("promise was rejected :",error);
    
// })


// // async arrow function

// let demo = async ()=> {
//     return 5;
// }


// ========= await =================

// await : pauses the execution of its surrounding async function until the promise is settled.


// function getNum() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let num = Math.floor(Math.random() * 10) + 1;
//             console.log(num);
//             resolve ();
            
//         },1000);
//     });
// }

// async function demo() {
//     await getNum();
//     await getNum();
//     await getNum();
//     await getNum();
//     getNum();
// }


// ============= color change using await ===============

h1 = document.querySelector("h1");

function changeColor(color,delay){
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            let num = Math.floor(Math.random() * 5) + 1;
            if(num > 3){
                reject("promise rejected!")
            }
            h1.style.color = color;
            console.log(`color changed to ${color}!`);
            resolve("color changed!");
        },delay);
    });
}

async function demo (){


    try{   
        await changeColor("red",1000);
        await changeColor("orange",1000);
        await changeColor("green",1000);
        await changeColor("blue",1000);
        } catch(err) {
            console.log("error caught");
            console.log(err);
        }


    let a = 5;
    console.log(a);
    console.log("new number :",a +3 );
    
    
}