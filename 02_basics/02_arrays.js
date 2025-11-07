const marvel_heros = ["thor","IronMan","Spiderman"]
const dc_heros = ["batman", "superman", "Flash"]

// marvel_heros.push(dc_heros);
// console.log(marvel_heros)
// console.log(marvel_heros[3][2])

heros = marvel_heros.concat(dc_heros) // concat return a new array
console.log(heros);

const new_heros = [...marvel_heros,...dc_heros]
console.log(new_heros)

new_Array = [5,6,7,1,2,3,4,[5,4,6,7],[0,9,[5,2,3],[1,2]]]
flattened_array = new_Array.flat(Infinity) //it takes depth as a parameter
console.log(flattened_array);
console.log(flattened_array.sort())
console.log(new_Array.sort())

console.log(Array.isArray("Priten"))
console.log(Array.from("Priten"))


score1 = 100
score2 = 200
score3 = 300
console.log(Array.of(score1,score2,score3))