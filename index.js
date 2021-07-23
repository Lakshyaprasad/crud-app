const express = require("express");
require("./db")
var validator = require("email-validator");
const User = require("./models");
const app = express();

app.use(express.json());

app.get('/', (req,res) =>{
    return res.send("Welcome to summer school 2021");

})

app.post('/api/users', async (req,res) =>{
    try{const user = new User({
        name: req.body.name,
        email: req.body.email
    })
    if(validator.validate(req.body.email))
    {await user.save();
    //console.log(req.body.title);
    return res.status(201).send(user);}
     else{return res.send("invalid email");}}
    catch(e){return res.status(500).send(e)}
})

app.get('/api/users', async (req,res) =>{
    try{
        const users = await User.find();
        return res.status(200).send(users);
    } catch(e){
        return res.status(500).send(e);
    }
})

app.get('/api/users/:id', async (req,res) =>{
    const _id = req.params.id
    try{
        const users = await User.findById(_id);
        return res.status(200).send(users);
    } catch(e){
        return res.status(500).send(e);
    } 
})

app.patch('/api/users/:id',async(req,res) =>{
   _id = req.params.id;
   try{
       const users = await User.findByIdAndUpdate(_id,req.body)
       if(users){const userUp = await User.findById(_id);
           return res.status(200).send(userUp)}
       else{return res.status(400).send("update failed")}   
   }catch(e){return res.status(500).send(e)}
})

app.delete('/api/users/:id',async (req,res) =>{
    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(_id);
        if(user){return res.status(400).send("User Successfully deleted")}
        return res.send("user deletion failed")
    }catch(e){return res.status(500).send(e)}
})

app.listen(3000,()=>{console.log("Listening on port 3000")})
