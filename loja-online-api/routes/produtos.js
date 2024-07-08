const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/', (req, res) => {
  res.json(db.produtos);
});

router.get('/:id', (req, res) => {
  const produto = db.produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).send('Produto não encontrado');
  res.json(produto);
});

router.post('/', (req, res) => {
  const produto = {
    id: db.produtos.length + 1,
    nome: req.body.nome,
    preco: req.body.preco,
    quantidade: req.body.quantidade,
    categoria_id: req.body.categoria_id
  };
  db.produtos.push(produto);
  res.status(201).json(produto);
});

router.put('/:id', (req, res) => {
  const produto = db.produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).send('Produto não encontrado');
  
  produto.nome = req.body.nome;
  produto.preco = req.body.preco;
  produto.quantidade = req.body.quantidade;
  produto.categoria_id = req.body.categoria_id;

  res.json(produto);
});

router.delete('/:id', (req, res) => {
  const index = db.produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Produto não encontrado');
  
  db.produtos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;