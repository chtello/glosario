const express = require('express');
const router = express.Router();

let glossary = {}; // Aquí almacenaremos el glosario en memoria

// Obtener todas las palabras
router.get('/', (req, res) => {
  res.json(glossary);
});

// Agregar una nueva palabra
router.post('/', (req, res) => {
  const { wordEs } = req.body;
  const letter = wordEs[0].toUpperCase();
  if (!glossary[letter]) {
    glossary[letter] = [];
  }
  glossary[letter].push({ wordEs });
  glossary[letter].sort((a, b) => a.wordEs.localeCompare(b.wordEs));
  res.status(201).json(glossary[letter]);
});

// Actualizar una palabra
router.put('/:letter/:wordEs', (req, res) => {
  const { letter, wordEs } = req.params;
  const { newWordEs } = req.body;
  const wordIndex = glossary[letter].findIndex(word => word.wordEs === wordEs);
  if (wordIndex !== -1) {
    glossary[letter][wordIndex] = { wordEs: newWordEs };
    glossary[letter].sort((a, b) => a.wordEs.localeCompare(b.wordEs));
    res.json(glossary[letter]);
  } else {
    res.status(404).json({ error: 'Word not found' });
  }
});

// Eliminar una palabra
router.delete('/:letter/:wordEs', (req, res) => {
  const { letter, wordEs } = req.params;
  glossary[letter] = glossary[letter].filter(word => word.wordEs !== wordEs);
  res.json(glossary[letter]);
});

module.exports = router;
