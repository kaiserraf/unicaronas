# Script 0 — UniCaronas

## Documento de Concepção do Projeto

**Disciplina:** Engenharia de Software  
**Projeto:** UniCaronas  
**Data:** 2025  

---

## 1. Nome do Projeto

**UniCaronas** — Sistema Web de Caronas Universitárias

---

## 2. Problema

Muitos estudantes universitários enfrentam diariamente o desafio do transporte até a faculdade:

- **Custo elevado** de aplicativos de transporte (Uber, 99)
- **Horários limitados** ou inexistentes de ônibus em determinadas regiões
- **Distância** entre a residência e a universidade
- **Falta de segurança** em plataformas de carona abertas ao público geral

Ao mesmo tempo, muitos alunos realizam esse trajeto diariamente de carro, com vagas ociosas no veículo.

**A oportunidade:** existe uma demanda real de conexão entre quem tem carro e quem precisa de carona, dentro de uma mesma comunidade acadêmica confiável.

---

## 3. Solução Proposta

O **UniCaronas** é um sistema web que conecta estudantes da mesma universidade para compartilhamento de caronas, com:

- Cadastro restrito a alunos da instituição (validação por matrícula/email institucional)
- Publicação e busca de caronas com trajeto, horário e vagas
- **Sugestão automática de valor** baseada na distância do trajeto
- Chat interno entre motorista e passageiro
- Sistema de pagamento integrado com retenção de taxa
- Avaliações mútuas pós-carona

---

## 4. Público-Alvo

**Estudantes universitários** da instituição, com dois perfis:

| Perfil | Descrição |
|--------|-----------|
| **Motorista** | Aluno que possui carro e realiza o trajeto diariamente |
| **Passageiro** | Aluno que busca carona para reduzir custos de transporte |

*Um mesmo usuário pode alternar entre os dois perfis.*

---

## 5. Funcionalidades Principais (MVP)

### 5.1 Autenticação e Cadastro
- Cadastro com validação de vínculo institucional (matrícula ou e-mail @universidade.edu.br)
- Login com JWT
- Perfil com foto, curso e avaliação média

### 5.2 Gestão de Caronas
- Criar carona com: origem, destino, horário, vagas e valor
- Buscar caronas disponíveis por trajeto/horário
- Solicitar vaga em carona existente

### 5.3 Sugestão de Valor
O sistema calcula um **valor sugerido** automaticamente:

```
valor_sugerido = distancia_km × custo_por_km
custo_por_km   = R$ 0,30 (configurável)
```

O usuário pode aceitar a sugestão ou negociar outro valor diretamente no chat.

### 5.4 Chat Interno
- Mensagens em tempo real entre motorista e passageiro
- Para combinar ponto de encontro, horário exato, etc.

### 5.5 Pagamento Integrado
- Passageiro paga pela plataforma antes da carona
- Sistema retém taxa de serviço (10%)
- Motorista recebe o valor líquido após a conclusão

**Exemplo:**
```
Valor da carona:   R$ 10,00
Taxa da plataforma: R$  1,00 (10%)
Repasse ao motorista: R$  9,00
```

### 5.6 Avaliações
- Passageiro avalia motorista (1–5 estrelas + comentário)
- Motorista avalia passageiro (1–5 estrelas + comentário)
- Avaliações visíveis no perfil público do usuário

---

## 6. Tecnologias

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Frontend | HTML5 + CSS3 + JavaScript | Leve, sem dependências pesadas |
| Backend | Node.js + Express | Popular, assíncrono, ecossistema rico |
| Banco de dados | PostgreSQL | Robusto, relacional, suporte a JSON |
| Autenticação | JWT | Stateless, seguro |
| Pagamento | Stripe API (simulação) | Padrão de mercado |

---

## 7. Arquitetura Geral

```
[Usuário]
    │
    ▼
[Frontend HTML/CSS/JS]
    │  HTTP/REST
    ▼
[API Node.js + Express]
    │
    ├──► [PostgreSQL]      (dados principais)
    ├──► [JWT Auth]        (autenticação)
    └──► [Stripe API]      (pagamentos)
```

**Padrão:** MVC com API REST

---

## 8. Modelo de Monetização

O sistema gera receita através de **taxa por transação**:

| Item | Valor |
|------|-------|
| Taxa de serviço | 10% do valor da carona |
| Exemplo (carona R$10) | R$ 1,00 por transação |

Receita projetada (estimativa):
- 500 caronas/mês × R$10 médio × 10% = **R$ 500/mês**
- 5.000 caronas/mês × R$10 médio × 10% = **R$ 5.000/mês**

---

## 9. Diferenciais

| Diferencial | Descrição |
|-------------|-----------|
| **Comunidade fechada** | Restrito a alunos da mesma instituição |
| **Segurança** | Usuários verificados por vínculo institucional |
| **Rotas similares** | Alta probabilidade de trajetos coincidentes |
| **Sugestão de preço** | Cálculo automático por distância |
| **Pagamento seguro** | Sem pagamento informal em dinheiro |

---

## 10. Expansão Futura

- App mobile (React Native)
- Integração com sistema acadêmico da universidade
- Caronas recorrentes (agendamento semanal)
- Mapa em tempo real da posição do motorista
- Expansão para outras universidades
- Programa de fidelidade e gamificação
- API pública para parceiros institucionais
