function printName(name){
    console.log(name)
}

printName("Priten");

function printInfo(name , age){
    console.log(`${name}'s age is ${age}`);  
}

printInfo("Priten" , 20);
printInfo("Parth");
printInfo(null,15);


function sum(a , b){
    return (a + b)

    console.log("This will never execute")
}

console.log(sum(3,4));
console.log(sum(sum(4,5),6))
// function to print table of the given number

function printTable(n){
        for(let i = n; i<=n*10;i+=n){
            console.log(i)
        }
}

printTable(3);