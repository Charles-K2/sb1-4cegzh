const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: '192.168.15.200',
  database: 'prime',
  password: 'postgres',
  port: 5432,
});

app.post('/api/product', async (req, res) => {
  const { barcode } = req.body;
  
  try {
    const result = await pool.query(`
      SELECT DISTINCT 
        cadp_codigo, cadp_descricao, cade_prvenda,
        cade_estoque1, cade_dtauditoria, pecd_qtde, 
        pecd_protocolo, pecc_protocolo, pecc_dtmvto 
      FROM cadprod
      INNER JOIN cadprodemp ON cade_codigo = cadp_codigo
      LEFT JOIN pedidoscd ON cadp_codigo = pecd_codproduto AND pecd_situacao='P'
      LEFT JOIN pedidoscc ON cadp_codigo = pecd_codproduto AND pecc_situacao = 'P'
      WHERE cadp_codigobarra = $1 AND cade_ativo = 'S'
    `, [barcode]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Produto não encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});