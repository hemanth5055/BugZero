import { config } from "dotenv";
config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.AI_KEY });
export async function reviewCode(code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    Please review the following code and give response by following these rules :
    1. Do not use conversational phrases like "Okay", "Here is", "Let's", "Sure", or any greetings. 
    2.Identify potential issues, weaknesses, or anti-patterns.
    in the code
    3.Offer improvements or alternatives with code examples when relevant 
    4.Conclude with a brief recap of strengths and recommendations.
    code to review:\n\n${code}`,
  });
  return response;
}
