const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const produtosRoutes = require('./routes/produtos');
const clientesRoutes = require('./routes/clientes');
const pedidosRoutes = require('./routes/pedidos');
const categoriasRoutes = require('./routes/categorias');

app.use('/produtos', produtosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/categorias', categoriasRoutes);

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
