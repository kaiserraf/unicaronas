// backend/src/controllers/avaliacoesController.js
const db = require('../../config/database');
// chama pool (já configurado) para esse doc

// POST /api/avaliacoes — Registrar avaliação
const avaliar = async (req, res, next) => {
  try {
    const { solicitacao_id, avaliado_id, nota, comentario } = req.body; // desestrutura dados
    /*
     usuario mostra:
      qual foi a carona
      quem está sendo avaliado
      comentario
    */
    const avaliador_id = req.usuario.id; // garante que o avaliador é alguem autenticado

    // Verificar que a carona foi concluída e o avaliador faz parte
    const solicitacao = await db.query(
      `SELECT s.passageiro_id, c.motorista_id, c.status AS carona_status
       FROM solicitacoes_carona s
       JOIN caronas c ON c.id = s.carona_id
       WHERE s.id = $1 AND s.status = 'aceita'`, // $1 -> parametro que impede SQL injection
      [solicitacao_id]
    );

    if (solicitacao.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Carona não encontrada ou não concluída' });
      // se não for encontrado nada retorna erro 400 (return garante que o código pare aqui)
    }

    // extrai id do passageiro e motorista da query
    const { passageiro_id, motorista_id } = solicitacao.rows[0];

    // Verificar que avaliador é motorista ou passageiro
    if (avaliador_id !== passageiro_id && avaliador_id !== motorista_id) {
      return res.status(403).json({ success: false, error: 'Não autorizado' });
    }

    // Verificar que avaliado é alguem que participou das caronas
    if (avaliado_id === passageiro_id || avaliado_id === motorista_id) {
      if (avaliado_id === avaliador_id) { // verifica se alguem está tentando se auto-avaliar
        return res.status(400).json({ success: false, error: 'Você não pode se auto-avaliar' });
      }
    } else {
      return res.status(400).json({ success: false, error: 'Usuário avaliado não participa desta carona' });
    }

    const resultado = await db.query(
      `INSERT INTO avaliacoes (solicitacao_id, avaliador_id, avaliado_id, nota, comentario)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [solicitacao_id, avaliador_id, avaliado_id, nota, comentario]
    );

    res.status(201).json({ success: true, data: resultado.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, error: 'Você já avaliou esta carona' });
    }
    next(err);
  }
};

// GET /api/avaliacoes/:usuario_id — Avaliações de um usuário
const listarPorUsuario = async (req, res, next) => {
  try {
    const { usuario_id } = req.params;

    const resultado = await db.query(
      `SELECT a.*, u.nome AS avaliador_nome, u.foto_url AS avaliador_foto,
              c.origem, c.destino, c.horario_partida
       FROM avaliacoes a
       JOIN usuarios u ON u.id = a.avaliador_id
       JOIN solicitacoes_carona s ON s.id = a.solicitacao_id
       JOIN caronas c ON c.id = s.carona_id
       WHERE a.avaliado_id = $1
       ORDER BY a.criado_em DESC`,
      [usuario_id]
    );

    res.json({ success: true, data: resultado.rows });
  } catch (err) {
    next(err);
  }
};

module.exports = { avaliar, listarPorUsuario };


// inserir no código:
// 'avaliacao_media' nunca atualizada🔴 Crítica
// Nota sem validação de range🔴 Crítica
// Campos obrigatórios sem validação🟠 Alta
// Carona não verifica se já aconteceu🟠 Alta
// Lógica de validação do avaliado confusa🟠 Alta
// Sem transação atômica no banco🟠 Alta
// 'listarPorUsuario' não verifica se usuário existe🟡 Média
// Sem paginação na listagem🟡 Média
// Sem distinção motorista/passageiro🟡 Média
// Comentário sem limite de tamanho🟢 Baixa