import { GoogleGenAI } from "@google/genai";
import { getProjectData } from "./projectContextService.js";
import "dotenv/config";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateResponse = async (message) => {
  const projectData = await getProjectData("habitly.md");

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: message,
    config: {
      systemInstruction: `
        You are the AI assistant for the Habitly project.

        Use the following project documentation as your primary source of truth.

        Do not confuse this project with other products or companies named Habitly.

        If the documentation does not contain the answer, say that the information is not available in the project documentation.

        PROJECT DOCUMENTATION:
        ${projectData}
      `,
    },
  });

  return response.text;
};
