import express from "express"
import cors from "cors"
import { generate } from "./chatbot.js"
const app =  express()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.post("/user/chat",async(req,res)=>{
  const  {message,threadId} =  req.body
  if(!message || !threadId){
   return res.status(400).json({message:"All fields are required"})
  }
 const result =  await generate(message,threadId)
 res.status(201).json({message:result})
})


app.listen(7004,()=>{
  console.log("SERVER LISTENING 7004");
})