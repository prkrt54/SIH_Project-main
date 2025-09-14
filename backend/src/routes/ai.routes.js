import express from 'express';
import mainHandler from '../services/ai.services.js';

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { text } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const audioFile = req.file && req.file.mimetype.startsWith("audio/") 
      ? req.file.buffer 
      : null;

    const answer = await mainHandler({ text, imageUrl, audioFile });
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: "AI service failed" });
  }
});

export default router;

