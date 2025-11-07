// function to sum of first n numbers

function sumOfnNumbers(n){
    let sum = 0;
    for(let i = 1;i <= n;i++){
        sum+=i;
    }
    return sum
}
console.log(sumOfnNumbers(20));

// function to concatenate all the strings inside an array

let arr = ["hello","This","Is","Concatenated","String"]

function concatenateStr(a) {
    let concatenatedstring = ""
    for(let i = 0;i <(a.length);i++){
        concatenatedstring += a[i];
    }
    return concatenatedstring;
}

console.log(concatenateStr(arr));


// nested functions
function outerFunction(){
    let x = 5;
    let y = 6;
    function innerFunction(){
        console.log(x);
    }
    innerFunction();
}

outerFunction();

// innerFunction(); cannot be called directly


// ****function Expressions***

let sum = function(a ,b){
    return(a + b)
}

console.log(sum(2,4));