import React, { useState } from "react";
import  startupIdeas  from "./data";
import { generateIdeaFromAI } from "./openai";
import { motion } from "framer-motion";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function App() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRandomIdea = () => {
    const randomIndex = Math.floor(Math.random() * startupIdeas.length);
    console.log(startupIdeas[randomIndex]);
    console.log(startupIdeas); 
    setIdea(startupIdeas[randomIndex]);
  };

  const generateAIdea = async () => {
    setLoading(true);
    const aiIdea = await generateIdeaFromAI();
    setIdea(aiIdea);
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <h1 className="text-3xl font-bold mb-4">💡 Générateur de Startup Idées</h1>
      
      <motion.p 
        key={idea} 
        className="text-lg mt-4"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}>
        {loading ? "Génération en cours... ⏳" : idea || "Clique sur un bouton pour générer une idée !"}
      </motion.p>

      <div className="flex gap-4 mt-4">
        
      <Stack spacing={2} direction="row">
        <Button
          onClick={generateRandomIdea} 
          variant="contained" 
          color="primary"
          className="px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-700"
        >
          Génerer une idée aléatoire 🎲
        </Button>

        <Button
          onClick={generateAIdea} 
          variant="contained" 
          color="secondary"
          className="px-4 py-2 transition duration-300 ease-in-out hover:bg-green-700"
        >
          Génerer une idée avec l'IA 🤖
        </Button>
      </Stack>
      </div>
    </div>
  );
}


