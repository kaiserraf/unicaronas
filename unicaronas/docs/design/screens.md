# Fluxos de Tela — UniCaronas

## Mapa de Telas

```
login.html
  └── cadastro.html
  └── dashboard.html (requer login)
        ├── buscar.html
        │     └── carona.html
        │           └── (chat + solicitar vaga + pagamento)
        ├── criar-carona.html
        └── perfil.html
              └── (histórico + avaliações)
```

---

## Descrição das Telas

### 1. login.html
**Objetivo:** Autenticar o usuário  
**Campos:** E-mail, senha  
**Ação:** POST /api/usuarios/login → salva JWT no localStorage  
**Redireciona para:** dashboard.html

---

### 2. cadastro.html
**Objetivo:** Criar conta de estudante  
**Campos:** Nome, e-mail institucional, matrícula, curso, telefone, senha  
**Validação:** E-mail deve ter domínio @uni.edu.br  
**Ação:** POST /api/usuarios → redireciona para login

---

### 3. dashboard.html
**Objetivo:** Visão geral do sistema  
**Componentes:**
- Stats (caronas disponíveis, minhas caronas, minha avaliação)
- Botões de ação rápida
- Lista das 5 últimas caronas disponíveis

---

### 4. buscar.html
**Objetivo:** Encontrar caronas compatíveis  
**Filtros:** Origem, destino, data  
**Resultado:** Lista de caronas com motorista, horário, vagas e preço  
**Ação:** Clicar em "Ver detalhes" → carona.html?id=X

---

### 5. criar-carona.html
**Objetivo:** Publicar oferta de carona  
**Campos:** Origem, destino, horário, vagas, distância, valor, observações  
**Destaque:** Campo distância → sugestão automática de valor (R$0,30/km)  
**O usuário pode aceitar ou alterar o valor sugerido**

---

### 6. carona.html
**Objetivo:** Ver detalhes e interagir com a carona  
**Componentes:**
- Informações da rota (origem → destino)
- Dados do motorista + avaliação
- Botão "Solicitar Vaga" (para passageiros)
- Chat (aparece após solicitação aceita)

---

### 7. perfil.html
**Objetivo:** Ver e editar informações pessoais  
**Componentes:**
- Avatar, nome, curso, avaliação média
- Lista de avaliações recebidas
- Histórico de caronas
- Formulário de edição de dados

---

## Fluxo Principal: Passageiro solicita carona

```
1. Login → dashboard
2. Clicar "Buscar Carona"
3. Filtrar por origem/destino
4. Selecionar carona → "Ver detalhes"
5. Clicar "Solicitar Vaga"
6. Aguardar motorista aceitar (notificação)
7. Chat habilitado → combinar detalhes
8. Realizar pagamento
9. Carona concluída → Avaliar motorista
```

---

## Fluxo Principal: Motorista oferece carona

```
1. Login → dashboard
2. Clicar "Oferecer Carona"
3. Preencher trajeto e horário
4. Informar distância → ver valor sugerido
5. Aceitar ou alterar valor → publicar
6. Receber notificação de solicitação
7. Aceitar passageiro → chat habilitado
8. Realizar carona
9. Receber pagamento → Avaliar passageiro
```
