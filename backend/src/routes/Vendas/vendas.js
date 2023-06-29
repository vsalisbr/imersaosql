import express from 'express';
import { dbQuery } from '../../db/firebirdConnect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = 'select v.vendas_id, v.clientes_id, c.cliente_nome, v.venda_data, v.venda_valor from vendas v join clientes c on c.clientes_id = v.clientes_id';
    const result = await dbQuery(query, []);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:vendas_id', async (req, res) => {
  try {
    const vendasId = req.params.vendas_id;
    let query = 'select v.vendas_id, v.clientes_id, c.cliente_nome, v.venda_data, v.venda_valor from vendas v join clientes c on c.clientes_id = v.clientes_id where v.vendas_id = ?';
    const result = await dbQuery(query, [vendasId]);    
    if (result.length === 0) {
      return res.status(404).send('Venda não encontrada.');
    }
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/novo', async (req, res) => {
  try {
    const { produto_nome, produto_preco_venda, produto_preco_custo } = req.body;
    const query = 'INSERT INTO produtos (produto_nome, produto_preco_venda, produto_preco_custo) VALUES (?, ?, ?)';
    await dbQuery(query, [produto_nome, produto_preco_venda, produto_preco_custo]);
    res.status(201).send('Produto cadastrado com sucesso');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/editar', async (req, res) => {
  try {
    const { produto_nome, produto_preco_venda, produto_preco_custo, produtos_id} = req.body;
    const query = 'UPDATE produtos SET produto_nome = ?, produto_preco_venda = ?, produto_preco_custo = ? WHERE produtos_id = ?';
    await dbQuery(query, [produto_nome, produto_preco_venda, produto_preco_custo, produtos_id]);
    res.status(200).send('Produto atualizado com sucesso');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/deletar/:vendas_id', async (req, res) => {
  try {
    const vendasId = req.params.vendas_id;
    const query = 'DELETE FROM vendas v WHERE v.vendas_id = ?';
    await dbQuery(query, [vendasId]);
    res.status(200).json({ message: 'Venda deletada com sucesso' });
  } catch (err) {
    res.status(500).send(err);
  }
});


export default router;
