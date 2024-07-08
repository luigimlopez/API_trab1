const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/', (req, res) => {
  res.json(db.categorias);
});

router.get('/:id', (req, res) => {
  const categoria = db.categorias.find(c => c.id === parseInt(req.params.id));
  if (!categoria) return res.status(404).send('Categoria não encontrada');
  res.json(categoria);
});

router.post('/', (req, res) => {
  const categoria = {
    id: db.categorias.length + 1,
    nome: req.body.nome
  };
  db.categorias.push(categoria);
  res.status(201).json(categoria);
});

router.put('/:id', (req, res) => {
  const categoria = db.categorias.find(c => c.id === parseInt(req.params.id));
  if (!categoria) return res.status(404).send('Categoria não encontrada');

  categoria.nome = req.body.nome;

  res.json(categoria);
});

router.delete('/:id', (req, res) => {
  const index = db.categorias.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Categoria não encontrada');

  db.categorias.splice(index, 1);
  res.status(204).send();
});

module.exports = router;