# 📝 User Stories - FinBoost+

Este documento contém as histórias de usuário que orientam o desenvolvimento do FinBoost+, baseadas nas necessidades reais dos usuários identificadas durante a análise de requisitos.

---

## 📋 **Template de User Story**

**Como** [tipo de usuário/persona],  
**Quero** [ação ou funcionalidade],  
**Para que** [benefício ou resultado desejado].

**Critérios de Aceitação:**
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

---

## 👤 **Autenticação e Perfil**

### **US01 - Cadastro de Usuário**
**Como** um novo usuário,  
**Quero** me cadastrar no sistema com email e senha,  
**Para que** eu possa acessar todas as funcionalidades da plataforma.

**Critérios de Aceitação:**
- [ ] Formulário com campos obrigatórios: nome, email, senha
- [ ] Validação de email único no sistema
- [ ] Senha deve ter mínimo 8 caracteres
- [ ] Confirmação de senha obrigatória
- [ ] Redirecionamento para login após cadastro

### **US02 - Login de Usuário**
**Como** um usuário cadastrado,  
**Quero** fazer login com meu email e senha,  
**Para que** eu possa acessar minha conta e meus grupos.

**Critérios de Aceitação:**
- [ ] Formulário de login funcional
- [ ] Validação de credenciais
- [ ] Redirecionamento para dashboard após login
- [ ] Mensagem de erro para credenciais inválidas
- [ ] Opção "Lembrar-me" opcional

### **US03 - Visualização de Perfil**
**Como** um usuário logado,  
**Quero** visualizar e editar meu perfil,  
**Para que** eu possa manter meus dados atualizados.

**Critérios de Aceitação:**
- [ ] Exibição de nome, email e foto (opcional)
- [ ] Opção de editar informações pessoais
- [ ] Opção de logout
- [ ] Configurações de tema (claro/escuro)

---

## 👥 **Gestão de Grupos**

### **US04 - Criação de Grupo**
**Como** um usuário,  
**Quero** criar um novo grupo de despesas,  
**Para que** eu possa organizar gastos compartilhados com outras pessoas.

**Critérios de Aceitação:**
- [ ] Formulário com nome e descrição do grupo
- [ ] Criador automaticamente vira administrador
- [ ] Grupo aparece na lista do usuário
- [ ] Redirecionamento para página do grupo criado

### **US05 - Convite para Grupo**
**Como** um administrador de grupo,  
**Quero** convidar outras pessoas para meu grupo,  
**Para que** possamos dividir despesas em conjunto.

**Critérios de Aceitação:**
- [ ] Opção de convidar por email ou código
- [ ] Geração de link de convite único
- [ ] Notificação para pessoa convidada
- [ ] Confirmação de aceite de convite

### **US06 - Listagem de Grupos**
**Como** um usuário,  
**Quero** ver todos os grupos que participo,  
**Para que** eu possa navegar facilmente entre eles.

**Critérios de Aceitação:**
- [ ] Lista com nome, descrição e número de participantes
- [ ] Indicação de grupos onde sou administrador
- [ ] Acesso rápido aos detalhes de cada grupo
- [ ] Opção de sair do grupo (se não for criador)

---

## 💰 **Controle de Despesas**

### **US07 - Registro de Despesa**
**Como** um membro do grupo,  
**Quero** registrar uma nova despesa,  
**Para que** ela seja dividida automaticamente entre os participantes.

**Critérios de Aceitação:**
- [ ] Formulário com: valor, descrição, categoria, data
- [ ] Seleção de participantes que dividirão a despesa
- [ ] Opção de divisão igual ou personalizada
- [ ] Confirmação visual da despesa criada

### **US08 - Visualização de Despesas**
**Como** um membro do grupo,  
**Quero** ver todas as despesas do grupo,  
**Para que** eu possa acompanhar os gastos compartilhados.

**Critérios de Aceitação:**
- [ ] Lista cronológica de despesas
- [ ] Filtros por data, categoria e pessoa
- [ ] Detalhes de cada despesa (valor, divisão, participantes)
- [ ] Indicação visual de quem registrou cada despesa

### **US09 - Edição de Despesa**
**Como** o criador de uma despesa,  
**Quero** editar ou excluir a despesa,  
**Para que** eu possa corrigir informações incorretas.

**Critérios de Aceitação:**
- [ ] Opção de editar apenas para quem criou
- [ ] Confirmação antes de excluir
- [ ] Recalculo automático de saldos após alteração
- [ ] Histórico de alterações (opcional)

