# UniCaronas 🚗💨

**Conectando estudantes para trajetos seguros, econômicos e sustentáveis.**

O **UniCaronas** é uma plataforma web desenvolvida para facilitar a carona solidária entre membros da mesma instituição de ensino. O sistema otimiza o uso de veículos particulares, reduz custos de deslocamento e fortalece a comunidade acadêmica.

---

## ✨ Funcionalidades Principais

- **👤 Perfil Personalizado**: Escolha seu papel como **Passageiro**, **Motorista** ou **Misto**.
- **📊 Dashboard Inteligente**: Mensagens dinâmicas e estatísticas em tempo real baseadas no seu perfil.
- **🚗 Cadastro de Veículo Integrado**: Motoristas registram seus veículos diretamente no cadastro para maior agilidade.
- **🔍 Busca com Filtros**: Encontre caronas por origem, destino, data e preço.
- **📅 Caronas Recorrentes**: Opção de criar caronas semanais automaticamente.
- **💬 Chat em Tempo Real**: Combine detalhes diretamente com o motorista ou passageiros.
- **📍 Mapas Interativos**: Visualização de rotas via Leaflet.js integrada à geocodificação.
- **💳 Pagamento e Taxas**: Suporte a múltiplos métodos de pagamento com cálculo automático da taxa da plataforma (10%).
- **⭐ Sistema de Avaliações**: Histórico de confiança com notas e comentários após cada viagem.
- **🗑️ Gestão de Conta**: Liberdade para o usuário gerenciar seus dados ou excluir sua conta permanentemente.
- **🌐 Internacionalização**: Interface multilíngue com suporte a **Português (PT)**, **Inglês (EN)** e **Espanhol (ES)**.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | HTML5, CSS3 Moderno, JavaScript Vanilla |
| **Backend** | Node.js (Express) |
| **Banco de Dados** | PostgreSQL |
| **Segurança** | JSON Web Token (JWT) e Bcrypt (Criptografia) |
| **Mapas** | Leaflet.js & Nominatim |
| **Uploads** | Multer (Processamento de imagens) |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** v18+
- **PostgreSQL** v14+
- Extensão **Live Server** no VSCode

### 1. Preparação do Banco de Dados
```bash
# Crie o banco
psql -U postgres -c "CREATE DATABASE unicaronas;"

# Navegue até a pasta do banco e execute os scripts
cd database
psql -U postgres -d unicaronas -f schema.sql
psql -U postgres -d unicaronas -f data.sql
```

### 2. Configuração do Backend
1. Entre na pasta `backend`.
2. Instale as dependências: `npm install`.
3. Configure o arquivo `.env` (use o `.env.example` como base).
4. Inicie o servidor: `npm run dev`.

### 3. Execução do Frontend
1. Abra a pasta `frontend` no VSCode.
2. Clique com o botão direito em `pages/login.html` e selecione **"Open with Live Server"**.

---

## 📂 Estrutura de Pastas

```
unicaronas/
├── backend/             # API REST (Node/Express)
│   ├── src/controllers/ # Regras de negócio
│   ├── src/routes/      # Endpoints da API
│   └── uploads/         # Armazenamento de fotos de perfil
├── database/            # Scripts SQL (Schema e Dados)
├── frontend/            # Interface Web (SPA-like)
│   ├── js/              # Lógica, API Client e i18n
│   ├── css/             # Estilização Global e Responsiva
│   └── pages/           # Telas (HTML)
└── docs/                # Documentação Acadêmica (Sprints)
```

---

## 📝 Rotas Principais (API)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/usuarios` | Registro com suporte a veículo |
| `DELETE`| `/api/usuarios/conta` | Exclusão permanente de conta |
| `POST` | `/api/caronas` | Criação de carona (Simples ou Recorrente) |
| `GET`  | `/api/caronas` | Listagem com filtros de busca |
| `POST` | `/api/mensagens` | Envio de mensagens no chat |
| `POST` | `/api/pagamentos`| Processamento de reserva de vaga |

---

## 👥 Equipe de Desenvolvimento

- **Ariane Archanjo** — *Scrum Master*
- **Matheus Sizanoski** — *Fullstack Developer*
- **Pedro Kafka** — *Fullstack Developer*
- **Rafael Machado** — *Product Owner*

---
*Projeto acadêmico para o curso de Engenharia de Software — 2026*
