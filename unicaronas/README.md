# 🚗 UniCaronas

> Sistema web de caronas universitárias — conecta estudantes de forma segura, organizada e acessível.

---

## 📌 Sobre o Projeto

**UniCaronas** é uma plataforma web exclusiva para estudantes universitários que desejam oferecer ou solicitar caronas para ir e voltar da faculdade.

O sistema resolve o problema de mobilidade urbana dentro da comunidade acadêmica, permitindo que alunos compartilhem trajetos de forma econômica e confiável.

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js + Express |
| Banco de Dados | PostgreSQL |
| Autenticação | JWT |
| Pagamentos | Stripe (simulado) |

---

## 📁 Estrutura do Repositório

```
unicaronas/
├── backend/               # API Node.js + Express
│   ├── src/
│   │   ├── controllers/   # Lógica de negócio
│   │   ├── models/        # Modelos de dados
│   │   ├── routes/        # Definição de rotas
│   │   ├── middleware/    # Autenticação, validação
│   │   └── utils/         # Utilitários (sugestão de preço, etc.)
│   ├── config/            # Configurações (DB, env)
│   └── server.js
├── frontend/              # Interface Web
│   ├── pages/             # Páginas HTML
│   ├── css/               # Estilos
│   ├── js/                # Scripts
│   └── components/        # Componentes reutilizáveis
├── database/              # Scripts SQL
│   ├── schema.sql
│   └── data.sql
├── docs/                  # Documentação completa
│   ├── requirements/
│   ├── design/
│   ├── reports/
│   └── presentations/
└── scripts/               # Scripts utilitários
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js >= 18
- PostgreSQL >= 14

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/unicaronas.git
cd unicaronas
```

### 2. Configure o banco de dados
```bash
psql -U postgres -f database/schema.sql
psql -U postgres -f database/data.sql
```

### 3. Configure as variáveis de ambiente
```bash
cd backend
cp .env.example .env
# Edite o .env com suas credenciais
```

### 4. Instale dependências e inicie o backend
```bash
cd backend
npm install
npm run dev
```

### 5. Abra o frontend
```bash
# Abra o arquivo frontend/pages/index.html no navegador
# Ou use Live Server (VSCode)
```

---

## 📖 Documentação

- [Script 0 — Ideia do Projeto](docs/requirements/script0.md)
- [Requisitos e User Stories](docs/requirements/user-stories.md)
- [Product Backlog](docs/requirements/backlog.md)
- [Arquitetura do Sistema](docs/design/architecture.md)
- [Modelo de Dados](docs/design/data-model.md)
- [Fluxos de Tela](docs/design/screens.md)
- [Relatório Sprint 1](docs/reports/sprint1-report.md)
- [Roteiro de Apresentação](docs/presentations/pitch.md)

---

## 👥 Time

| Nome | Função |
|------|--------|
| — | Product Owner |
| — | Scrum Master |
| — | Dev Frontend |
| — | Dev Backend |

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
