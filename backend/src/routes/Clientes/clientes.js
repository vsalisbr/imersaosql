import express from 'express';
import { dbQuery } from '../../db/firebirdConnect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = 'select c.clientes_id, c.cliente_nome from clientes c';
    const result = await dbQuery(query, []);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
