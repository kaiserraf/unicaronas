# Relatório de Sprint 1 — UniCaronas

**Sprint:** 1 de 4  
**Período:** Semana 1–2  
**Meta:** Autenticação e cadastro de usuários funcionando

---

## Resumo Executivo

A Sprint 1 foi concluída com **100% das tarefas planejadas** entregues.
O time implementou o cadastro, login e visualização de perfil de usuário com autenticação JWT.

---

## O que foi feito

| Tarefa | Responsável | Status |
|--------|-------------|--------|
| Configurar projeto Node.js + Express | Dev Backend | ✅ |
| Conectar PostgreSQL | Dev Backend | ✅ |
| Criar tabela usuarios | Dev Backend | ✅ |
| POST /usuarios — cadastro | Dev Backend | ✅ |
| POST /login — JWT | Dev Backend | ✅ |
| Middleware autenticação | Dev Backend | ✅ |
| Validação e-mail institucional | Dev Backend | ✅ |
| Página login.html | Dev Frontend | ✅ |
| Página cadastro.html | Dev Frontend | ✅ |
| Página perfil.html | Dev Frontend | ✅ |
| CSS base | Dev Frontend | ✅ |
| JS: chamadas à API | Dev Frontend | ✅ |

**Story Points planejados:** 11  
**Story Points entregues:** 11  
**Velocidade real:** 5,5 SP/semana

---

## Impedimentos encontrados

- **Configuração do PostgreSQL no Windows:** resolvido com WSL2
- **CORS bloqueando frontend:** resolvido adicionando middleware `cors`

---

## Retrospectiva

**O que funcionou bem:**
- Comunicação diária entre frontend e backend
- Definição prévia do contrato da API (JSON esperado)

**O que pode melhorar:**
- Criar testes automatizados antes de codificar
- Documentar endpoints à medida que são criados

---

## Planejamento Sprint 2

Meta: Criar e buscar caronas, solicitar vagas.

Tarefas a iniciar:
- Tabelas caronas e solicitacoes_carona
- CRUD de caronas
- Algoritmo de sugestão de preço
- Telas de buscar e criar carona
