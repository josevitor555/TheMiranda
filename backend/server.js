import dotenv from "dotenv";
dotenv.config();

// Express
import express from "express";
const app = express();
app.use(express.json());

// Cors origin
import cors from "cors";
app.use(cors());

// Import Gemini SDK
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Import chat history (mocked or persistent storage)
import chatHistory from "./chatHistory.js";

// ElevenLabs SDK
import { ElevenLabsClient } from "elevenlabs";
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// Route for Gemini API
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt, model } = req.body;
    console.log(`🔍 Request received: prompt="${prompt}", model="${model}"`);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const selectedModel = model;
    const generativeModel = genAI.getGenerativeModel({ model: selectedModel });

    const generationConfig = {
      temperature: 1.5, // Higher temperature for more creative responses
      topP: 0.9,
      topK: 50, // Diversifies word choices for more interesting responses
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const userPrompt = { role: "user", parts: [{ text: prompt }] };
    const fullConversation = [...chatHistory, userPrompt];
    const result = await generativeModel.generateContent({
      contents: fullConversation,
      generationConfig,
    });

    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Empty Response.";
    console.log(`💬 Model "${selectedModel}" responded: ${responseText}`);

    res.status(200).json({
      response: responseText,
    });
  } catch (error) {
    console.error(`❌ Error in Gemini API: ${error}`);
    res.status(500).json({
      error: "Error connecting to Gemini",
    });
  }
});

// Utility function to convert stream to buffer
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

// Route for ElevenLabs audio generation
app.post("/api/generate-audio", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required!" });

    const audioStream = await elevenlabs.generate({
      voice: "Alice",
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true,
      },
      // text_processing_options: {
      //   speed: 1.2
      // }
    });

    const audioBuffer = await streamToBuffer(audioStream);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", 'inline; filename="audio.mp3"');
    res.status(200).send(audioBuffer);
  } catch (err) {
    console.error("Error generating audio:", err.message);
    res.status(500).json({ error: "Error generating audio" });
  }
});

// Placeholder for Stripe API integration
// app.post("/api/stripe", async (req, res) => {
//   // Stripe logic here
// });

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
