# 📋 Requisitos do Sistema - FinBoost+

Este documento especifica os requisitos funcionais e não funcionais do sistema FinBoost+, definindo o escopo e as características técnicas necessárias para o MVP.

---

## 🎯 **Objetivo do Sistema**

Desenvolver uma aplicação web para **controle financeiro compartilhado** que permita a criação de grupos, registro de despesas e cálculo automático de saldos entre participantes.

---

## ⚙️ **Requisitos Funcionais (RF)**

### **RF01 - Autenticação e Autorização**

#### **RF01.1 - Cadastro de Usuário**
- O sistema deve permitir cadastro com nome, email e senha
- Validação de email único no sistema
- Senha deve ter mínimo 8 caracteres
- Confirmação de email opcional para ativação da conta

#### **RF01.2 - Login de Usuário**
- Login com email e senha
- Geração de token JWT para sessão
- Opção "Lembrar-me" para persistir login
- Logout com invalidação de token

#### **RF01.3 - Recuperação de Senha**
- Envio de email para reset de senha
- Link único com expiração de 24 horas
- Definição de nova senha

#### **RF01.4 - Gestão de Perfil**
- Visualização de dados pessoais
- Edição de nome e email
- Alteração de senha
- Upload de foto de perfil (opcional)

### **RF02 - Gestão de Grupos**

#### **RF02.1 - Criação de Grupo**
- Criação de grupo com nome e descrição
- Definição automática do criador como administrador
- Geração de código único para o grupo

#### **RF02.2 - Convite para Grupo**
- Convite por email ou código do grupo
- Geração de link de convite único
- Aceite/recusa de convite
- Limite de participantes por grupo (máximo 20)

#### **RF02.3 - Gestão de Participantes**
- Listagem de membros do grupo
- Remoção de participantes (apenas admin)
- Transferência de administração
- Saída voluntária do grupo

#### **RF02.4 - Configurações do Grupo**
- Edição de nome e descrição
- Definição de categorias personalizadas
- Configuração de divisão padrão
- Exclusão do grupo (apenas admin)

### **RF03 - Controle de Despesas**

#### **RF03.1 - Registro de Despesa**
- Criação de despesa com valor, descrição, categoria e data
- Seleção de participantes da divisão
- Opções de divisão: igual, por valor fixo, por percentual
- Anexo de comprovante (imagem opcional)

#### **RF03.2 - Visualização de Despesas**
- Listagem cronológica de despesas do grupo
- Filtros por data, categoria, participante
- Busca por descrição
- Paginação para listas grandes

#### **RF03.3 - Edição de Despesa**
- Edição apenas pelo criador da despesa
- Alteração de valor, descrição, data e divisão
- Histórico de alterações
- Recálculo automático de saldos

#### **RF03.4 - Exclusão de Despesa**
- Exclusão apenas pelo criador
- Confirmação obrigatória
- Soft delete com possibilidade de recuperação
- Notificação aos participantes afetados

### **RF04 - Cálculos e Saldos**

#### **RF04.1 - Cálculo de Saldos**
- Cálculo automático após cada operação
- Saldo individual de cada participante
- Saldo consolidado do grupo
- Algoritmo de simplificação de dívidas

#### **RF04.2 - Relatórios**
- Relatório por período (semanal, mensal, customizado)
- Quebra por categoria de gasto
- Gráficos de gastos por participante
- Exportação em PDF (futuro)

#### **RF04.3 - Acertos**
- Sugestão de acertos simplificados
- Marcação de pagamentos realizados
- Histórico de acertos
- Confirmação bilateral de pagamentos

### **RF05 - Interface e Usabilidade**

#### **RF05.1 - Dashboard**
- Visão geral dos grupos do usuário
- Resumo financeiro (total a pagar/receber)
- Últimas despesas registradas
- Acesso rápido a grupos ativos

#### **RF05.2 - Responsividade**
- Interface adaptável (desktop, tablet, mobile)
- Touch-friendly para dispositivos móveis
- Performance otimizada para conexões lentas

#### **RF05.3 - Acessibilidade**
- Contraste adequado para leitura
- Navegação por teclado
- Textos alternativos para imagens
- Compatibilidade com screen readers

---

## 🛡️ **Requisitos Não Funcionais (RNF)**

### **RNF01 - Performance**
- Tempo de resposta < 2 segundos para operações básicas
- First Contentful Paint < 1.5 segundos
- Suporte a 100 usuários simultâneos
- Cache de dados frequentemente acessados

### **RNF02 - Segurança**
- Criptografia de senhas com bcrypt
- Validação de entrada em todos os endpoints
- Proteção contra SQL Injection e XSS
- Rate limiting para prevenção de ataques
- HTTPS obrigatório em produção

