// ======== keyboard events ===========

// let inp = document.querySelector("input");

// inp.addEventListener("keydown",function (event) {
//     console.log("key was pressed");
//     console.log(event)
//     console.log("key = ",event.key)
//     console.log("code = ",event.code)
// })


// inp.addEventListener("keyup",function () {
//     console.log("key was released");
// })






// =========== FORM EVENTS ===============

// let form = document.querySelector("form");

// form.addEventListener("submit",function (event) {
//     event.preventDefault();
//     console.log("form submitted");
    
//     let inp = document.querySelector("input")
//     console.dir(inp);
//     console.log(inp.value);
// })


// ===========================

// let form = document.querySelector("form");

// form.addEventListener("submit",function (event) {
//     event.preventDefault();
//     console.dir( form);


//     // let user = document.querySelector("#user");
//     // let pass = document.querySelector("#password");

//     let user = this.elements[0];
//     let pass = this.elements[1];

//     console.log(user.value);
//     console.log(pass.value);

//     alert(`Hi ${user.value}, your password is set to ${pass.value}`)
    
// })







// ============ Change and Input events =============

let user = document.querySelector("#user");

user.addEventListener("change",function (event) {

    event.preventDefault();

    console.log("change event");
    console.log("final value = ",this.value);
    
});


user.addEventListener("input",function (event) {

    event.preventDefault();

    console.log("input event");
    console.log("final value = ",this.value);
    
}) 