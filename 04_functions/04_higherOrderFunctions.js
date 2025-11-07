// higher order functions : 
// A function that does one or both :
// takes one or multiple functions as arguments 
// returns a function

//takes one or multiple functions as arguments:

function multipleGreet(func, n){
    for(let i = 1; i <= n; i++){
        func();
    }
}

function greet(){
    console.log("hello");
}

multipleGreet(greet,10)


// returns a function 

function oddEvenFactory(request){
    if(request == 'odd')
        {return function (n){
         console.log(!(n%2 == 0));
        }
}
    else if(request == 'even'){
        return function (n){
        console.log((n%2 == 0));
    }
    }
    else {
        return "Invalid function"
    }
}

let request = "odd";
let func = oddEvenFactory(request);
console.log(func)