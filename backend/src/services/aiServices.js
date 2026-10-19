import { GoogleGenAI } from "@google/genai";
import { getProjectData } from "./projectContextService.js";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const retryableStatuses = [429, 500, 502, 503];

export const generateResponse = async (project, message) => {
  const projectData = await getProjectData(project);

  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: message,
        config: {
          systemInstruction: `
        You are the AI assistant for the Habitly project.

        Use the following project documentation as your primary source of truth.

        Do not confuse this project with other products or companies named Habitly.

        If the documentation contain the answer gave the answer from the documentaion, and if the information is not available in the documentation then 
  
        gave the answer from your knowledge. Always try to gave the answer to the user.
        PROJECT DOCUMENTATION:
            ${projectData}
          `,
        },
      });

      return response.text;
    } catch (error) {
      console.error(`Gemini attempt ${attempt} failed:`, error);

      const isRetryable = retryableStatuses.includes(error.status);

      if (!isRetryable) {
        throw error;
      }

      if (attempt === maxAttempts) {
        throw error;
      }

      const waitTime = attempt * 1000;

      console.log(`Retrying Gemini in ${waitTime / 1000} seconds...`);

      await delay(waitTime);
    }
  }
};
