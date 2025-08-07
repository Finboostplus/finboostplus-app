# 📋 Requisitos do Sistema - FinBoost+

Este documento especifica os requisitos funcionais e não funcionais do sistema FinBoost+, baseado no documento oficial de requisitos do projeto acadêmico.

---

## 🎯 **Objetivo do Sistema**

Desenvolver uma aplicação web para **controle financeiro compartilhado** que permita a criação de grupos, registro de despesas e cálculo automático de saldos entre participantes. Este é um projeto final de curso com prazo até dezembro de 2025.

---

## ⚙️ **Requisitos Funcionais (RF)**

### **RF01 - Cadastro e Gestão de Usuário**
**Prioridade:** Essencial  
- Cadastro com nome, email e senha
- Login via email/senha ou OAuth2 (Google)
- Gestão completa de perfil
- Entidade "Perfil" com dados pessoais e preferências
- Validação rigorosa de dados de entrada
- Criptografia de senhas (hash + salt)
- Verificação de email opcional

### **RF02 - Login e Autenticação Segura**
**Prioridade:** Essencial  
- Login tradicional (email + senha)
- Implementação de OAuth2 para login social (Google)
- Emissão de token JWT com expiração e refresh token
- Fluxo de recuperação de senha por email (link único, validade limitada)
- 2FA opcional via OTP para ações críticas
- Proteção contra ataques de força bruta

### **RF03 - Criação e Gerenciamento de Grupos**
**Prioridade:** Essencial  
- Criação de grupos com nome e descrição
- Convite de membros por email ou código de convite
- Visualização de membros
- Aceitação/recusa de convites
- Definição automática do criador como administrador

### **RF04 - Cadastro e Registro de Despesas com CRUD Completo**
**Prioridade:** Essencial  
- Registro com valor, descrição, data, categoria, pagador, participantes
- CRUD completo para todas as entidades
- Filtros dinâmicos e paginação em listagens
- Consulta detalhada incluindo relacionamentos e metadados
- Pesquisa avançada com filtros em múltiplos campos
- Divisão igual ou personalizada de despesas
- Histórico de alterações

### **RF05 - Cálculo Automático de Saldos**
**Prioridade:** Essencial  
- Cálculo automático de quanto cada participante deve ou recebe
- Saldo individual e resumo de "quem deve para quem"
- Atualização em tempo real após mudanças

### **RF06 - Dashboard Resumo**
**Prioridade:** Essencial  
- Visão geral das finanças do grupo e usuário
- Total gasto, últimas despesas, saldos
- Débitos e créditos consolidados

### **RF07 - Categorias de Despesas**
**Prioridade:** Essencial  
- Categorias básicas: Alimentação, Transporte, Casa, Lazer, Outros
- Organização e visualização por categoria

### **RF08 - Metas de Economia** *(Importante)*
**Prioridade:** Importante  
- Definição de metas individuais ou familiares
- Acompanhamento de progresso
- Alertas de acompanhamento

### **RF09 - Alertas Simples** *(Desejável)*
**Prioridade:** Desejável  
- Alertas por email quando limites de orçamento forem ultrapassados
- Configuração de parâmetros pelo usuário

### **RF10 - Navegação e Usabilidade Avançada**
**Prioridade:** Importante  
- Navegação fluida com animações suaves
- Estrutura de menus e rotas clara
- Breadcrumbs para orientação
- Interface responsiva (mobile-first)
- Feedback visual claro e em tempo real
- Navegação por teclado para acessibilidade

### **RF11 - Listagem e Organização Avançada**
**Prioridade:** Importante  
- Listas paginadas ou carregamento contínuo (infinite scroll)
- Reorganização de itens (drag and drop)
- Filtros dinâmicos e ordenação múltipla
- Lazy loading para performance
- Pesquisa em tempo real
- Exportação de dados básica

### **RF12 - Sistema de Preferências e Personalização** *(Desejável)*
**Prioridade:** Desejável  
- Tema claro/escuro
- Configurações de notificações
- Preferências de visualização (formato de data, moeda)
- Configurações de privacidade
- Sincronização entre dispositivos

---

## 🛡️ **Requisitos Não Funcionais (RNF)**

### **RNF01 - Performance e Tempo de Resposta**
- Operações básicas (login, cadastro): máximo 3 segundos
- Cálculos de saldo: máximo 5 segundos
- Carregamento de páginas: máximo 4 segundos
- Cache distribuído (Redis ou equivalente)
- Lazy loading e otimização de queries
- Evitar re-renderizações desnecessárias no frontend

### **RNF02 - Capacidade e Escalabilidade**
- Suportar pelo menos 50 usuários simultâneos
- Máximo 1000 usuários cadastrados
- Máximo 100 grupos
- Máximo 10.000 despesas
- Arquitetura modular ou microsserviços
- Preparação para load balancing futuro

### **RNF03 - Segurança**
- Senhas criptografadas (hash + salt)
- Sessões seguras com JWT e refresh token
- OAuth2 para login social (Google)
- 2FA opcional via OTP
- Proteção contra OWASP Top 10 (SQL Injection, XSS, CSRF)
- HTTPS obrigatório em produção
- Rate limiting para prevenir ataques
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options)

