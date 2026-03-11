// backend/src/controllers/caronasController.js
const db              = require('../../config/database');
const { calcularValorSugerido } = require('../utils/precificacao');

// ──────────────────────────────────────────
// POST /api/caronas — Criar carona
// ──────────────────────────────────────────
const criar = async (req, res, next) => {
  try {
    const { origem, destino, horario_partida, vagas_totais, valor_cobrado, distancia_km, observacoes } = req.body;
    const motorista_id = req.usuario.id;

    const valor_sugerido = distancia_km ? calcularValorSugerido(distancia_km) : null;

    const resultado = await db.query(
      `INSERT INTO caronas
         (motorista_id, origem, destino, horario_partida, vagas_totais, vagas_disponiveis,
          valor_sugerido, valor_cobrado, distancia_km, observacoes)
       VALUES ($1,$2,$3,$4,$5,$5,$6,$7,$8,$9)
       RETURNING *`,
      [motorista_id, origem, destino, horario_partida, vagas_totais,
       valor_sugerido, valor_cobrado, distancia_km, observacoes]
    );

    res.status(201).json({ success: true, data: resultado.rows[0] });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────────────────
// GET /api/caronas — Listar caronas
// ──────────────────────────────────────────
const listar = async (req, res, next) => {
  try {
    const { origem, destino, data } = req.query;

    let query = `
      SELECT c.*, u.nome AS motorista_nome, u.foto_url AS motorista_foto,
             u.avaliacao_media AS motorista_avaliacao
      FROM caronas c
      JOIN usuarios u ON u.id = c.motorista_id
      WHERE c.status = 'ativa' AND c.vagas_disponiveis > 0
        AND c.horario_partida > NOW()
    `;
    const params = [];
    let   idx    = 1;

    if (origem) {
      query += ` AND LOWER(c.origem) LIKE LOWER($${idx++})`;
      params.push(`%${origem}%`);
    }
    if (destino) {
      query += ` AND LOWER(c.destino) LIKE LOWER($${idx++})`;
      params.push(`%${destino}%`);
    }
    if (data) {
      query += ` AND DATE(c.horario_partida) = $${idx++}`;
      params.push(data);
    }

    query += ' ORDER BY c.horario_partida ASC';

    const resultado = await db.query(query, params);
    res.json({ success: true, data: resultado.rows });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────────────────
// GET /api/caronas/:id — Detalhes
// ──────────────────────────────────────────
const buscarPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultado = await db.query(
      `SELECT c.*, u.nome AS motorista_nome, u.foto_url AS motorista_foto,
              u.avaliacao_media AS motorista_avaliacao, u.telefone AS motorista_telefone
       FROM caronas c
       JOIN usuarios u ON u.id = c.motorista_id
       WHERE c.id = $1`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Carona não encontrada' });
    }

    res.json({ success: true, data: resultado.rows[0] });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────────────────
// POST /api/caronas/:id/solicitar
// ──────────────────────────────────────────
const solicitar = async (req, res, next) => {
  try {
    const { id: carona_id } = req.params;
    const passageiro_id = req.usuario.id;

    // Verificar carona disponível
    const carona = await db.query(
      'SELECT * FROM caronas WHERE id = $1 AND status = $2 AND vagas_disponiveis > 0',
      [carona_id, 'ativa']
    );

    if (carona.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Carona indisponível' });
    }

    // Não pode solicitar carona própria
    if (carona.rows[0].motorista_id === passageiro_id) {
      return res.status(400).json({ success: false, error: 'Você não pode solicitar sua própria carona' });
    }

    const resultado = await db.query(
      `INSERT INTO solicitacoes_carona (carona_id, passageiro_id)
       VALUES ($1, $2) RETURNING *`,
      [carona_id, passageiro_id]
    );

    res.status(201).json({ success: true, data: resultado.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, error: 'Você já solicitou esta carona' });
    }
    next(err);
  }
};

// ──────────────────────────────────────────
// PATCH /api/solicitacoes/:id — Aceitar/Recusar
// ──────────────────────────────────────────
const responderSolicitacao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'aceita' ou 'recusada'
    const motorista_id = req.usuario.id;

    // Confirmar que o motorista é dono da carona
    const solicitacao = await db.query(
      `SELECT s.*, c.motorista_id
       FROM solicitacoes_carona s
       JOIN caronas c ON c.id = s.carona_id
       WHERE s.id = $1`,
      [id]
    );

    if (solicitacao.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Solicitação não encontrada' });
    }

    if (solicitacao.rows[0].motorista_id !== motorista_id) {
      return res.status(403).json({ success: false, error: 'Não autorizado' });
    }

    const resultado = await db.query(
      `UPDATE solicitacoes_carona
       SET status = $1, atualizado_em = NOW()
       WHERE id = $2 RETURNING *`,
      [status, id]
    );

    res.json({ success: true, data: resultado.rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = { criar, listar, buscarPorId, solicitar, responderSolicitacao };
