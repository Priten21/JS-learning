const express = require("express");

const app = express();

const PORT = 8082;

// middle ware

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${req.method} request for ${req.url}`); 
    next();
})

// route specific middleware 
function aboutMiddleware(request,response,next){
    if(request.query.name == "priten"){
        next();
    } else {
        response.status(400).send("You are not allowed to view this page");
    }
}

// define a route for the home page
app.get("/",(request,response) =>{
    response.send("Hello World!");
})
// multiple Routes
app.get("/about",aboutMiddleware,(request, response) =>{
    response.send("About");
})
app.get("/contact",(request, response) =>{
    response.send("Contact")
})
app.post("/data",(request,response)=>{
    const body = request.body; //JSON : {'email': 'pritenthakkar@gmail.com'}
    response.send(body)
})
app.put("/data-edit",(request,response)=>{
    const{ body }= request; //JSON : {'email': 'pritenthakkar@gmail.com'}
    response.send(
        {
            message: "Seuccesfully put",
            body: body
        }
    )
})

app.listen(PORT, () => {
    console.log(`Listening on PORT : ${PORT}`);
})