import express from 'express';
import { dbQuery } from '../../db/firebirdConnect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = 'select v.vendas_id, v.clientes_id, c.cliente_nome, v.venda_data, v.venda_valor from vendas v join clientes c on c.clientes_id = v.clientes_id order by v.vendas_id desc';
    const result = await dbQuery(query, []);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/byid/:vendas_id', async (req, res) => {
  try {
    const vendasId = req.params.vendas_id;
    let query1 = 'select v.vendas_id, v.clientes_id, c.cliente_nome, v.venda_data, v.venda_valor from vendas v join clientes c on c.clientes_id = v.clientes_id where v.vendas_id = ?';
    let query2 = 'select i.produtos_id, p.produto_nome, i.item_venda_qtd, i.item_venda_preco, i.item_venda_custo from itens_vendas i join produtos p on p.produtos_id = i.produtos_id where i.vendas_id = ?';
    const venda = await dbQuery(query1, [vendasId]);
    const itens = await dbQuery(query2, [vendasId]);    
    if (venda.length !== 1) {
      return res.status(404).send('Venda não encontrada.');
    }
    const result = {
      ...venda[0],
      ITENS_VENDA: [...itens] 
    }; 
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/novo', async (req, res) => {
  try {
    const { clientes_id, venda_data, venda_valor, itens_venda } = req.body;

    const insertVendaQuery = 'INSERT INTO VENDAS (CLIENTES_ID, VENDA_DATA, VENDA_VALOR) VALUES (?, ?, ?) RETURNING VENDAS_ID';
    const insertVendaResult = await dbQuery(insertVendaQuery, [clientes_id, venda_data, venda_valor]);

    const vendas_id = insertVendaResult.VENDAS_ID;

    const insertItemQuery = 'INSERT INTO ITENS_VENDAS (VENDAS_ID, PRODUTOS_ID, ITEM_VENDA_QTD, ITEM_VENDA_PRECO, ITEM_VENDA_CUSTO) VALUES (?, ?, ?, ?, ?)';

    for (let item of itens_venda) {
      await dbQuery(insertItemQuery, [vendas_id, item.PRODUTOS_ID, item.ITEM_VENDA_QTD, item.ITEM_VENDA_PRECO, item.ITEM_VENDA_CUSTO]);
    }

    res.status(201).send('Venda cadastrada com sucesso');
  } catch (err) {
    res.status(500).send(err);
  }
});


router.put('/editar/:vendas_id', async (req, res) => {
  try {
    const vendasId = req.params.vendas_id;
    const { clientes_id, venda_data, venda_valor, itens_venda } = req.body;

    console.log(req.body);

    const updateVendaQuery = 'update vendas v set v.clientes_id = ?, v.venda_data = ?, v.venda_valor = ? where v.vendas_id = ?';
    
    await dbQuery(updateVendaQuery, [clientes_id, venda_data, venda_valor, vendasId]);

    const deleteItensQuery = 'delete from itens_vendas i where i.vendas_id = ?';

    await dbQuery(deleteItensQuery, [vendasId]);

    const insertItemQuery = 'INSERT INTO ITENS_VENDAS (VENDAS_ID, PRODUTOS_ID, ITEM_VENDA_QTD, ITEM_VENDA_PRECO, ITEM_VENDA_CUSTO) VALUES (?, ?, ?, ?, ?)';

    for (let item of itens_venda) {
      await dbQuery(insertItemQuery, [vendasId, item.PRODUTOS_ID, item.ITEM_VENDA_QTD, item.ITEM_VENDA_PRECO, item.ITEM_VENDA_CUSTO]);
    }

    res.status(200).send('Venda Alterada com Sucesso!');
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
