import { GoogleGenAI, Type } from "@google/genai";
import { Category, Suggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a high-energy, creative assistant named "HochuTo" helping a user who is bored and screaming "I WANT SOMETHING".
Your goal is to provide specific, actionable, and interesting suggestions based on the selected category.
The language of the response MUST be Russian.
Be witty, slightly chaotic, and fun.
`;

export const generateIdea = async (category: Category): Promise<Suggestion> => {
  let prompt = "";
  
  switch (category) {
    case Category.FOOD:
      prompt = "Suggest a specific, delicious, and slightly unusual dish or snack the user should eat or cook right now. Not just 'pizza', but 'Pizza with pear and gorgonzola'.";
      break;
    case Category.WATCH:
      prompt = "Suggest a specific movie, series episode, or YouTube genre that is engaging and prevents boredom. Give a specific title.";
      break;
    case Category.DO:
      prompt = "Suggest a physical activity or small task that is rewarding. Could be organizing a specific drawer, a specific workout move, or a creative mini-project.";
      break;
    case Category.LEARN:
      prompt = "Suggest a weird or fascinating topic to read about on Wikipedia or watch a video explaining. Something niche.";
      break;
    case Category.CHAOS:
      prompt = "TOTAL CHAOS MODE. Suggest something random, weird, funny, or adventurous. It can be anything from 'Howl at the moon' to 'Build a pillow fort'. Be unpredictable.";
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy, short title of the thing to do/eat/watch in Russian." },
            description: { type: Type.STRING, description: "A 1-2 sentence exciting description of why they should do this in Russian." },
            emoji: { type: Type.STRING, description: "A single representative emoji." },
            actionItem: { type: Type.STRING, description: "The immediate first step (e.g., 'Open the fridge', 'Search YouTube for...') in Russian." },
            reason: { type: Type.STRING, description: "A funny or convincing reason why this solves their boredom in Russian." },
            colorHex: { type: Type.STRING, description: "A hex color code that matches the vibe of the suggestion." }
          },
          required: ["title", "description", "emoji", "actionItem", "reason", "colorHex"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Suggestion;
    }
    
    throw new Error("No text returned from Gemini");

  } catch (error) {
    console.error("Gemini generation failed:", error);
    // Fallback in case of API error
    return {
      title: "Выпей воды",
      description: "Кажется, интернет сломался, но ты, возможно, просто хочешь пить.",
      emoji: "💧",
      actionItem: "Сходи на кухню",
      reason: "Гидратация — это жизнь.",
      colorHex: "#3b82f6"
    };
  }
};
