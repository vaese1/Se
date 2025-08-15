
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates three distinct and detailed video prompts based on a user's idea.
 * @param idea The user's input idea for a video.
 * @returns A promise that resolves to an array of three prompt strings.
 */
export const generateVideoPrompts = async (idea: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a world-class creative director specializing in crafting prompts for text-to-video AI models. 
      Based on the user's idea, generate 3 distinct and highly detailed video prompts. 
      Each prompt should be a single, cohesive paragraph that is vivid, imaginative, and provides specific details about the scene, characters, action, mood, and camera style.
      
      User's Idea: "${idea}"
      
      Return the prompts in a structured JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompts: {
              type: Type.ARRAY,
              description: "An array of three detailed video prompt strings.",
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ["prompts"],
        },
        temperature: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (parsedResponse && Array.isArray(parsedResponse.prompts)) {
      return parsedResponse.prompts;
    } else {
      throw new Error("Invalid response structure from Gemini API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate video prompts from Gemini API.");
  }
};