### **RNF03 - Confiabilidade**
- Disponibilidade de 99% (exceto manutenções)
- Backup automático diário do banco de dados
- Logs de erro detalhados
- Monitoramento de saúde da aplicação

### **RNF04 - Escalabilidade**
- Arquitetura preparada para crescimento horizontal
- Otimização de queries para grandes volumes
- Cache distribuído (Redis futuro)
- CDN para assets estáticos

### **RNF05 - Usabilidade**
- Interface intuitiva sem necessidade de tutorial
- Feedback visual claro para todas as ações
- Tempo de aprendizado < 10 minutos
- Compatibilidade com navegadores modernos

### **RNF06 - Manutenibilidade**
- Código documentado e testado
- Cobertura de testes > 80%
- Padrões de codificação consistentes
- Arquitetura modular e desacoplada

### **RNF07 - Portabilidade**
- Containerização com Docker
- Configuração via variáveis de ambiente
- Deploy automatizado via CI/CD
- Suporte a múltiplos ambientes (dev, staging, prod)

---

## 🔧 **Requisitos Técnicos**

### **Frontend**
- **Framework:** React 19+
- **Build Tool:** Vite 7+
- **Styling:** TailwindCSS 4+
- **State Management:** Context API / Zustand
- **Charts:** Recharts
- **Testing:** Vitest + React Testing Library

### **Backend**
- **Linguagem:** Java 21+
- **Framework:** Spring Boot 3.5+
- **Security:** Spring Security + JWT
- **Database:** PostgreSQL 15+
- **ORM:** JPA/Hibernate
- **Testing:** JUnit 5 + Mockito

### **Infraestrutura**
- **Containerização:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Documentação:** MkDocs Material
- **Monitoramento:** Spring Actuator
- **Deploy:** Heroku/Railway (MVP) → AWS (futuro)

---

## 📊 **Regras de Negócio**

### **RN01 - Usuários e Grupos**
- Um usuário pode participar de múltiplos grupos
- Um grupo deve ter pelo menos 2 participantes
- Apenas o administrador pode excluir o grupo
- Usuários podem sair de grupos voluntariamente

### **RN02 - Despesas**
- Valor da despesa deve ser positivo e maior que zero
- Data da despesa não pode ser futura
- Participantes da divisão devem ser membros do grupo
- Soma das divisões deve igualar o valor total

### **RN03 - Saldos**
- Saldos são calculados automaticamente
- Valores positivos indicam crédito
- Valores negativos indicam débito
- Simplificação de dívidas para minimizar transações

### **RN04 - Segurança**
- Usuários só acessam grupos dos quais participam
- Apenas criador pode editar/excluir suas despesas
- Tokens JWT expiram em 24 horas
- Senhas não podem ser visualizadas em texto plano

---

## 🎯 **Critérios de Aceitação do MVP**

### **Funcional**
- [ ] Usuário consegue se cadastrar e fazer login
- [ ] Usuário consegue criar e participar de grupos
- [ ] Usuário consegue registrar despesas compartilhadas
- [ ] Sistema calcula saldos automaticamente
- [ ] Interface é responsiva e intuitiva

### **Técnico**
- [ ] Cobertura de testes > 80%
- [ ] Performance adequada (FCP < 1.5s)
- [ ] Segurança implementada (JWT, validações)
- [ ] Documentação completa
- [ ] Deploy automatizado funcionando

### **Qualidade**
- [ ] Código segue padrões estabelecidos
- [ ] Interface acessível e usável
- [ ] Tratamento adequado de erros
- [ ] Logs e monitoramento implementados

---

## 📈 **Priorização (MoSCoW)**

### **Must Have (Obrigatório)**
- Autenticação básica (RF01.1, RF01.2)
- Gestão de grupos (RF02.1, RF02.3)
- Registro de despesas (RF03.1, RF03.2)
- Cálculo de saldos (RF04.1)
- Interface responsiva (RF05.2)

### **Should Have (Importante)**
- Convites para grupos (RF02.2)
- Edição de despesas (RF03.3)
- Dashboard principal (RF05.1)
- Relatórios básicos (RF04.2)

### **Could Have (Desejável)**
- Recuperação de senha (RF01.3)
- Upload de comprovantes (RF03.1)
- Tema claro/escuro (RF05.3)
- Exportação de relatórios (RF04.2)

### **Won't Have (Não será feito no MVP)**
- Login social (Google, Facebook)
- Notificações push
- Integração bancária
- Múltiplas moedas
- App mobile nativo

---

<div align="center">
  <strong>📋 Requisitos definidos com foco no valor</strong><br/>
  <em>MVP viável e escalável para o futuro</em>
</div>
