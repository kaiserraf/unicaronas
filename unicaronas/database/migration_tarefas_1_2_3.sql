-- Migration para Tarefas 1, 2 e 3

-- =============================================================
-- TAREFA 1: Veículos
-- =============================================================
CREATE TABLE IF NOT EXISTS veiculos (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  cor VARCHAR(50) NOT NULL,
  placa VARCHAR(20) NOT NULL,
  foto_url VARCHAR(255),
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE caronas ADD COLUMN IF NOT EXISTS veiculo_id INT REFERENCES veiculos(id) ON DELETE SET NULL;

-- =============================================================
-- TAREFA 2: Ponto de Encontro
-- =============================================================
ALTER TABLE caronas ADD COLUMN IF NOT EXISTS ponto_encontro VARCHAR(150);
ALTER TABLE caronas ADD COLUMN IF NOT EXISTS ponto_encontro_detalhes TEXT;

-- Atualizar registros existentes de caronas para ter um ponto_encontro padrão (opcional, mas evita erros)
UPDATE caronas SET ponto_encontro = 'Portaria Principal' WHERE ponto_encontro IS NULL;

-- =============================================================
-- TAREFA 3: Mensagens (Histórico Completo)
-- =============================================================
-- A tabela atual é mensagens_chat. 
-- Precisamos adicionar destinatario_id, tipo_conversa e contexto_id.
ALTER TABLE mensagens_chat ADD COLUMN IF NOT EXISTS destinatario_id INT REFERENCES usuarios(id) ON DELETE CASCADE;
ALTER TABLE mensagens_chat ADD COLUMN IF NOT EXISTS tipo_conversa VARCHAR(20) DEFAULT 'carona' CHECK (tipo_conversa IN ('carona', 'geral'));
ALTER TABLE mensagens_chat ADD COLUMN IF NOT EXISTS contexto_id INT; -- referencia carona_id ou null

-- Preencher destinatario_id para mensagens existentes baseadas na solicitacao_id
-- Se o remetente for o passageiro, o destinatário é o motorista.
-- Se o remetente for o motorista, o destinatário é o passageiro.
UPDATE mensagens_chat mc
SET destinatario_id = (
  SELECT CASE 
           WHEN mc.remetente_id = sc.passageiro_id THEN c.motorista_id
           ELSE sc.passageiro_id
         END
  FROM solicitacoes_carona sc
  JOIN caronas c ON c.id = sc.carona_id
  WHERE sc.id = mc.solicitacao_id
)
WHERE mc.destinatario_id IS NULL;

-- Preencher contexto_id para mensagens existentes (carona_id)
UPDATE mensagens_chat mc
SET contexto_id = (
  SELECT carona_id FROM solicitacoes_carona WHERE id = mc.solicitacao_id
)
WHERE mc.contexto_id IS NULL;

-- Fazer com que solicitacao_id seja opcional (pode ser NULL para tipo='geral')
ALTER TABLE mensagens_chat ALTER COLUMN solicitacao_id DROP NOT NULL;

-- Adicionar índice para busca rápida de conversas entre dois usuários
CREATE INDEX IF NOT EXISTS idx_mensagens_remet_dest ON mensagens_chat (remetente_id, destinatario_id);
