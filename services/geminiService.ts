import { GoogleGenAI } from "@google/genai";
import { GeminiDiagramResponse } from "../types";

export const generateDiagramFromPrompt = async (prompt: string): Promise<GeminiDiagramResponse | null> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemPrompt = `
    You are an expert diagram architect. 
    Your task is to generate a valid JSON structure for a diagram based on the user's description.
    The diagram can be a Flowchart, UML Class Diagram, or State Diagram.

    You must return a JSON object with two arrays: 'nodes' and 'edges'.

    Node Schema:
    {
      "id": "string (unique)",
      "type": "one of ['default', 'input', 'output', 'decision', 'umlClass']",
      "position": { "x": number, "y": number },
      "data": { 
        "label": "string",
        "attributes": ["string"] (optional, for umlClass only),
        "methods": ["string"] (optional, for umlClass only)
      }
    }

    Edge Schema:
    {
      "id": "string (unique)",
      "source": "string (source node id)",
      "target": "string (target node id)",
      "label": "string (optional)"
    }

    Layout Rules:
    - Space nodes out generously so they don't overlap. 
    - Use 'input' type for Start nodes.
    - Use 'output' type for End nodes.
    - Use 'decision' type for conditional logic/diamonds.
    - Use 'umlClass' for class definitions.
    - Use 'default' for standard process steps.
    - Assign reasonable X/Y coordinates to create a readable top-to-bottom or left-to-right flow.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return null;
    
    const data = JSON.parse(text) as GeminiDiagramResponse;
    return data;
  } catch (error) {
    console.error("Failed to generate diagram:", error);
    throw error;
  }
};
