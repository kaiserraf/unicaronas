-- =============================================================
-- UniCaronas — Dados de Teste (seed)
-- =============================================================
-- ATENÇÃO: Senhas estão em hash bcrypt de "senha123"
-- O hash abaixo é um exemplo válido para fins de demonstração local.

INSERT INTO usuarios (nome, email, matricula, senha_hash, telefone, curso, dia_ead, avaliacao_media, total_avaliacoes) VALUES
  ('Ana Silva',    'ana.silva@uni.edu.br',    '2021001', '$2b$10$R9h/lIPz0gi.URQHeih6UuR5E2.vV4T.C/5qT.tV4U6L.vV4T.C/5', '(41) 99001-0001', 'Engenharia de Software', 5, 4.8, 12),
  ('Carlos Lima',  'carlos.lima@uni.edu.br',  '2021002', '$2b$10$R9h/lIPz0gi.URQHeih6UuR5E2.vV4T.C/5qT.tV4U6L.vV4T.C/5', '(41) 99001-0002', 'Ciência da Computação',  NULL, 4.5,  8),
  ('Julia Santos', 'julia.santos@uni.edu.br', '2020003', '$2b$10$R9h/lIPz0gi.URQHeih6UuR5E2.vV4T.C/5qT.tV4U6L.vV4T.C/5', '(41) 99001-0003', 'Sistemas de Informação', 4, 4.9, 20),
  ('Pedro Costa',  'pedro.costa@uni.edu.br',  '2022004', '$2b$10$R9h/lIPz0gi.URQHeih6UuR5E2.vV4T.C/5qT.tV4U6L.vV4T.C/5', '(41) 99001-0004', 'Engenharia de Software', NULL, 3.0,  1),
  ('Mariana Rocha','mariana.rocha@uni.edu.br','2021005', '$2b$10$R9h/lIPz0gi.URQHeih6UuR5E2.vV4T.C/5qT.tV4U6L.vV4T.C/5', '(41) 99001-0005', 'Ciência da Computação',  NULL, 4.2,  5);

INSERT INTO veiculos (usuario_id, marca, modelo, ano, cor, placa) VALUES
  (1, 'Fiat', 'Argo', 2020, 'Prata', 'ABC-1234'),
  (3, 'Chevrolet', 'Onix', 2019, 'Branco', 'XYZ-9876'),
  (5, 'Volkswagen', 'Tracker', 2022, 'Preto', 'DEF-5678');

INSERT INTO caronas (motorista_id, veiculo_id, origem, destino, ponto_encontro, ponto_encontro_detalhes, horario_partida, vagas_totais, vagas_disponiveis, valor_sugerido, valor_cobrado, distancia_km, status, recorrente) VALUES
  -- Caronas ativas
  (1, 1, 'Bairro Batel, Curitiba',    'Universidade - Campus Norte', 'Portaria Principal', 'Ao lado da guarita', NOW() + INTERVAL '1 day 2 hours', 3, 2, 9.00,  9.00, 30.0, 'ativa', false),
  (3, 2, 'Centro, Curitiba',          'Universidade - Campus Norte', 'Bloco B', 'Perto da cantina', NOW() + INTERVAL '1 day 3 hours', 2, 1, 6.00,  7.00, 20.0, 'ativa', false),

  -- Carona recorrente (US12)
  (5, 3, 'Santa Felicidade, Curitiba', 'Universidade - Campus Norte', 'Estacionamento Central', 'Vaga de visitantes', NOW() + INTERVAL '2 days 1 hour', 4, 4, 12.00, 10.00, 40.0, 'ativa', true),
  (5, 3, 'Santa Felicidade, Curitiba', 'Universidade - Campus Norte', 'Estacionamento Central', 'Vaga de visitantes', NOW() + INTERVAL '9 days 1 hour', 4, 4, 12.00, 10.00, 40.0, 'ativa', true),

  -- Caronas concluídas (para US10 e US11)
  (1, 1, 'Bairro Batel, Curitiba',    'Universidade - Campus Norte', 'Portaria Principal', NULL, NOW() - INTERVAL '2 days', 3, 0, 9.00,  9.00, 30.0, 'concluida', false),
  (2, NULL, 'Universidade - Campus Norte','Centro, Curitiba',        'Biblioteca', 'Na escadaria', NOW() - INTERVAL '1 day', 4, 1, 6.00,  6.00, 20.0, 'concluida', false);

INSERT INTO solicitacoes_carona (carona_id, passageiro_id, status) VALUES  (1, 2, 'aceita'),
  (2, 4, 'pendente'),
  (5, 1, 'aceita'), -- Ana na carona concluída de Carlos
  (6, 3, 'aceita'); -- Julia na carona concluída de Carlos

INSERT INTO avaliacoes (solicitacao_id, avaliador_id, avaliado_id, nota, comentario) VALUES
  (3, 2, 1, 5, 'Ana é uma excelente motorista! Muito pontual.'),
  (3, 1, 2, 4, 'Carlos foi um ótimo passageiro, educado e pontual.');

INSERT INTO mensagens_chat (solicitacao_id, remetente_id, conteudo) VALUES
  (1, 2, 'Oi Ana! Vi que você tem vaga, posso entrar na carona?'),
  (1, 1, 'Claro Carlos! Vou te pegar na Praça Oswaldo Cruz às 7h15.'),
  (1, 2, 'Perfeito, estarei lá! Obrigado.');

INSERT INTO pagamentos (solicitacao_id, valor_total, taxa_plataforma, valor_motorista, status, metodo, pago_em) VALUES
  (1, 9.00, 0.90, 8.10, 'pago', 'pix', NOW() - INTERVAL '1 day');
