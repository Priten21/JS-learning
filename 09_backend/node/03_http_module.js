// const http = require("http");

// // create a server
// const server = http.createServer((req,res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Hello World");
// })

// const PORT = 8080;
// server.listen(PORT,() => {
//     console.log(`Server is running on PORT: ${PORT}`);
    
// });



// ===================== GET and POST requests =====================

const http = require("http");

server = http.createServer((request,response) => {
    if(request.method === "POST" && request.url === "/save") {
        let body = "";
        request.on("data",(chunk) => {
            body+= chunk;
        })
        request.on("end",() => {
            response.statusCode = 200;
            response.setHeader("Content-Type","text/plain");

            response.end(`Here is the user data: ${body}`);
        })
    } else if (request.method === "GET" && request.url ==="/dashboard"){
        response.statusCode = 200;
        response.setHeader("Content-Type","text/plain");
        response.end("Welcome to the user dashboard");
    } else {
        response.statusCode = 400;
        response.end("Page not Found");
    }
})

PORT = 8083;

server.listen(PORT,() => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
    
})