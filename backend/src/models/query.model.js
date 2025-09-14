import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  // Who asked (optional if you add auth later)
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },

  // Input details
  type: { 
    type: String, 
    enum: ["text", "image", "voice"], 
    required: true 
  },
  textInput: { type: String },        // For text questions / STT output
  imageUrl: { type: String },         // If user uploaded leaf image
  audioInputUrl: { type: String },    // If farmer uploaded voice recording

  // AI response
  aiResponseEnglish: { type: String, required: true },
  aiResponseHindi: { type: String, required: true },
  aiAudioUrl: { type: String },       // TTS output file path

  // Meta
  crop: { type: String },             // optional: "Tomato", "Wheat"
  diseaseDetected: { type: String },  // optional: parsed disease name
  confidence: { type: Number },       // optional: AI confidence %

  // Audit
  createdAt: { type: Date, default: Date.now }
});

const queryModel = mongoose.model('query', querySchema);

export default queryModel;
