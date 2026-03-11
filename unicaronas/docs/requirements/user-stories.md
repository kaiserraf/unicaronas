# User Stories — UniCaronas

## Épicos e Histórias de Usuário

---

### ÉPICO 1: Autenticação e Perfil

**US01 — Cadastro de Usuário**
> Como um estudante universitário,  
> quero me cadastrar na plataforma usando minha matrícula,  
> para que eu possa acessar o sistema com segurança.

**Critérios de Aceitação:**
- O sistema valida que o e-mail pertence ao domínio institucional
- Campos obrigatórios: nome, e-mail, matrícula, senha
- Senha deve ter no mínimo 8 caracteres
- E-mail não pode ser duplicado

---

**US02 — Login**
> Como um usuário cadastrado,  
> quero fazer login com e-mail e senha,  
> para que eu possa acessar minhas informações e caronas.

**Critérios de Aceitação:**
- Login via e-mail + senha
- Token JWT com validade de 24h
- Mensagem de erro clara em caso de credenciais inválidas

---

**US03 — Perfil do Usuário**
> Como um usuário logado,  
> quero visualizar e editar meu perfil,  
> para que outros usuários possam me conhecer antes da carona.

**Critérios de Aceitação:**
- Exibir: nome, foto, curso, avaliação média, histórico de caronas
- Permitir editar: foto, telefone, descrição
- Exibir avaliações recebidas

---

### ÉPICO 2: Sistema de Caronas

**US04 — Criar Carona**
> Como um estudante motorista,  
> quero publicar uma carona com trajeto, horário e vagas disponíveis,  
> para que eu possa dividir os custos do trajeto com outros alunos.

**Critérios de Aceitação:**
- Campos: origem, destino, horário de partida, número de vagas, valor
- O sistema sugere o valor automaticamente com base na distância estimada
- O motorista pode alterar o valor sugerido
- Carona fica visível para todos os estudantes após publicação

---

**US05 — Sugestão de Valor**
> Como um motorista criando uma carona,  
> quero receber uma sugestão de valor baseada no trajeto,  
> para que eu tenha uma referência justa ao definir o preço.

**Critérios de Aceitação:**
- Sistema calcula: `valor = distancia_km × R$0,30`
- Valor sugerido exibido automaticamente no formulário
- Usuário pode alterar o valor livremente

---

**US06 — Buscar Caronas**
> Como um estudante passageiro,  
> quero buscar caronas disponíveis por origem e destino,  
> para que eu possa encontrar uma carona compatível com meu trajeto.

**Critérios de Aceitação:**
- Filtros por: origem, destino, data/horário
- Exibir: motorista, horário, vagas disponíveis, valor, avaliação do motorista
- Ordenação por horário ou por avaliação

---

**US07 — Solicitar Vaga em Carona**
> Como um estudante passageiro,  
> quero solicitar uma vaga em uma carona disponível,  
> para que eu possa garantir meu lugar no trajeto.

**Critérios de Aceitação:**
- Passageiro envia solicitação
- Motorista recebe notificação
- Motorista pode aceitar ou recusar
- Vaga é reservada ao aceitar

---

### ÉPICO 3: Comunicação

**US08 — Chat entre Usuários**
> Como um motorista ou passageiro,  
> quero me comunicar via chat com o outro usuário após a solicitação,  
> para que eu possa combinar detalhes como ponto de encontro e horário exato.

**Critérios de Aceitação:**
- Chat disponível após solicitação de vaga
- Histórico de mensagens preservado
- Indicação de mensagens não lidas

---

### ÉPICO 4: Pagamento

**US09 — Realizar Pagamento**
> Como um passageiro com vaga confirmada,  
> quero realizar o pagamento dentro da plataforma,  
> para que eu não precise lidar com dinheiro em espécie e a transação seja segura.

**Critérios de Aceitação:**
- Pagamento antes da carona
- Confirmação de pagamento por e-mail/notificação
- Sistema retém 10% como taxa

---

**US10 — Receber Pagamento**
> Como um motorista que concluiu uma carona,  
> quero receber o pagamento pelo aplicativo,  
> para que eu não precise cobrar o passageiro diretamente.

**Critérios de Aceitação:**
- Repasse automático após conclusão da carona
- Histórico de ganhos no perfil do motorista
- Dedução clara da taxa da plataforma

---

### ÉPICO 5: Avaliações

**US11 — Avaliar Usuário**
> Como um passageiro ou motorista após uma carona concluída,  
> quero avaliar o outro participante com nota e comentário,  
> para que a comunidade tenha referências confiáveis sobre os usuários.

**Critérios de Aceitação:**
- Avaliação disponível apenas após conclusão da carona
- Nota de 1 a 5 estrelas + comentário opcional
- Avaliação visível no perfil do usuário avaliado
- Cada participante pode avaliar apenas uma vez por carona
