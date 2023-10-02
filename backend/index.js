const express = require('express')
const cors =require('cors')
require('./db/config')
const User = require('./db/User');
const products = require('./db/Product')
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm'
const app = express();
app.use(express.json())
app.use(cors());

app.post('/register',async(req,resp)=>{
    let user = new User(req.body)
    let result =await user.save()
   result = result.toObject();
   delete result.password
   if(result){
    Jwt.sign({user},jwtkey,{expiresIn:'2h'},(err, token)=>{
        if(err)
        {
            resp.send({result:"Something went wrong please try after some time..."})
        }
        resp.send({result,auth:token});
    })
}else{
    resp.send({result:"no user found"})
}
})

app.post('/login',async(req,resp)=>{
    console.log(req.body)

    if(req.body.email && req.body.password)
    {
        let user = await User.findOne(req.body).select('-password')
    
        if(user){
            Jwt.sign({user},jwtkey,{expiresIn:'2h'},(err, token)=>{
                if(err)
                {
                    resp.send({result:"Something went wrong please try after some time..."})
                }
                resp.send({user,auth:token});
            })
        }else{
            resp.send({result:"no user found"})
        }
    }else{
        resp.send({result:"no user found"})
    }
});

app.post('/add-product',async (req,resp)=>{
    let product = new products(req.body);
    let result = await product.save()
    resp.send(result);
});


app.get("/products",async(req,resp)=>{
    let data = await products.find();
    if(data.length > 0){
        resp.send(data)
    }else{
        resp.send({result:"No Products Faund"})
    }
})

app.delete("/product/:id", async(req,resp)=>{
    const result = await products.deleteOne({_id:req.params.id});
    resp.send(result)
    console.log(result);
});

app.get("/product/:id",async(req,resp)=>{
    let result = await products.findOne({_id:req.params.id});

    if(result){
        resp.send(result)
    }else{
        resp.send({result:'No record Found'})
    }
})

app.put("/product/:id",async(req,resp)=>{
    let result =await products.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result)
})

app.get("/search/:key",async(req,resp)=>{
    let result = await products.find({
        "$or":[
            {name:{$regex: req.params.key}},
            {price:{$regex: req.params.key}},
            {category:{$regex: req.params.key}},
            {company:{$regex: req.params.key}}
        ]
    })
    resp.send(result);
})
app.listen(4500);