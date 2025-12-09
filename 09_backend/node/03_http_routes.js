// const http = require("http");

// //create my server 

// const server = http.createServer((request,response) => {
//     response.statusCode = 200;
//     response.setHeader("Content-Type", 'text/plain');


//     if(request.url === "/"){
//         response.end("Welcome to our home page");
//     }else if(request.url === "/about"){
//         response.end("This page is for about");
//     }else{

//         response.statusCode = 404 // resource not found
//         response.end("Page not Found")
//     }
// });


// const PORT = 8081 ;

// server.listen(PORT,() => {
//     console.log(`Server running on port : ${PORT}`);
// })




// ================Query Parameters=========================


const http =require("http");
const url = require("url");

//create my server 
const server = http.createServer((request,response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", 'text/plain');
 
    
    const parsedUrl = url.parse(request.url,true); // second paramter : parse QuesryStrings

    // about?v=7239dj2&H=hello&value=ilovepizza
    // pathname => /about .... query string => v=7239dj2&H=hello&value=ilovepizza

    const pathname = parsedUrl.pathname;

    const query =parsedUrl.query;
    // {
    //     "v": "7239dj2",
    //     "H": "hello",
    //     "value": "ilovepizza"
    // }

    if(pathname === "/"){
        response.end( `Welcome to our home page. Your Query values are: H=${query.H}, value=${query.value}, v=${query.v}`);

    }else if(pathname === "/about") {
         response.end( `This page is for about. Your Query values are: H=${query.H}, value=${query.value}, v=${query.v}`);

    }else{
        response.statusCode = 404 // resource not found
        response.end("Page not Found")
    }
})


const PORT = 8082;

server.listen(PORT,() => {
    console.log(`Server running on port : ${PORT}`);
})


