import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Chatbot Context Prompt
const SYSTEM_PROMPT = `
Eres el asistente virtual oficial del Santuario Ecológico "Pampa Ñusta" en Pisac, Valle Sagrado de los Incas (3,347 msnm).
Tu trabajo es responder a las preguntas de los usuarios sobre el santuario, sus instalaciones (Ecoaldea, Banco Genético Wachuma, Maloka Willka Kancha, Tour 360), opciones de hospedaje, donaciones y videollamadas.
Sé cordial, usa términos andinos respetuosos (como "Allillanchu", "Ayni", "Wachuma") cuando sea apropiado, pero mantén las respuestas concisas (máximo 3-4 líneas).
Nunca prometas servicios o costos que no conozcas; en su lugar, sugiere al usuario que agende una "videollamada gratuita" para más información.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Convert history to Gemini format if needed, but for simplicity we just use generateContent
    // In a real robust implementation, we'd manage a chat session.
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: '¡Entendido! Estoy listo para ayudar.' }] },
        // Append actual user message
        { role: 'user', parts: [{ text: message }] }
      ],
    });
    
    res.json({ reply: response.text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Error al procesar la respuesta de IA.' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json([]);
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = req.body;
    let bookings = [];
    try {
      const data = await fs.readFile(DB_PATH, 'utf-8');
      bookings = JSON.parse(data);
    } catch (e) {
      // Ignore if file doesn't exist
    }
    bookings.push(newBooking);
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
    } catch (writeError) {
      console.warn('Vercel read-only filesystem: No se pudo guardar la reserva en el archivo local.', writeError);
    }
    
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Error al guardar la reserva.' });
  }
});

const PORT = process.env.PORT || 3001;

// Solo escuchar el puerto si NO estamos en Vercel (entorno de producción serverless)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Pampa Ñusta Server running on port ${PORT}`);
  });
}

// Exportar la app para que Vercel la convierta en Serverless Function
export default app;
