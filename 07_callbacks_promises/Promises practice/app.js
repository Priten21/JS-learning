// =========callback hell :==========


// h1 = document.querySelector("h1");

// function changecolor(color,delay, nextColorChange) {

//     setTimeout(()=>{
//         h1.style.color = color;
//         if(nextColorChange) nextColorChange();
//     },delay);
// }

// changecolor("red",1000, () => {
//     changecolor("orange", 1000, () => {
//         changecolor("green",1000, () => {
//             changecolor("pink",1000);
//         });
//     });
// })




//==========resolved using promise chaining ==============

h1 = document.querySelector("h1");

function changecolor(color, delay) {
    return new Promise((resolve,reject) => {
            setTimeout(()=>{
             h1.style.color = color;
            resolve("color changed");
        },delay);
    });
}

changecolor("red",2000)
.then(() =>{
     console.log("color changed to red ");
     return changecolor("green",3000)
})
.then(() => {
    console.log("color changed to green");
    return changecolor("orange",4000);
})
.then(() => {
    console.log("color changed to orange");
    return changecolor("lime",2000);
})
.then(() =>{
    console.log("color changed to lime");   
})
