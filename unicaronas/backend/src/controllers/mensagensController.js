// backend/src/controllers/mensagensController.js
const db = require('../../config/database');

// POST /api/mensagens — Enviar mensagem
const enviar = async (req, res, next) => {
  try {
    const { solicitacao_id, conteudo } = req.body;
    const remetente_id = req.usuario.id;

    // Verificar que o usuário faz parte desta conversa
    const solicitacao = await db.query(
      `SELECT s.*, c.motorista_id
       FROM solicitacoes_carona s
       JOIN caronas c ON c.id = s.carona_id
       WHERE s.id = $1`,
      [solicitacao_id]
    );

    if (solicitacao.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Conversa não encontrada' });
    }

    const { passageiro_id, motorista_id } = solicitacao.rows[0];
    if (remetente_id !== passageiro_id && remetente_id !== motorista_id) {
      return res.status(403).json({ success: false, error: 'Não autorizado' });
    }

    const resultado = await db.query(
      `INSERT INTO mensagens_chat (solicitacao_id, remetente_id, conteudo)
       VALUES ($1, $2, $3) RETURNING *`,
      [solicitacao_id, remetente_id, conteudo]
    );

    res.status(201).json({ success: true, data: resultado.rows[0] });
  } catch (err) {
    next(err);
  }
};

// GET /api/mensagens/:solicitacao_id — Histórico do chat
const listar = async (req, res, next) => {
  try {
    const { solicitacao_id } = req.params;
    const usuario_id = req.usuario.id;

    // Verificar acesso
    const solicitacao = await db.query(
      `SELECT s.passageiro_id, c.motorista_id
       FROM solicitacoes_carona s
       JOIN caronas c ON c.id = s.carona_id
       WHERE s.id = $1`,
      [solicitacao_id]
    );

    if (solicitacao.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Conversa não encontrada' });
    }

    const { passageiro_id, motorista_id } = solicitacao.rows[0];
    if (usuario_id !== passageiro_id && usuario_id !== motorista_id) {
      return res.status(403).json({ success: false, error: 'Não autorizado' });
    }

    const mensagens = await db.query(
      `SELECT m.*, u.nome AS remetente_nome, u.foto_url AS remetente_foto
       FROM mensagens_chat m
       JOIN usuarios u ON u.id = m.remetente_id
       WHERE m.solicitacao_id = $1
       ORDER BY m.enviado_em ASC`,
      [solicitacao_id]
    );

    // Marcar como lidas
    await db.query(
      `UPDATE mensagens_chat SET lida = true
       WHERE solicitacao_id = $1 AND remetente_id != $2 AND lida = false`,
      [solicitacao_id, usuario_id]
    );

    res.json({ success: true, data: mensagens.rows });
  } catch (err) {
    next(err);
  }
};

const contagemNaoLidas = async (req, res, next) => {
  try {
    const usuario_id = req.usuario.id;
    const { rows } = await db.query(
      `SELECT COUNT(*) as total 
       FROM mensagens_chat m
       JOIN solicitacoes_carona s ON s.id = m.solicitacao_id
       JOIN caronas c ON c.id = s.carona_id
       WHERE (s.passageiro_id = $1 OR c.motorista_id = $1)
         AND m.remetente_id != $1 
         AND m.lida = false`,
      [usuario_id]
    );
    res.json({ success: true, count: parseInt(rows[0].total) });
  } catch (err) {
    next(err);
  }
};

module.exports = { enviar, listar, contagemNaoLidas };
