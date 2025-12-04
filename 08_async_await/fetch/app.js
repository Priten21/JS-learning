// ====== using fetch ===========

// async function getAlllUsers(){
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data =  await response.json()
//     console.log(data);
    
//     } catch (error) {
//         console.log("E:",error);
        
//     }
// }

// getAlllUsers();


// ======fetch using than & catch ==========

// fetch('https://api.github.com/users/Priten21')
// .then((response) => {
//     return response.json()
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => console.log(error)
// )

// fetch() returns readable strem which need to be parsed to JSON while axios returns JSON data


//  ======== using axios ==============
// axios has multiple methods like GET , POST...




// let btn = document.querySelector("button");

// btn.addEventListener("click", async () => {
//     let fact  = await getFacts()
//     // console.log(fact);
//     let p = document.querySelector("#result");
//     p.innerText = fact ;
// })


// let url = "https://catfact.ninja/fact";


// async function getFacts() {
//     try{
//         let res = await axios.get(url);
//         return res.data.fact;
        
//     }catch(e) {
//         console.log("error -",e);
//         return "no fsct found";
        
//     }
// }


// ===========dog api==========

let btn = document.querySelector("button");
let url2 = "https://dog.ceo/api/breeds/image/random";


btn.addEventListener("click", async () => {
    let link = await getImage();
    let img = document.querySelector("#result");
    img.setAttribute("src", link);
    console.log(link);
    
})


async function getImage() {
    try{
        let res = await axios.get(url2);
        return res.data.message;
        
    }catch(e) {
        console.log("error -",e);
        return "no image found";
        
    }
}



// =========sending headers using axios ===========

api = "https://icanhazdadjoke.com";

async function getJokes() {
    try {
        const config = {
            headers: {Accept: "application/json"}
        };
        let res = await axios.get(api,config);
        console.log(res.data);
        
    } catch (error) {
        console.log(error);
    }
}