import axios from "axios";
// pour sécuriser notre clé API
const API_KEY =process.env.REACT_APP_OPENAI_API_KEY;

const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
// A RETENIR : ce modèle is the one -> gemini-1.5-flash
export const generateIdeaFromAI = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: "Donne-moi une idée de startup innovante et originale."
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Réponse de l'API Gemini :", response.data); 

    if (response.data && response.data.candidates) {
      return response.data.candidates[0]?.content?.parts[0]?.text || "Réponse vide de l'API";
    } else {
      console.error("Réponse invalide reçue de l'API");
      return "Impossible de générer une idée, désolé !";
    }
  } catch (error) {
    console.error("Erreur avec Google Gemini :", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    return "Impossible de générer une idée, désolé !";
  }
};
