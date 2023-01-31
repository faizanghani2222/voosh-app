const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
require('dotenv').config()

const secretkey=process.env.SECRET_KEY
const app=express.Router()
const User=require("./user.model.js")

app.get("/", async(req,res)=>{
    try{
       let user=await User.find()
       res.send(user)
    }catch(e){
        res.status(401).send({message:"failed",error:e})
    }
})


app.post("/add-user", async(req,res)=>{
    try{
        const {password,phone_number,name}=req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        let user=new User({
            name,
            phone_number,
            password:hashedPassword
        })
        user=await user.save()
        res.send({message:"Signup Successful",user})
    }catch(e){
        res.status(401).send({message:"signup failed",error:e})
    }
})

app.post("/login-user", async(req,res)=>{
    try{
        if(req.body.token){
            const userverify=jwt.verify(token,secretkey)
            const user=await User.findOne({phone_number:userverify.phone_number})
            res.send({user, token:req.body.token })
        }else{
            const {phone_number,password}=req.body
            const user=await User.findOne({phone_number})
            const check = await bcrypt.compare(password, user.password);
        if(check){
            const token = jwt.sign(JSON.stringify(user), secretkey)
            res.send({user, token })
        }else{
            res.status(401).send({message:"Invalid credentials"})
        }
        }
    }catch(e){
        res.status(401).send({message:"Login failed try again!",error:e})
    }
})

app.post("/add-order",async(req,res)=>{
    try{
        const {token,sub_total,user_id, phone_number}=req.body
        const userverify=jwt.verify(token,secretkey)
       if(sub_total && user_id && phone_number){
        let user=await User.findOne({_id:user_id})
        user.orders.push({sub_total,
            user_id,
            phone_number})
        user=await user.save()
        res.send(user)
       }else{
        res.status(401).send({message:"Request failed try again",error:e})
       }
    }catch(e){
        res.status(401).send({message:"failed",error:e})
    }
})

app.get("/get-order", async(req,res)=>{
    try{
        const {user_id}=req.query
        const {token}=req.body
        const userverify=jwt.verify(token,secretkey)
        let user=await User.findOne({_id:user_id})
        res.send(user.orders)
    }catch(e){
        res.status(401).send({message:"Request failed try again!",error:e})
    }
})



module.exports=app