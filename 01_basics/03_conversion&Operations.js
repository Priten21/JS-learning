let score = "33"

console.log(typeof score);

let valueInNumber = Number(score)
console.log(typeof score);

let wickets = "5ab"
let valueInWickets = Number(wickets)
console.log(valueInWickets); // returns NaN

let substitutes = null
let valueInSubstitues = Number(substitutes)
console.log(valueInSubstitues); // returns 0

let team = undefined
let valueInTeam = Number(team)
console.log(valueInTeam); // returns NaN


// for Boolean it it returns 1 => true , 0=> false
// empty String to Boolean => false , Non-empty string => true


// ******** Operations ********
let value = 3
let negValue = -value
console.log(negValue)

console.log(3+3); 
console.log(3-3);
console.log(3*3);
console.log(2**3);
console.log(2/3);
console.log(2%3);

let str1 = "hello"
let str2 = "Priten"
let str3 = str1 + str2
console.log(str3);


console.log('1' + 2);
console.log(1 + '2');
console.log('1' + '2');
console.log('1' + 2 + 2);
console.log(1 + 2 + '2');

console.log(+true)
console.log(+"")

let gameCounter = 100
gameCounter++;
console.log(gameCounter);

console.log(++gameCounter);
console.log(gameCounter++);
console.log(gameCounter);


// ***** Comparision Operators ******
 console.log(2 > 1);
 console.log(2 >= 1);
 console.log(2< 1);
 console.log(2<= 1);
 console.log(2 == 1);
 console.log(2 != 1);

console.log("2" > 1);
console.log("02" > 1);

console.log(null > 0);
console.log(null >= 0);
console.log(null == 0);
console.log(null <= 0);
console.log(null < 0);


// === 
console.log("2" == 2)
console.log("2" === 2)