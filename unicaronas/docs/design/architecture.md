# Arquitetura do Sistema — UniCaronas

## Visão Geral

O UniCaronas segue uma **arquitetura em camadas** com padrão **MVC** (Model-View-Controller), comunicação via **API REST** e separação clara entre frontend e backend.

---

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                 │
│                                                      │
│   ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│   │  HTML5   │  │  CSS3    │  │   JavaScript     │  │
│   │  Pages   │  │  Styles  │  │   (Fetch API)    │  │
│   └──────────┘  └──────────┘  └──────────────────┘  │
└────────────────────────┬────────────────────────────┘
                         │ HTTP/REST (JSON)
                         ▼
┌─────────────────────────────────────────────────────┐
│               SERVIDOR (Node.js + Express)           │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │              Middleware Layer                │    │
│  │  CORS │ JWT Auth │ Validation │ Error Handler│    │
│  └──────────────────┬──────────────────────────┘    │
│                     │                                │
│  ┌──────────────────▼──────────────────────────┐    │
│  │                Routes                        │    │
│  │  /usuarios  /caronas  /chat  /pagamentos     │    │
│  └──────────────────┬──────────────────────────┘    │
│                     │                                │
│  ┌──────────────────▼──────────────────────────┐    │
│  │              Controllers                     │    │
│  │  UsuarioCtrl │ CaronaCtrl │ PagamentoCtrl   │    │
│  └──────────────────┬──────────────────────────┘    │
│                     │                                │
│  ┌──────────────────▼──────────────────────────┐    │
│  │                Models                        │    │
│  │     (Queries PostgreSQL com pg pool)         │    │
│  └──────────────────┬──────────────────────────┘    │
└─────────────────────┼───────────────────────────────┘
                      │ SQL
                      ▼
┌─────────────────────────────────────────────────────┐
│                  PostgreSQL                          │
│                                                      │
│   usuarios │ caronas │ solicitacoes │ mensagens      │
│   avaliacoes │ pagamentos                            │
└─────────────────────────────────────────────────────┘
```

---

## Camadas da Aplicação

### 1. Frontend (View)
- HTML5 + CSS3 + JavaScript puro
- Comunicação com API via `fetch()`
- Token JWT armazenado em `localStorage`
- Responsivo com CSS Grid/Flexbox

### 2. API REST (Controller)
- Node.js + Express.js
- Rotas organizadas por domínio
- Middleware JWT para proteção de rotas
- Validação de entrada com `express-validator`
- Resposta padronizada em JSON

### 3. Banco de Dados (Model)
- PostgreSQL com driver `pg`
- Connection Pool para performance
- Queries SQL parametrizadas (prevenção de SQL Injection)

---

## Fluxo de Autenticação

```
1. Usuário envia e-mail + senha → POST /login
2. Backend valida credenciais no PostgreSQL
3. Backend gera token JWT (válido 24h)
4. Frontend armazena token em localStorage
5. Todas as requisições futuras incluem:
   Authorization: Bearer <token>
6. Middleware JWT valida token a cada requisição protegida
```

---

## Fluxo de Pagamento

```
1. Passageiro solicita vaga → POST /caronas/:id/solicitar
2. Motorista aceita → PATCH /solicitacoes/:id
3. Passageiro realiza pagamento → POST /pagamentos
4. Sistema calcula taxa (10%) e registra
5. Após carona concluída → repasse ao motorista
6. Ambos podem avaliar → POST /avaliacoes
```

---

## Padrão de Resposta da API

### Sucesso
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Erro
```json
{
  "success": false,
  "error": "Descrição do erro",
  "code": 400
}
```

---

## Segurança

| Mecanismo | Implementação |
|-----------|---------------|
| Autenticação | JWT (jsonwebtoken) |
| Senha | bcrypt (hash + salt) |
| SQL Injection | Queries parametrizadas |
| CORS | Configurado para domínios permitidos |
| Validação | express-validator em todas as rotas |
| Acesso restrito | Validação de e-mail institucional |