### **RNF04 - Usabilidade e Acessibilidade**
- Interface intuitiva (máximo 3 cliques para funcionalidades principais)
- Interface responsiva (mobile-first)
- Contraste adequado de cores
- Textos alternativos para imagens
- Navegação por teclado
- Compatibilidade com leitores de tela
- Feedback visual claro e em tempo real
- Animações suaves e não invasivas

### **RNF05 - Confiabilidade**
- 95% de disponibilidade durante horário comercial
- Backup automático diário do banco de dados
- Mensagens de erro claras e acionáveis
- Não perder dados do usuário em caso de erro
- Logs de erro detalhados para debug
- Monitoramento de saúde da aplicação

### **RNF06 - Manutenibilidade e DevOps**
- Código bem estruturado com padrões consistentes
- Separação clara de responsabilidades (MVC)
- Comentários em funções complexas
- Testes automatizados (coverage > 80%)
- Uso de Git com commits descritivos
- Pipeline de CI/CD (GitHub Actions)
- Containerização com Docker
- Documentação técnica completa (Swagger/OpenAPI)

### **RNF07 - Portabilidade e Compatibilidade**
- Compatibilidade com Chrome, Firefox, Edge (versões atuais)
- Responsividade: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- Containerização com Docker
- Configuração via variáveis de ambiente
- Deploy automatizado via CI/CD
- Suporte a múltiplos ambientes (dev, staging, prod)

---

## 🔧 **Stack Tecnológica**

### **Frontend**
- **Framework:** React 19+
- **Build Tool:** Vite 7+
- **Styling:** CSS/TailwindCSS
- **Roteamento:** React Router
- **Estado Global:** Context API ou Redux
- **HTTP Client:** Axios ou Fetch API
- **Testing:** Jest + React Testing Library

### **Backend**
- **Linguagem:** Java 21+
- **Framework:** Spring Boot 3.5+
- **Security:** Spring Security + JWT
- **Database:** PostgreSQL 15+
- **ORM:** JPA/Hibernate
- **Cache:** Redis (futuro)
- **Testing:** JUnit 5 + Mockito

### **Infraestrutura**
- **Containerização:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Documentação:** MkDocs Material + Swagger/OpenAPI
- **Monitoramento:** Spring Actuator
- **Deploy:** Heroku/Railway (MVP)

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
- [x] Usuário consegue se cadastrar e fazer login
- [x] Usuário consegue criar e participar de grupos
- [x] Usuário consegue registrar despesas compartilhadas
- [x] Sistema calcula saldos automaticamente
- [x] Interface é responsiva e intuitiva

### **Técnico**
- [ ] Cobertura de testes > 80%
- [ ] Performance adequada (carregamento < 4s)
- [x] Segurança implementada (JWT, validações)
- [x] Documentação completa
- [x] Deploy automatizado funcionando

### **Qualidade**
- [x] Código segue padrões estabelecidos
- [x] Interface acessível e usável
- [x] Tratamento adequado de erros
- [x] Logs e monitoramento implementados

---

## 📈 **Priorização (MoSCoW)**

### **Must Have (Obrigatório)**
- Autenticação básica (RF01, RF02)
- Gestão de grupos (RF03)
- Registro de despesas (RF04)
- Cálculo de saldos (RF05)
- Interface responsiva (RF10)

### **Should Have (Importante)**
- Dashboard principal (RF06)
- Categorias de despesas (RF07)
- Navegação avançada (RF10)
- Listagem otimizada (RF11)

### **Could Have (Desejável)**
- Metas de economia (RF08)
- Alertas simples (RF09)
- Personalização (RF12)
- Exportação de relatórios

### **Won't Have (Não será feito no MVP)**
- Login social completo (apenas Google)
- Notificações push
- Integração bancária
- Múltiplas moedas
- App mobile nativo
- IA/Sugestões inteligentes

---

## 📚 **Contexto Acadêmico**

### **Restrições do Projeto**
- **Prazo:** Até dezembro de 2025
- **Equipe:** 10 pessoas (6 backend, 2 frontend, 1 gestão, 1 design)
- **Orçamento:** Projeto acadêmico (sem orçamento para serviços pagos)
- **Foco:** Demonstrar competências técnicas do curso

### **Alinhamento com Requisitos do Curso**

**Backend:**
- ✅ Autenticação e segurança (OAuth2, JWT, 2FA)
- ✅ CRUD completo com filtros e paginação
- ✅ API RESTful documentada (Swagger)
- ✅ Testes automatizados
- ✅ Cache e otimização

**Frontend:**
- ✅ Interface responsiva e acessível
- ✅ Navegação fluida com React Router
- ✅ Gerenciamento de estado
- ✅ Componentização
- ✅ Testes unitários

**DevOps:**
- ✅ Containerização com Docker
- ✅ Pipeline CI/CD
- ✅ Documentação técnica
- ✅ Versionamento com Git

---

<div align="center">
  <strong>📋 Requisitos definidos com foco no valor</strong><br/>
  <em>MVP viável e escalável para o futuro</em>
</div>
