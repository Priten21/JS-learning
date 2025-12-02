let btn = document.querySelector("button");
console.dir(btn)


// btn.onclick = function(){
//     // console.log("button was clicked ")
//     alert("button was clicked")
// }


function sayHello() {
    alert("hello");
}

function sayName() {
    console.log('I am a button)');
    
}

// btn.onclick = sayHello;

// ========== onmouseenter property ==============

// let  btns = document.querySelectorAll("button");
// for(btn of btns) {
//     btn.onclick  = sayHello;
//     btn.onmouseenter = function () {
//         console.log("you entered the button");
        
//     }
// }


// ============= Event Listeners ===========

// element.addEventListener(event, callback)

let  btns = document.querySelectorAll("button");
for(btn of btns) {
    // btn.addEventListener('click', sayHello);
    // btn.addEventListener('click', sayName);
    btn.addEventListener('dblclick', function() {
        console.log('double-clicked');
        
    })
}


let p = document.querySelector("p")
p.addEventListener('click', function() {
    console.log("para was clicked");
    
})

let box = document.querySelector(".box")
 box.addEventListener('mouseenter', function () {
    console.log("mouse inside box");
    
 })