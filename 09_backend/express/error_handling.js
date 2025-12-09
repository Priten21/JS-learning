const express = require("express");
const app = express();

app.use(express.json())

async function getProducts() {
    // throw new Error('DB ERROR!')
    return[{id: '1', name: 'product 1'}];
}

app.get('/',(req,res) => {
    res.json({message: 'success'})
})

app.get('/api/products',async(req, res, next)=>{
    const products =await getProducts();
    res.json(products);
    // next(error); // optional for express 5.
});

async function createUser(name, email, password ){
    // db call
    const error = new Error("Duplicate entry!!");
    error.code ='12345';
    throw error;
    return true;
}

app.post("/api/register" , async(req,res) =>{
    const {name, email, password } = req.body;
    try{
    await createUser(name, email, password)
    }catch(err){
        if (err.code === '12345'){
            const error = new Error("Email is already taken!");
            error.status = 400;      
            throw error;
        }

        throw err;
    }

    res.json({message: 'success'});
});

app.use((error, req, res, next) => {
    //logger
    //check if production
    const isProd =process.env.NODE_ENV === 'production';

    res.status(error.status).json({message: isProd ? 'Something went Wrong!!!' : error.message});
    return;
});

const PORT =  4600;
app.listen(PORT,() =>{console.log(`listening on port: ${PORT}`)} 
)


// set env to production powershell command:(by default false)
// $env:NODE_ENV="production"; node .\error_handling.js



