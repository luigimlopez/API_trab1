const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/', (req, res) => {
  res.json(db.clientes);
});

router.get('/:id', (req, res) => {
  const cliente = db.clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) return res.status(404).send('Cliente não encontrado');
  res.json(cliente);
});

router.post('/', (req, res) => {
  const cliente = {
    id: db.clientes.length + 1,
    nome: req.body.nome,
    nascim: req.body.nascim,
    cidade_id: req.body.cidade_id
  };
  db.clientes.push(cliente);
  res.status(201).json(cliente);
});

router.put('/:id', (req, res) => {
  const cliente = db.clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) return res.status(404).send('Cliente não encontrado');

  cliente.nome = req.body.nome;
  cliente.nascim = req.body.nascim;
  cliente.cidade_id = req.body.cidade_id;

  res.json(cliente);
});

router.delete('/:id', (req, res) => {
  const index = db.clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Cliente não encontrado');

  db.clientes.splice(index, 1);
  res.status(204).send();
});

module.exports = router;