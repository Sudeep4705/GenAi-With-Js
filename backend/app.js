import dotenv from "dotenv";
import readline from "node:readline/promises";
dotenv.config();
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });


async function main() {
  const rl = readline.createInterface({input:process.stdin,output:process.stdout})
  const messages = [
      {
        role: "system",
        content: `You ara a smart persnol assistent who answers the asked questions.
                You have access to following tools:
                1. webSearch({query}:{query:string}) // Search the latest information and realtime data on the internet.
                Current datetime: ${new Date().toUTCString()}`,
      }
      // {
      //   role: "user", // bcz user giving the message
      //   content: `What is the wheather in bengaluru now `,
      // },
// better prompt by deepseek
      //     {
//       role: "system",
//       content: `You are a smart personal assistant that answers user questions clearly and concisely.
// **Formatting rules:**
// - Use **markdown** for readability.
// - Start with a short, direct answer (1-2 sentences).
// - Use **bold** for section titles (e.g., **Batsmen:**, **Bowlers:**).
// - Use bullet points (\`- item\`) for lists.
// - Keep each point short – one line per bullet where possible.
// - Do not write long paragraphs; break information into small chunks.
// - Avoid phrases like "Here is the answer:" or "Based on the information…". Just give the answer.

// **Tools available:**
// 1. webSearch({ query }) – use only for live or very recent information.

// **Current datetime:** ${new Date().toUTCString()}`,
//     },
    ]

  while(true){
    const question =  await rl.question('You: ')
    if(question==='bye'){
      break
    }
    messages.push({
      role:'user',
      content:question
    })
    while(true){
    const completions = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 0,
    messages:messages,
    tools: [
      {   
        type: "function",
        function: {
          name: "webSearch",
          description:
            "Search the latest information and realtime data on the internet",
          parameters: {
            // JSON Schema object
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to perform search on",
              },
            },
            required: ["query"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });


  // pushing the assistent message 1
 messages.push(completions.choices[0].message)

  const toolcalls = completions.choices[0].message.tool_calls

  if(!toolcalls){
    console.log(`Assistent:${completions.choices[0].message.content}`);
    break
  }

  for(const tool of toolcalls){
    // console.log("Tool",tool);
    const functionName = tool.function.name
    const functionParams =tool.function.arguments
    if("webSearch" === functionName){
       const toolResult =  await webSearch(JSON.parse(functionParams))
      //  console.log("toolresult:",toolResult);
       messages.push({
        tool_call_id:tool.id,
        role:'tool',
        name:functionName,
        content:toolResult
       })
    }
  }
  }
  }
  rl.close()
}

main();

async function webSearch({ query }){
  console.log("Calling web search");
const response = await tvly.search(query);
const finalresult = response.results.map((result)=>result.content).join('\n\n');
return finalresult
}

