import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/clientes', routes.clientes);
app.use('/produtos', routes.produtos);
app.use('/vendas', routes.vendas);

app.get('/', (req, res) => {
  res.send('Estou funcionando!!!');
});

app.listen(8090, () => {
  console.log('Servidor online na porta 8090');
});
