
import { GoogleGenAI, Type } from "@google/genai";
import { Song, SearchQuery } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "Judul lagu yang dicari.",
    },
    artist: {
      type: Type.STRING,
      description: "Nama artis atau band dari lagu tersebut.",
    },
    chords: {
      type: Type.STRING,
      description: "Lirik lagu lengkap dengan notasi chord gitar di atas baris lirik yang relevan. Chord harus ditempatkan dengan tepat.",
    },
  },
  required: ["title", "artist", "chords"],
};


export const getSongChords = async (query: SearchQuery): Promise<Song> => {
  const prompt = `Berikan chord gitar untuk lagu "${query.title}" oleh "${query.artist}". Format output harus berupa objek JSON yang valid dan sesuai dengan skema yang diberikan. Pastikan chordnya akurat dan ditempatkan dengan benar di atas lirik.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    const songData: Song = JSON.parse(jsonString);
    return songData;
  } catch (error) {
    console.error("Error fetching song chords:", error);
    throw new Error("Gagal mengambil chord lagu. Model AI mungkin tidak dapat menemukan lagu tersebut atau terjadi kesalahan jaringan. Silakan coba lagi.");
  }
};
