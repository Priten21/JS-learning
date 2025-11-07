function hello(){
    console.log("Hello!");
    
}

hello();

function printName() {
    console.log("Priten")
}

printName()

function printNumbers() {
    for(let i = 1; i<= 5 ; i++){
            console.log(i);
    }
}

printNumbers()

function isAdult() {
    let age = 19;
    if (age > 18){
        console.log("True")
    }
    else {
        console.log("False");
    }
}

isAdult();

//function to roll a dice and return a number(1-6)

function rollADice(){
    return (Math.floor(Math.random() * 6) + 1)
}

console.log(rollADice())