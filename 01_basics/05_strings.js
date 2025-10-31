const name = "Priten"
const repoCount = 10
console.log(`Hello my name is ${name} and my repo count is  ${repoCount}`);

const gameName= new String('Ten-Z');

console.log(gameName[0]);
console.log(gameName.__proto__);


console.log(gameName.length);
console.log(gameName.toUpperCase());
console.log(gameName.charAt(2));
console.log(gameName.indexOf('T'));

const newString = gameName.substring(0,2)
console.log(newString);


const anotherString = gameName.slice(-4,3)
console.log(anotherString);


const newString2 = '    hello    ';
console.log(newString2);
console.log(newString2.trim());


const url = "https://workwpriten.com/scale%20Tech"

console.log(url.replace('%20',''));

console.log(url.includes('with'))

console.log(gameName.split('-'))

//method chaining 
console.log(name.trim().toUpperCase());


