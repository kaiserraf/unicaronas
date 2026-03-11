// backend/src/controllers/pagamentosController.js
const db                   = require('../../config/database');
const { calcularTaxa }     = require('../utils/precificacao');

// POST /api/pagamentos — Processar pagamento
const processar = async (req, res, next) => {
  try {
    const { solicitacao_id, metodo } = req.body;
    const passageiro_id = req.usuario.id;

    // Buscar solicitação aceita
    const solicitacao = await db.query(
      `SELECT s.*, c.valor_cobrado, c.motorista_id
       FROM solicitacoes_carona s
       JOIN caronas c ON c.id = s.carona_id
       WHERE s.id = $1 AND s.passageiro_id = $2 AND s.status = 'aceita'`,
      [solicitacao_id, passageiro_id]
    );

    if (solicitacao.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Solicitação não encontrada ou não aceita' });
    }

    // Verificar se já existe pagamento
    const pagamentoExist = await db.query(
      'SELECT id FROM pagamentos WHERE solicitacao_id = $1',
      [solicitacao_id]
    );
    if (pagamentoExist.rows.length > 0) {
      return res.status(409).json({ success: false, error: 'Pagamento já realizado para esta carona' });
    }

    const valorTotal = parseFloat(solicitacao.rows[0].valor_cobrado);
    const { taxa, repasse } = calcularTaxa(valorTotal);

    // Aqui integraria com Stripe/PagSeguro — simulado
    const referenciaExterna = `UC-${Date.now()}`;

    const resultado = await db.query(
      `INSERT INTO pagamentos
         (solicitacao_id, valor_total, taxa_plataforma, valor_motorista, status, metodo, referencia_externa, pago_em)
       VALUES ($1, $2, $3, $4, 'pago', $5, $6, NOW())
       RETURNING *`,
      [solicitacao_id, valorTotal, taxa, repasse, metodo, referenciaExterna]
    );

    res.status(201).json({
      success: true,
      data: resultado.rows[0],
      resumo: {
        valor_total:      valorTotal,
        taxa_plataforma:  taxa,
        repasse_motorista: repasse,
        referencia:       referenciaExterna
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/pagamentos/historico — Histórico financeiro do usuário
const historico = async (req, res, next) => {
  try {
    const usuario_id = req.usuario.id;

    const resultado = await db.query(
      `SELECT p.*, c.origem, c.destino, c.horario_partida,
              CASE
                WHEN c.motorista_id = $1 THEN 'motorista'
                ELSE 'passageiro'
              END AS papel
       FROM pagamentos p
       JOIN solicitacoes_carona s ON s.id = p.solicitacao_id
       JOIN caronas c ON c.id = s.carona_id
       WHERE s.passageiro_id = $1 OR c.motorista_id = $1
       ORDER BY p.criado_em DESC`,
      [usuario_id]
    );

    res.json({ success: true, data: resultado.rows });
  } catch (err) {
    next(err);
  }
};

module.exports = { processar, historico };
