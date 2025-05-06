import React, { useState } from "react";
import startupIdeas from "./data";
import { generateIdeaFromAI } from "./openai";
import { motion } from "framer-motion";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './App.css';

export default function App() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [secteur, setSecteur] = useState("IT");
  const [open, setOpen] = useState(false);

  // Générer une idée aléatoire depuis la liste secteur
  const generateRandomIdea = () => {
    const randomIndex = Math.floor(Math.random() * startupIdeas.length);
    setIdea(startupIdeas[randomIndex]);
  };

  // Ouvrir la popup secteur
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Fermer la popup secteur
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Appele l'API avec le secteur choisi
  const handleGenerateIdea = async () => {
    setLoading(true);
    const aiIdea = await generateIdeaFromAI(secteur); // traitement dans openai.js
    setIdea(aiIdea);
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <h1 className="text-3xl font-bold mb-4">💡 Générateur de Startup Idées</h1>
      
      <motion.p
        key={idea}
        className="text-lg mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
            Générer une idée aléatoire 🎲
          </Button>

          <Button
            onClick={handleOpenDialog}
            variant="contained"
            color="secondary"
            className="btn-2"
          >
            Générer une idée de startup avec l'IA 🤖
          </Button>
          
        </Stack>
        

      </div>

      {/*  choisir le secteur : */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Choisis un secteur</DialogTitle>
        <DialogContent>
          <Select
            value={secteur}
            onChange={(e) => setSecteur(e.target.value)}
            fullWidth
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Agriculture">Agriculture</MenuItem>
            <MenuItem value="Santé">Santé</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Éducation">Éducation</MenuItem>
            <MenuItem value="Commerce">Commerce</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Construction">Construction</MenuItem>
            <MenuItem value="Tourisme">Tourisme</MenuItem>
            <MenuItem value="Alimentation">Alimentation</MenuItem>
            <MenuItem value="Immobilier">Immobilier</MenuItem>
            <MenuItem value="Énergie">Énergie</MenuItem>
            <MenuItem value="Environnement">Environnement</MenuItem>
            <MenuItem value="Télécommunications">Télécommunications</MenuItem>
            <MenuItem value="Mode">Mode</MenuItem>
            <MenuItem value="Loisirs">Loisirs</MenuItem>
            <MenuItem value="Audiovisuel">Audiovisuel</MenuItem>
            <MenuItem value="Sécurité">Sécurité</MenuItem>
            <MenuItem value="Assurance">Assurance</MenuItem>
            <MenuItem value="Sport">Sport</MenuItem>
            <MenuItem value="Logistique">Logistique</MenuItem>
            <MenuItem value="Industrie">Industrie</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Droit">Droit</MenuItem>
            <MenuItem value="Culture">Culture</MenuItem>

          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleGenerateIdea} color="primary">Générer</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
