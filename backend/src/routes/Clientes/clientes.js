import express from 'express';
import { dbQuery } from '../../db/firebirdConnect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = 'select c.clientes_id, c.cliente_nome, c.cliente_ativo from clientes c';
    const result = await dbQuery(query, []);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/byid/:clientes_id', async (req, res) => {
  try {
    const clientesId = req.params.clientes_id;
    let query = 'SELECT cliente_nome, cliente_ativo FROM clientes WHERE clientes_id = ?';
    const result = await dbQuery(query, [clientesId]);    
    if (result.length === 0) {
      return res.status(404).send('Cliente não encontrado.');
    }
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/pesquisar', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const uppercaseSearchTerm = searchTerm.toUpperCase();
    const query = `SELECT c.clientes_id, c.cliente_nome, c.cliente_ativo FROM clientes c WHERE (UPPER(c.cliente_nome) LIKE '%${uppercaseSearchTerm}%')`;
    const result = await dbQuery(query, []);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post('/novo', async (req, res) => {
  try {
    const { cliente_nome, cliente_ativo } = req.body;
    const query = 'INSERT INTO clientes (cliente_nome, cliente_ativo) VALUES (?, ?)';
    await dbQuery(query, [cliente_nome, cliente_ativo]);
    res.status(201).send('Cliente cadastrado com sucesso');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/editar', async (req, res) => {
  try {
    const { clientes_id, cliente_nome, cliente_ativo } = req.body;
    const query = 'UPDATE clientes SET cliente_nome = ?, cliente_ativo = ? WHERE clientes_id = ?';
    await dbQuery(query, [cliente_nome, cliente_ativo, clientes_id]);
    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/deletar/:clientes_id', async (req, res) => {
  try {
    const clientesId = req.params.clientes_id;
    const query = 'DELETE FROM clientes WHERE clientes_id = ?';
    await dbQuery(query, [clientesId]);
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
