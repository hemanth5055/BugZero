import { config } from "dotenv";
config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.AI_KEY });
export async function reviewCode(code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Please review the following code and provide a markdown-formatted response with analysis and suggestions:\n\n${code}`,
  });
  return response;
}
