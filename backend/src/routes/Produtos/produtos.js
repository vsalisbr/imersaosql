import express from 'express';
import { dbQuery } from '../../db/firebirdConnect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = 'select p.produtos_id, p.produto_nome, p.produto_preco_venda, p.produto_preco_custo from produtos p';
    const result = await dbQuery(query, []);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:produtos_id', async (req, res) => {
  try {
    const produtosId = req.params.produtos_id;
    let query = 'select p.produtos_id, p.produto_nome, p.produto_preco_venda, p.produto_preco_custo from produtos p where p.produtos_id = ?';
    const result = await dbQuery(query, [produtosId]);    
    if (result.length === 0) {
      return res.status(404).send('Produto não encontrado.');
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

router.delete('/deletar/:produtos_id', async (req, res) => {
  try {
    const produtosId = req.params.produtos_id;
    const query = 'DELETE FROM produtos p WHERE p.produtos_id = ?';
    await dbQuery(query, [produtosId]);
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).send(err);
  }
});


export default router;
