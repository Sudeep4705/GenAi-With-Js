import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
console.log(Groq);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

try {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: "When was iPhone 16 launched?"
      }
    ],
 tools: [
  {
    type: "function",
    function: {
      name: "webSearch",
      description: "Search the web",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query"
          }
        },
        required: ["query"],
        additionalProperties: false
      },
      strict: true
    }
  }
]
  });

  console.log(JSON.stringify(response, null, 2));
} catch (err) {
  console.error(JSON.stringify(err, null, 2));
}