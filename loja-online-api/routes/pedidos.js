const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/', (req, res) => {
  res.json(db.pedidos);
});

router.get('/:id', (req, res) => {
  const pedido = db.pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) return res.status(404).send('Pedido não encontrado');
  res.json(pedido);
});

router.post('/', (req, res) => {
  const pedido = {
    id: db.pedidos.length + 1,
    horario: req.body.horario,
    endereco: req.body.endereco,
    cliente_id: req.body.cliente_id
  };
  db.pedidos.push(pedido);
  res.status(201).json(pedido);
});

router.put('/:id', (req, res) => {
  const pedido = db.pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) return res.status(404).send('Pedido não encontrado');

  pedido.horario = req.body.horario;
  pedido.endereco = req.body.endereco;
  pedido.cliente_id = req.body.cliente_id;

  res.json(pedido);
});

router.delete('/:id', (req, res) => {
  const index = db.pedidos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Pedido não encontrado');

  db.pedidos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;