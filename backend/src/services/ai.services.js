import { GoogleGenAI } from "@google/genai";
import speech from "@google-cloud/speech";
import gTTS from "gtts";

async function processTextQuestion(text) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ text }]
  });
  return result.candidates[0].content.parts[0].text;
}

async function processImageQuestion(imageUrl) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { inlineData: { mimeType: "image/jpeg", data: base64 } },
      { text: "Analyze this plant leaf for disease and remedies." }
    ]
  });
  return result.candidates[0].content.parts[0].text;
}

async function processVoiceQuestion(audioFile) {
  const client = new speech.SpeechClient();
  const [response] = await client.recognize({
    audio: { content: audioFile.toString("base64") },
    config: { languageCode: "hi-IN" } // Hindi input
  });

  const text = response.results.map(r => r.alternatives[0].transcript).join(" ");
  return await processTextQuestion(text);
}

async function mainHandler({ text, imageUrl, audioFile }) {
  if (text) return await processTextQuestion(text);
  if (imageUrl) return await processImageQuestion(imageUrl);
  if (audioFile) return await processVoiceQuestion(audioFile);
  throw new Error("No valid input provided");
}

export default mainHandler;
