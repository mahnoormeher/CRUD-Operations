const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel= require("./models/Users")
require('dotenv').config();


const app=express();
const port= process.env.PORT || 3001;

app.use(cors({
  origin: 'https://crud-operations-frontened.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())


mongoose.connect(process.env.MONGO_URL)

  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));


app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users =>res.json(users))
    .catch(err =>res.json(err))
})

app.get('/getUser/:id' , (req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users =>res.json(users))
    .catch(err =>res.json(err))
})

app.put('/updateUser/:id',(req,res)=>{
      const id = req.params.id;
      UserModel.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age})
       .then(users =>res.json(users))
    .catch(err =>res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
      const id = req.params.id;
      UserModel.findByIdAndDelete({_id:id}) 
       .then(res =>res.json(res))
    .catch(err =>res.json(err))
})

app.post('/createUser',(req,res)=>{
    UserModel.create(req.body)
    .then(users=> res.json(users))
    .catch(err => res.json(err))
})



app.listen(port,()=>{
    console.log("Server is running")
})