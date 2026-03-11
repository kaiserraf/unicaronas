# Product Backlog — UniCaronas

## Backlog Priorizado (MoSCoW)

| ID | História | Prioridade | Estimativa (SP) | Sprint |
|----|----------|------------|-----------------|--------|
| US01 | Cadastro de usuário | Must Have | 5 | 1 |
| US02 | Login / Autenticação JWT | Must Have | 3 | 1 |
| US03 | Perfil do usuário | Should Have | 3 | 1 |
| US04 | Criar carona | Must Have | 5 | 2 |
| US05 | Sugestão de valor por distância | Should Have | 3 | 2 |
| US06 | Buscar caronas | Must Have | 5 | 2 |
| US07 | Solicitar vaga em carona | Must Have | 5 | 2 |
| US08 | Chat entre usuários | Should Have | 8 | 3 |
| US09 | Realizar pagamento | Must Have | 8 | 3 |
| US10 | Receber pagamento (repasse) | Must Have | 5 | 3 |
| US11 | Avaliar usuário pós-carona | Should Have | 5 | 4 |
| US12 | Histórico de caronas | Could Have | 3 | 4 |
| US13 | Notificações internas | Could Have | 3 | 4 |
| US14 | Dashboard administrativo | Won't Have | — | — |

**Total MVP: 57 Story Points**

---

## Planejamento das Sprints

### 🏃 Sprint 1 — Fundação (Semanas 1–2)

**Meta:** Usuários conseguem se cadastrar, fazer login e visualizar o perfil.

**Tarefas:**

#### Backend
- [ ] Configurar projeto Node.js + Express
- [ ] Conectar PostgreSQL
- [ ] Criar tabela `usuarios`
- [ ] `POST /usuarios` — cadastro
- [ ] `POST /login` — autenticação JWT
- [ ] `GET /usuarios/:id` — perfil
- [ ] Middleware de autenticação JWT
- [ ] Validação de e-mail institucional

#### Frontend
- [ ] Página de login (`login.html`)
- [ ] Página de cadastro (`cadastro.html`)
- [ ] Página de perfil (`perfil.html`)
- [ ] CSS base (layout, cores, tipografia)
- [ ] JS: chamadas à API de login/cadastro
- [ ] Armazenamento de token JWT (localStorage)

#### Banco de Dados
- [ ] `schema.sql` com tabela `usuarios`
- [ ] `data.sql` com dados de teste

**Velocidade prevista:** 11 SP  
**Critério de done:** Login funcional com token JWT

---

### 🏃 Sprint 2 — Core de Caronas (Semanas 3–4)

**Meta:** Motorista publica carona; passageiro busca e solicita vaga.

**Tarefas:**

#### Backend
- [ ] Criar tabelas `caronas` e `solicitacoes_carona`
- [ ] `POST /caronas` — criar carona
- [ ] `GET /caronas` — listar com filtros
- [ ] `GET /caronas/:id` — detalhes
- [ ] `POST /caronas/:id/solicitar` — solicitar vaga
- [ ] `PATCH /solicitacoes/:id` — aceitar/recusar
- [ ] Algoritmo de sugestão de preço por distância

#### Frontend
- [ ] Dashboard (`dashboard.html`)
- [ ] Criar carona (`criar-carona.html`)
- [ ] Buscar caronas (`buscar.html`)
- [ ] Detalhes da carona (`carona.html`)
- [ ] JS: listagem, filtros e solicitação

**Velocidade prevista:** 18 SP  
**Critério de done:** Fluxo completo criar → buscar → solicitar funcionando

---

### 🏃 Sprint 3 — Chat e Pagamento (Semanas 5–6)

**Meta:** Usuários se comunicam e realizam pagamento dentro da plataforma.

**Tarefas:**

#### Backend
- [ ] Criar tabela `mensagens_chat`
- [ ] `POST /mensagens` — enviar mensagem
- [ ] `GET /mensagens/:conversa_id` — histórico
- [ ] Criar tabela `pagamentos`
- [ ] `POST /pagamentos` — processar pagamento
- [ ] Lógica de taxa (10%) e repasse
- [ ] `GET /pagamentos/:usuario_id` — histórico financeiro

#### Frontend
- [ ] Tela de chat (`chat.html`)
- [ ] Tela de pagamento (`pagamento.html`)
- [ ] JS: envio e recebimento de mensagens (polling)
- [ ] JS: fluxo de pagamento

**Velocidade prevista:** 21 SP  
**Critério de done:** Pagamento processado com repasse e histórico visível

---

### 🏃 Sprint 4 — Avaliações e Polimento (Semanas 7–8)

**Meta:** Sistema de avaliações, histórico e ajustes finais de UX.

**Tarefas:**

#### Backend
- [ ] Criar tabela `avaliacoes`
- [ ] `POST /avaliacoes` — registrar avaliação
- [ ] `GET /avaliacoes/:usuario_id` — listar avaliações
- [ ] Calcular e atualizar média do usuário
- [ ] Endpoint de histórico de caronas

#### Frontend
- [ ] Tela de avaliação (`avaliacao.html`)
- [ ] Histórico de caronas no perfil
- [ ] Notificações internas (badge)
- [ ] Responsividade mobile
- [ ] Testes de usabilidade e ajustes

#### Documentação Final
- [ ] Atualizar README
- [ ] Gravar demo do sistema
- [ ] Preparar apresentação final

**Velocidade prevista:** 11 SP  
**Critério de done:** Sistema completo funcionando end-to-end; apresentação preparada
