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


// callbacks nestng -> callback hell



function saveToDB(data ,success, failure) {
    let internetSpeed = Math.floor(Math.random() * 10) + 1;
    if(internetSpeed > 4) {
       success();
    } else {
        failure();
    }
}


saveToDB(
    "Hello",
    ()=>{
        console.log("success:your data was saved");
        saveToDB(
            "World",
            ()=>{
            console.log("success 2 : your data was saved");
            saveToDB("Priten",()=>
                {
                   console.log("success 3 : your data was saved"); 
                },
                ()=>
                {
                    console.log("failure 3:weak connect. data not saved ");
                })
        },
        ()=>{
        console.log("failure 2:weak connect. data not saved ");
        }
        );
    },

    ()=>{
    console.log("failure 1 :weak connect. data not saved ");
    
    }
);