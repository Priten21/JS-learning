// arrow function which return square of a number n

getSquare = (n) =>(n * n)

// function that prints hello world 5 times at the interval of 2s each

id = setInterval(function(){
    console.log("hello world");
    
},2000)

setTimeout(function(){
    clearInterval(id)
},12000)