---

## 📊 **Dashboard e Relatórios**

### **US10 - Dashboard Principal**
**Como** um usuário,  
**Quero** ver um resumo das minhas finanças na tela principal,  
**Para que** eu tenha uma visão geral da minha situação financeira.

**Critérios de Aceitação:**
- [ ] Saldo total (quanto devo/devem para mim)
- [ ] Últimas despesas registradas
- [ ] Gráfico de gastos por categoria
- [ ] Acesso rápido aos grupos mais usados

### **US11 - Saldos do Grupo**
**Como** um membro do grupo,  
**Quero** ver claramente quem deve para quem,  
**Para que** eu saiba exatamente quanto preciso pagar ou receber.

**Critérios de Aceitação:**
- [ ] Lista de saldos entre todos os participantes
- [ ] Valores positivos (a receber) e negativos (a pagar)
- [ ] Sugestão de acertos simplificados
- [ ] Atualização em tempo real

### **US12 - Relatórios por Período**
**Como** um usuário,  
**Quero** gerar relatórios de gastos por período,  
**Para que** eu possa analisar meus padrões de consumo.

**Critérios de Aceitação:**
- [ ] Filtros por data (semana, mês, período customizado)
- [ ] Quebra por categoria de gasto
- [ ] Gráficos visuais dos dados
- [ ] Comparação com períodos anteriores

---

## 🎨 **Experiência do Usuário**

### **US13 - Interface Responsiva**
**Como** um usuário mobile,  
**Quero** usar o sistema no meu celular,  
**Para que** eu possa registrar despesas em qualquer lugar.

**Critérios de Aceitação:**
- [ ] Interface adaptável a diferentes tamanhos de tela
- [ ] Botões e campos de fácil acesso em mobile
- [ ] Navegação intuitiva em dispositivos touch
- [ ] Performance adequada em conexões lentas

### **US14 - Tema Escuro/Claro**
**Como** um usuário,  
**Quero** escolher entre tema claro e escuro,  
**Para que** eu possa usar o sistema conforme minha preferência.

**Critérios de Aceitação:**
- [ ] Toggle para alternar entre temas
- [ ] Preferência salva no navegador
- [ ] Todos os componentes funcionam em ambos temas
- [ ] Transição suave entre temas

### **US15 - Feedback Visual**
**Como** um usuário,  
**Quero** receber feedback claro das minhas ações,  
**Para que** eu saiba se as operações foram realizadas com sucesso.

**Critérios de Aceitação:**
- [ ] Mensagens de sucesso para ações completadas
- [ ] Indicadores de carregamento para operações lentas
- [ ] Mensagens de erro claras e acionáveis
- [ ] Estados visuais para diferentes status

---

## 🔒 **Segurança e Privacidade**

### **US16 - Proteção de Dados**
**Como** um usuário,  
**Quero** ter certeza de que meus dados estão seguros,  
**Para que** eu possa usar o sistema com confiança.

**Critérios de Aceitação:**
- [ ] Senhas criptografadas no banco de dados
- [ ] Sessões seguras com JWT
- [ ] Validação de entrada em todos os formulários
- [ ] Política de privacidade clara

### **US17 - Controle de Acesso**
**Como** um membro de grupo,  
**Quero** ter controle sobre quem pode ver e editar informações,  
**Para que** a privacidade do grupo seja mantida.

**Critérios de Aceitação:**
- [ ] Apenas membros podem ver despesas do grupo
- [ ] Apenas criador pode editar configurações do grupo
- [ ] Cada usuário só edita suas próprias despesas
- [ ] Logs de atividade para administradores

---

## 📈 **Priorização**

### **Entrega 1 (MVP Essencial)**
- US01, US02, US03 - Autenticação básica
- US04, US06 - Gestão básica de grupos
- US07, US08 - Registro e visualização de despesas
- US11 - Cálculo de saldos

### **Entrega 2 (Funcionalidades Core)**
- US05 - Convites para grupos
- US09 - Edição de despesas
- US10 - Dashboard principal
- US13 - Interface responsiva

### **Entrega 3 (Melhorias de UX)**
- US12 - Relatórios
- US14 - Temas
- US15 - Feedback visual
- US16, US17 - Segurança avançada

---

<div align="center">
  <strong>📝 User Stories orientadas a valor</strong><br/>
  <em>Focadas na experiência real do usuário</em>
</div>
