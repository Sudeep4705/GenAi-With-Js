import dotenv from "dotenv";
import readline from "node:readline/promises";
import express from "express"
import cors from "cors"
const app =  express()
dotenv.config();
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });



// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.post("/user/query/:msg",(req,res)=>{
  let query =  req.params.msg
})

// async function main() {
//   const rl = readline.createInterface({input:process.stdin,output:process.stdout})
//   const messages = [
//       {
//         role: "system",
//         content: `You ara a smart persnol assistent who answers the asked questions.
//                 You have access to following tools:
//                 1. webSearch({query}:{query:string}) // Search the latest information and realtime data on the internet.
//                 Current datetime: ${new Date().toUTCString()}`,
//       }
//       // {
//       //   role: "user", // bcz user giving the message
//       //   content: `What is the wheather in bengaluru now `,
//       // },
//     ]

//   while(true){
//     const question =  await rl.question('You: ')
//     if(question==='bye'){
//       break
//     }
//     messages.push({
//       role:'user',
//       content:question
//     })
//     while(true){
//     const completions = await groq.chat.completions.create({
//     model: "meta-llama/llama-4-scout-17b-16e-instruct",
//     temperature: 0,
//     messages:messages,
//     tools: [
//       {   
//         type: "function",
//         function: {
//           name: "webSearch",
//           description:
//             "Search the latest information and realtime data on the internet",
//           parameters: {
//             // JSON Schema object
//             type: "object",
//             properties: {
//               query: {
//                 type: "string",
//                 description: "The search query to perform search on",
//               },
//             },
//             required: ["query"],
//           },
//         },
//       },
//     ],
//     tool_choice: "auto",
//   });


//   // pushing the assistent message 1
//  messages.push(completions.choices[0].message)

//   const toolcalls = completions.choices[0].message.tool_calls

//   if(!toolcalls){
//     console.log(`Assistent:${completions.choices[0].message.content}`);
//     break
//   }

//   for(const tool of toolcalls){
//     // console.log("Tool",tool);
//     const functionName = tool.function.name
//     const functionParams =tool.function.arguments
//     if("webSearch" === functionName){
//        const toolResult =  await webSearch(JSON.parse(functionParams))
//       //  console.log("toolresult:",toolResult);
//        messages.push({
//         tool_call_id:tool.id,
//         role:'tool',
//         name:functionName,
//         content:toolResult
//        })
//     }
//   }
//   }
//   }
//   rl.close()
// }

// main();

// async function webSearch({ query }){
//   console.log("Calling web search");
// const response = await tvly.search(query);
// const finalresult = response.results.map((result)=>result.content).join('\n\n');
// return finalresult
// }

app.listen(7004,()=>{
  console.log("SERVER LISTENING 7004");
})