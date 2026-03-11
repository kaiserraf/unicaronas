# Modelo de Dados — UniCaronas

## Modelo Conceitual (DER simplificado em texto)

```
USUARIO (1) ──────── (N) CARONA           (motorista cria caronas)
USUARIO (1) ──────── (N) SOLICITACAO      (passageiro solicita vagas)
CARONA  (1) ──────── (N) SOLICITACAO      (carona tem várias solicitações)
USUARIO (1) ──────── (N) MENSAGEM         (usuário envia mensagens)
SOLICITACAO (1) ───── (N) MENSAGEM        (mensagens ligadas a uma solicitação)
SOLICITACAO (1) ───── (1) PAGAMENTO       (pagamento por solicitação)
SOLICITACAO (1) ───── (2) AVALIACAO       (motorista e passageiro avaliam)
```

---

## Modelo Lógico

### USUARIOS
| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | SERIAL | PK |
| nome | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | UNIQUE, NOT NULL |
| matricula | VARCHAR(20) | UNIQUE, NOT NULL |
| senha_hash | VARCHAR(255) | NOT NULL |
| telefone | VARCHAR(20) | |
| foto_url | VARCHAR(255) | |
| curso | VARCHAR(100) | |
| avaliacao_media | DECIMAL(2,1) | DEFAULT 0 |
| total_avaliacoes | INT | DEFAULT 0 |
| criado_em | TIMESTAMP | DEFAULT NOW() |

### CARONAS
| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | SERIAL | PK |
| motorista_id | INT | FK → usuarios |
| origem | VARCHAR(200) | NOT NULL |
| destino | VARCHAR(200) | NOT NULL |
| horario_partida | TIMESTAMP | NOT NULL |
| vagas_totais | INT | NOT NULL |
| vagas_disponiveis | INT | NOT NULL |
| valor_sugerido | DECIMAL(10,2) | |
| valor_cobrado | DECIMAL(10,2) | NOT NULL |
| distancia_km | DECIMAL(10,2) | |
| status | VARCHAR(20) | DEFAULT 'ativa' |
| criado_em | TIMESTAMP | DEFAULT NOW() |

**Status possíveis:** `ativa`, `em_andamento`, `concluida`, `cancelada`

### SOLICITACOES_CARONA
| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | SERIAL | PK |
| carona_id | INT | FK → caronas |
| passageiro_id | INT | FK → usuarios |
| status | VARCHAR(20) | DEFAULT 'pendente' |
| criado_em | TIMESTAMP | DEFAULT NOW() |
| atualizado_em | TIMESTAMP | |

**Status possíveis:** `pendente`, `aceita`, `recusada`, `cancelada`

### MENSAGENS_CHAT
| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | SERIAL | PK |
| solicitacao_id | INT | FK → solicitacoes_carona |
| remetente_id | INT | FK → usuarios |
| conteudo | TEXT | NOT NULL |
| lida | BOOLEAN | DEFAULT false |
| enviado_em | TIMESTAMP | DEFAULT NOW() |

### PAGAMENTOS
| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | SERIAL | PK |
| solicitacao_id | INT | FK → solicitacoes_carona |
| valor_total | DECIMAL(10,2) | NOT NULL |
| taxa_plataforma | DECIMAL(10,2) | NOT NULL |
| valor_motorista | DECIMAL(10,2) | NOT NULL |
| status | VARCHAR(20) | DEFAULT 'pendente' |
| metodo | VARCHAR(50) | |
| referencia_externa | VARCHAR(100) | |
| pago_em | TIMESTAMP | |
| repassado_em | TIMESTAMP | |

**Status possíveis:** `pendente`, `pago`, `repassado`, `estornado`

### AVALIACOES
| Campo | Tipo | Restrição |
|-------|------|-----------|
| id | SERIAL | PK |
| solicitacao_id | INT | FK → solicitacoes_carona |
| avaliador_id | INT | FK → usuarios |
| avaliado_id | INT | FK → usuarios |
| nota | INT | CHECK (1–5) |
| comentario | TEXT | |
| criado_em | TIMESTAMP | DEFAULT NOW() |
