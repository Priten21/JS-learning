const promiseOne = new Promise((resolve,reject) => {
    // DO an async task 
    // DB calls,  cryptography
    setTimeout(function(){
        console.log("Async task is complete");
        resolve()
    },1000)
});

promiseOne.then(() => {
    console.log("Promise Consumed");
    
})




new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("Async task 2");
        resolve();
    }, 2000);
})
.then(() => {
    console.log("Async 2 Resolved");

})




const promisethree = new Promise((resolve,reject) => {
    setTimeout(() => {
            resolve({username: "Hello",email: "hello@gmail.com"})
    },3000)
})

promisethree.then(function(user){
    console.log(user);
})




// ====== with then , cacth & finally ======


const promiseFour = new Promise ((resolve,reject) => {
    setTimeout(() => {
        let error = false ;
    if(!error) {
         resolve({username: "World",email: "world@gmail.com"})
    } else {
        reject ('ERROR : Somehting Went Wrong ')
    }
    }, 4000);
    
})

promiseFour.
then((user) => {
    console.log(user);
    return user.username
})
.then((username) => {
    console.log(username);
})
.catch((error) => {
    console.log(error);
})
.finally(() => {
    console.log("The finally staement executes in any case");
    
})


// ======== Using Async Await ========

const promiseFive = new Promise((resolve,reject) => {
    setTimeout(() => {
        let error = false ;
    if(!error) {
         resolve({username: "Hii",email: "Hiii@gmail.com"})
    } else {
        reject ('ERROR : JS Went Wrong ')
    }
    }, 5000);
});

async function consumePromiseFive() {
    try {
            const response = await promiseFive 
    console.log(response);
    } catch (error) {
        console.log(error);
        
    }
    
}

consumePromiseFive();

// =========Promise.all, Promsie.allSettled , Promise.race


//Promise.all


const myPromises = [promiseOne,promisethree,promiseFour,promiseFive]

Promise.all(myPromises)
    .then((res) => console.log(res))
    .catch((err) => console.log("Error!"));


//Promise.allSettled


Promise.allSettled(myPromises)
    .then((res) => console.log(res))
    .catch((err) => console.log("Error!"));
   

//Promise.any


Promise.any(myPromises) // executes when any of the promises are fullfiled

    .then((res) => console.log(res))
    .catch((err) => console.log("Error!"));



Promise.race(myPromises)
    .then((res) => console.log(res))
    .catch((err) => console.log("Error!"));


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