# Proposta de MVP

## 1. Título da Proposta

MVP do Controle Financeiro Pessoal e Compartilhado

---

## 2. Resumo Executivo

Sistema para gerenciar despesas pessoais e compartilhadas entre grupos. Permite cadastro e divisão automática de despesas, acompanhamento de saldos e geração de relatórios, com interface intuitiva para controle individual e em grupo. Com integração de inteligência artificial (IA) prevista para o futuro, o sistema irá sugerir estratégias de economia e investimentos personalizados baseados no perfil e hábitos financeiros do usuário.

---

## 3. Objetivo do MVP

Permitir que usuários criem grupos, registrem despesas compartilhadas e visualizem quem deve o quê para quem de forma simples e clara.

---

## 4. Descrição do Produto MVP

### 4.1 Funcionalidades Essenciais

1. **Autenticação Básica**

   - Login/Cadastro simples (email + senha)
   - Perfil básico (nome, foto opcional)
   - Logout

   **Justificativa:** Base necessária para identificar usuários e associar dados.

2. **Gerenciamento de Grupos**

   - Criar grupo (nome + descrição)
   - Convidar membros (por email ou código)
   - Aceitar convites
   - Visualizar membros do grupo

   **Justificativa:** Core da aplicação — sem grupos não há compartilhamento.

3. **Registro de Despesas**

   - Adicionar despesa (valor, descrição, data, categoria básica)
   - Escolher quem pagou
   - Definir divisão: igual entre todos ou valores específicos
   - Listar despesas do grupo
   - Editar/Excluir despesas próprias

   **Justificativa:** Funcionalidade principal que entrega valor imediato.

4. **Cálculo de Saldos**

   - Saldo individual (quanto cada um deve/tem a receber)
   - Resumo de quem deve para quem
   - Total gasto por pessoa

   **Justificativa:** Resolve o problema central dos usuários.

5. **Dashboard Simples**

   - Resumo do grupo (total gasto, saldo pessoal)
   - Últimas despesas
   - Status de débitos/créditos

   **Justificativa:** Visão geral rápida e intuitiva.

---

### 4.2 Funcionalidades para Versões Futuras

As funcionalidades nesta seção do documento não estão previstas para o MVP inicial e serão implementadas em versões futuras, a depender de validação e priorização.

- **IA/Alertas inteligentes**
- **Relatórios avançados**
- **Múltiplas moedas**
- **Fotos de recibos**
- **Notificações push** (inicialmente apenas e-mail)
- **Pagamentos integrados**
- **Categorias avançadas**
- **Histórico/Auditoria detalhada**
- **Temas/Personalização**

---

### 4.3 Estrutura Técnica Completa

**Backend (Spring Boot)**

1. **Controllers:**
   - AuthController (login, registro, OAuth2, recuperação de senha)
   - UserController (perfil, preferências)
   - GroupController (CRUD de grupos com filtros)
   - ExpenseController (CRUD de despesas com paginação)
   - BalanceController (cálculos e métricas)

2. **Models:**
   - User (com perfil e preferências)
   - Group
   - Expense
   - ExpenseSplit
   - UserGroup (relacionamento)
   - PasswordResetToken

3. **Services:**
   - AuthService (JWT, OAuth2, 2FA)
   - UserService
   - GroupService
   - ExpenseService
   - BalanceService
   - EmailService (recuperação de senha)
   - CacheService (Redis)

4. **Security & Validation:**
   - JWT Configuration
   - OAuth2 Configuration
   - Security Headers (CSP, HSTS, X-Frame-Options)
   - Input Validation & Sanitization
   - CSRF Protection

**Frontend (React)**

1. **Pages:**
   - Login/Register (com OAuth2)
   - Dashboard (com métricas e gráficos)
   - Groups (listagem paginada com filtros)
   - Expenses (CRUD com filtros avançados)
   - Profile (edição de dados e preferências)
   - PasswordRecovery

2. **Components:**
   - Header (navegação com breadcrumbs)
   - ExpenseList (paginação, filtros, drag & drop)
   - ExpenseForm (validação em tempo real)
   - GroupForm
   - UserProfile
   - ThemeToggle
   - Loading/ErrorBoundary
   - SearchBar (filtros avançados)

3. **Hooks/Context:**
   - AuthContext (JWT, refresh token)
   - ThemeContext
   - UserContext
   - NotificationContext

4. **Features Avançadas:**
   - Lazy loading
   - Code splitting
   - Infinite scroll
   - Responsive design
   - Acessibilidade (ARIA)

**Database (PostgreSQL)**

1. **Tables:**
   - users (com preferências e configurações)
   - groups
   - expenses
   - expense_splits
   - user_groups
   - password_reset_tokens
   - user_sessions

2. **Índices e Performance:**
   - user_id em expenses
   - group_id em expenses
   - created_at em expenses
   - email em users (único)

**Cache (Redis)**
   - Sessões JWT
   - Dados de usuário frequentemente acessados
   - Resultados de cálculos complexos
   - Cache de queries pesadas

**DevOps e Documentação**
   - Docker containers
   - GitHub Actions CI/CD
   - Swagger/OpenAPI documentation
   - Jest/Testing Library para testes
   - ESLint/Prettier para qualidade de código

---

## 5. Público-alvo

### Persona #1: Marina, a Gastadora Impulsiva

**Idade:** 26 anos  
**Profissão:** Social Media Freelancer  
**Estado civil e Localização:** Solteira, Belo Horizonte-MG

**Contexto de vida:**  
Trabalha com clientes diversos e tem renda instável. Gasta muito com compras online e não tem o costume de anotar seus gastos.

**Objetivo financeiro:**  
Gastar menos do que ganha, diminuir dívidas no cartão de crédito e evitar compras por impulso.

**Dores e Frustrações:**  
Não sabe quanto pode gastar, esquece de registrar, gasta por impulso e vive no limite do cartão.

**Como o app ajuda:**  
Notificações em tempo real sobre gastos\*, receber alertas de orçamento, classificar os gastos por categoria e relatórios visuais simples e informativos.

**Frase típica:**  
“Quando vi, já tinha estourado o cartão de novo.”

---

### Persona #2: Gabriel, o Estudante Consciente

**Idade:** 22 anos  
**Profissão:** Estagiário e estudante de Engenharia  
**Estado civil e Localização:** Solteiro, Recife-PE

**Contexto de vida:**  
Tem uma rotina apertada e quer fazer o dinheiro durar. Controla alguns gastos em caderno.

**Objetivo financeiro:**  
Ter uma reserva de emergência e controlar o quanto gasta com transporte e alimentação.

**Dores e Frustrações:**  
Falta de tempo e disciplina para registrar tudo.

**Como o app ajuda:**  
Cria alertas semanais*, mostra onde ele mais gasta* e calcula quanto ainda pode gastar\*.

**Frase típica:**  
“Preciso de algo rápido pra saber se ainda dá pra pedir delivery.”

---

### Persona #3: João e Letícia, o Casal Organizado

**Idade:** João (30) e Letícia (28)  
**Profissão:** Designer e Enfermeira  
**Estado civil e Localização:** Casados, São Paulo-SP

**Contexto de vida:**  
Moram juntos e dividem contas como aluguel, mercado e luz. Querem juntar dinheiro para uma viagem.

**Objetivo financeiro:**  
Evitar brigas por dinheiro e poupar mensalmente de forma justa.

**Dores e Frustrações:**  
Desorganização na divisão das despesas e esquecimento de quem pagou o quê.

**Como o app ajuda:**  
Permite divisão de despesas, visualização de quem pagou o quê e metas mensais conjuntas\*.

**Frase típica:**  
“Eu paguei o mercado mês passado, agora é sua vez!”

---

### Persona #4: Marcos e Vanessa, Família com Filha

**Idade:** 35 e 33 anos  
**Profissão:** Professor e Confeiteira  
**Estado civil e Localização:** Casados, Campinas-SP

**Contexto de vida:**  
Têm uma filha pequena e organizam o orçamento da casa com renda variável.

**Objetivo financeiro:**  
Ter controle das despesas domésticas e economizar para emergências.

**Dores e Frustrações:**  
Falta de controle de despesas fixas e dificuldades em acompanhar os pagamentos.

**Como o app ajuda:**  
Categorização de despesas por tipo, divisão das contas do lar, visualização dos saldos familiares.

**Frase típica:**  
“Precisamos saber para onde está indo nosso dinheiro todo mês.”

---

### Observação:

Funcionalidades marcadas com \* não estão previstas para o MVP e serão avaliadas para implementação futura.

---

## 6. Critérios de Sucesso

### 6.1 Valor

- Usuário consegue dividir conta do restaurante em até 5 minutos
- Sabe exatamente quanto deve/tem a receber
- Evita discussões sobre "quem pagou o quê"

### 6.2 Viabilidade

- Stack conhecida (React + Spring Boot + PostgreSQL)
- Sem integrações externas complexas
- CRUD simples + cálculos matemáticos básicos

### 6.3 Tempo

- Implementação de todas as funcionalidades do MVP em até 4 semanas, permitindo tempo para validação e possíveis melhorias.

### 6.4 Validação

- MVP considerado bem-sucedido se, após testes internos e piloto com pelo menos 10 usuários reais, receber feedback positivo (>70% satisfação), sem bugs críticos e com uso das principais funcionalidades.

---

## 7. Fluxo Principal do Usuário / User Stories

### 7.1 Exemplo de fluxo

1. Usuário cria conta

2. Cria um grupo "Viagem Rio"

3. Adiciona amigos ao grupo

4. Registra uma despesa "Almoço - R$ 120" (paga por Alan)

5. App divide R$ 40 pra cada (3 pessoas)

6. Dashboard mostra: Alan tem +R$ 80 a receber, os outros devem R$ 40 cada

---

### 7.2 User Stories

### Persona 1: Marina, a Gastadora Impulsiva

- Como Marina, quero receber notificações em tempo real sobre os meus gastos\*, para evitar ultrapassar os limites do cartão.
- Como Marina, quero ver alertas por categoria de gasto\*, para entender onde estou exagerando.
- Como Marina, quero ter dicas automáticas de economia\*, para melhorar meu controle financeiro.
- Como Marina, quero registrar facilmente minhas despesas, para acompanhar meus gastos diários.

### Persona 2: Gabriel, o Estudante Consciente

- Como Gabriel, quero cadastrar rapidamente meus gastos do dia a dia, para manter controle mesmo com pouco tempo.
- Como Gabriel, quero ver um gráfico com os gastos da semana\*, para decidir se posso gastar mais ou preciso economizar.
- Como Gabriel, quero criar metas semanais de gasto\*, para não comprometer minha reserva de emergência.

### Persona 3: João e Letícia, o Casal Organizado

- Como João e Letícia, queremos dividir as despesas domésticas de forma justa, para evitar discussões sobre quem pagou o quê.
- Como João e Letícia, queremos registrar quem fez cada pagamento, para acompanhar nossa organização financeira.
- Como João e Letícia, queremos definir metas conjuntas de economia\*, para juntar dinheiro para nossa viagem.

### Persona 4: Marcos e Vanessa, Família com Filha

- Como Marcos e Vanessa, queremos cadastrar despesas fixas da casa, para manter o controle mensal.
- Como Marcos e Vanessa, queremos visualizar quanto cada um contribuiu, para manter a divisão justa.
- Como Marcos e Vanessa, queremos definir uma meta de poupança familiar\*, para nos prepararmos para imprevistos.

---

### Observação:

Funcionalidades e histórias marcadas com \* não estão previstas para o MVP e serão avaliadas para implementação futura.

---

## 8. Requisitos Funcionais (mínimos)

### [RF01] Cadastro e Gestão de Usuário

**Descrição:** O sistema deve permitir o cadastro de novos usuários e gestão de perfil.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome, e-mail, senha (ou login via conta Google)  
**Saída:** Usuário cadastrado e redirecionado para a tela de login
**Requisitos Técnicos:**
- Entidade "Perfil" com dados pessoais (nome, e-mail) e preferências (tema, notificações)
- Consulta e edição de perfil e configurações
- Validação de dados de entrada
- Criptografia de senhas (hash + salt)

---

### [RF02] Login e Autenticação Segura

**Descrição:** O sistema deve permitir login de usuários existentes com autenticação segura.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** E-mail e senha (ou conta Google via OAuth2)  
**Saída:** Acesso à interface principal do sistema com token JWT
**Requisitos Técnicos:**
- Implementação de OAuth2 para login social
- Emissão de token JWT com expiração e refresh
- Fluxo de recuperação de senha por e-mail (link único, validade limitada)
- 2FA opcional via OTP para ações críticas

---

### [RF03] Criação e Gerenciamento de Grupos

**Descrição:** O sistema deve permitir criar grupos (ex: casal, família), convidar membros, visualizar membros e aceitar convites.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome do grupo, descrição, código de convite ou e-mail dos membros  
**Saída:** Grupo criado com sucesso e membros adicionados.

---

### [RF04] Cadastro e Registro de Despesas com CRUD Completo

**Descrição:** O sistema deve permitir registrar despesas (individuais ou em grupo), com opção de divisão igual ou personalizada, incluindo operações completas de CRUD.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Valor, descrição, data, categoria, pagador, participantes envolvidos  
**Saída:** Despesa registrada com saldo atualizado
**Requisitos Técnicos:**
- CRUD completo para todas as entidades de domínio
- Filtros dinâmicos e paginação em listagens
- Consulta detalhada incluindo relacionamentos e metadados
- Cálculo de métricas simples (contagem, soma, média)
- Pesquisa avançada com filtros em múltiplos campos

---

### [RF05] Cálculo Automático de Saldos

**Descrição:** O sistema deve calcular quanto cada participante deve ou tem a receber dentro de um grupo.  
**Atores:** Sistema  
**Prioridade:** Essencial  
**Entradas:** Lista de despesas e participantes  
**Saída:** Saldo individual e resumo de “quem deve para quem”.

---

### [RF06] Dashboard Resumo

**Descrição:** O sistema deve mostrar uma visão geral das finanças do grupo e do usuário.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Automáticas via sistema  
**Saída:** Total gasto, últimas despesas, saldos, débitos e créditos.

---

### [RF07] Categorias de Despesas

**Descrição:** O sistema deve oferecer categorias básicas e permitir registro por categoria.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Categoria da despesa  
**Saída:** Registro categorizado e visualização por categoria.

---

### [RF08] Metas de Economia (Individual ou Familiar)\*

**Descrição:** O usuário poderá definir metas de economia (ex: poupar R$ 300 por mês).  
**Atores:** Usuário  
**Prioridade:** Importante  
**Entradas:** Nome da meta, valor-alvo, prazo estimado  
**Saída:** Exibição do progresso em relação à meta.

---

### [RF09] Alertas Simples (E-mail)\*

**Descrição:** O sistema pode enviar alertas por e-mail quando um orçamento for ultrapassado.  
**Atores:** Sistema  
**Prioridade:** Desejável  
**Entradas:** Parâmetros definidos pelo usuário (limites de gasto, categoria)  
**Saída:** Alerta enviado.

---

### [RF10] Navegação e Usabilidade Avançada

**Descrição:** O sistema deve garantir navegação fluida e intuitiva.  
**Atores:** Usuário  
**Prioridade:** Importante  
**Entradas:** Interações do usuário  
**Saída:** Interface responsiva e acessível
**Requisitos Técnicos:**
- Navegação fluida entre páginas com animações
- Estrutura de menus e rotas clara
- Breadcrumbs para orientação
- Interface responsiva (mobile-first)

---

### [RF11] Listagem e Organização Avançada

**Descrição:** O sistema deve exibir dados de forma organizada e interativa.  
**Atores:** Usuário  
**Prioridade:** Importante  
**Entradas:** Dados do sistema  
**Saída:** Listagens otimizadas
**Requisitos Técnicos:**
- Listas paginadas ou carregamento contínuo (infinite scroll)
- Possibilidade de reorganizar itens (drag and drop)
- Filtros dinâmicos e ordenação
- Lazy loading para performance

---

### [RF12] Sistema de Preferências e Personalização

**Descrição:** O usuário deve poder personalizar a experiência de uso.  
**Atores:** Usuário  
**Prioridade:** Desejável  
**Entradas:** Configurações do usuário  
**Saída:** Interface personalizada
**Requisitos Técnicos:**
- Tema claro/escuro
- Configurações de notificações
- Preferências de visualização
- Salvamento de configurações no perfil

---

## Observações

- Funcionalidades marcadas com \* (ex: metas, gráficos, dicas automáticas, alertas, notificações push, IA, múltiplas moedas, auditoria, etc.) não serão implementadas no MVP inicial, ficando para versões futuras conforme validação e priorização.
- Os requisitos foram derivados de personas reais e validados com base nas user stories e no escopo do MVP.

---

## 9. Requisitos Não Funcionais

### 9.1 Desempenho

#### [RNF01] Tempo de Resposta

- Operações básicas (login, cadastro): máximo 3 segundos
- Cálculos de saldo: máximo 5 segundos
- Carregamento de páginas: máximo 4 segundos

#### [RNF02] Performance e Otimização

- Cache distribuído (Redis ou equivalente)
- Lazy loading, índices adequados e otimização de queries
- Evitar re-renderizações desnecessárias no frontend
- Code splitting e otimização de bundles

#### [RNF03] Capacidade do Sistema

- Suportar pelo menos 50 usuários simultâneos
- Máximo 1000 usuários cadastrados
- Máximo 100 grupos
- Máximo 10.000 despesas

### 9.2 Usabilidade

#### [RNF04] Interface Intuitiva

- Máximo 3 cliques para qualquer funcionalidade principal
- Interface responsiva (mobile-first)
- Feedback visual para todas as ações

#### [RNF05] Acessibilidade Básica

- Contraste adequado de cores
- Textos alternativos para imagens
- Navegação por teclado

### 9.3 Confiabilidade

#### [RNF06] Disponibilidade

- 95% de disponibilidade durante horário comercial (adequado para projeto acadêmico)

#### [RNF07] Recuperação de Erros

- Mensagens de erro claras e acionáveis
- Não perder dados do usuário em caso de erro
- Logs de erro para debug

### 9.4 Segurança

#### [RNF08] Autenticação e Autorização

- Senhas criptografadas (hash + salt)
- Sessões seguras com JWT
- Timeout de sessão após inatividade
- Proteção de APIs via JWT e HTTPS
- Mitigação de SQL Injection, XSS e CSRF
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options)

#### [RNF09] Autorização e Controle de Acesso

- Validação de permissões em todas as operações
- Isolamento de dados entre grupos
- Prevenção de acesso não autorizado
- 2FA opcional para ações críticas

#### [RNF10] Proteção de Dados

- Comunicação HTTPS obrigatória
- Sanitização de inputs
- Proteção contra SQL Injection
- Validação rigorosa de dados de entrada

### 9.5 Manutenibilidade e Deploy

#### [RNF11] Código Limpo e Arquitetura

- Padrões de codificação consistentes
- Comentários em funções complexas
- Separação clara de responsabilidades (MVC)
- Arquitetura modular ou microsserviços
- Componentes auxiliares em linguagens diversas, conforme necessidade

#### [RNF12] Versionamento e CI/CD

- Uso de Git com commits descritivos
- Branches para features principais
- Pipeline de CI/CD (GitHub Actions, GitLab CI ou Jenkins)
- Containerização com Docker
- README com instruções de instalação

#### [RNF13] Documentação Técnica

- Guia de configuração do ambiente local
- Exemplos de chamadas de API (Postman/Insomnia)
- Documentação de API: Swagger / OpenAPI
- Diagramas de modelo de dados (ER) e fluxos principais
- Guia do usuário básico
- Comentários no código explicando pontos importantes

### 9.6 Portabilidade e Compatibilidade

#### [RNF14] Compatibilidade de Navegadores

- Chrome (versão atual)
- Firefox (versão atual)
- Edge (versão atual)

#### [RNF15] Responsividade e Acessibilidade

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Contraste adequado de cores
- Textos alternativos para imagens
- Navegação por teclado
- Leitores de tela
- Feedback visual claro e em tempo real

### 9.7 Tecnológicos

#### [RNF16] Arquitetura e Stack

- Backend: Spring Boot + PostgreSQL
- Frontend: React + CSS/Tailwind 
- API RESTful
- Separação clara entre camadas
- Navegação: React Router
- Chamadas de API: Axios, Fetch API
- Estado Global: Redux, Context API
- Testes: Jest, Testing Library

#### [RNF17] Banco de Dados e Cache

- PostgreSQL como banco principal
- Normalização adequada
- Índices em campos de consulta frequente
- Constraints de integridade referencial
- Cache distribuído (Redis)

#### [RNF18] Ferramentas de Desenvolvimento

- Gestão de código: GitHub
- Containerização: Docker
- Documentação de API: Swagger/OpenAPI
- Testes automatizados
- Análise de código estático

---

## 10. Alinhamento com Requisitos Acadêmicos

### 10.1 Requisitos Backend do Curso - Status de Implementação

**Autenticação e Segurança (Obrigatório)**
- Login social (OAuth2) com Google
- Cadastro próprio com validação
- JWT com expiração e refresh token
- Recuperação de senha por e-mail
- 2FA opcional para ações críticas

**Gestão de Usuário (Obrigatório)**
- Entidade "Perfil" completa
- Preferências (tema, notificações)
- Edição de perfil e configurações

**CRUD de Entidades (Obrigatório)**
- CRUD completo para Users, Groups, Expenses
- Filtros dinâmicos em todas as listagens
- Paginação implementada

**Detalhes de Item (Obrigatório)**
- Relacionamentos entre entidades
- Cálculo de métricas (somas, médias)
- Metadados completos

**Pesquisa Avançada (Obrigatório)**
- Busca full-text em despesas
- Filtros múltiplos
- Histórico de buscas

### 10.2 Requisitos Frontend do Curso - Status de Implementação

**Autenticação de Usuário (Obrigatório)**
- Login seguro com OAuth2
- Recuperação de senha
- Verificação de e-mail

**Gerenciamento de Perfis (Obrigatório)**
- Perfil completo editável
- Personalização (tema claro/escuro)
- Configurações de notificações

**Navegação e Usabilidade (Obrigatório)**
- Navegação fluida com animações
- Breadcrumbs implementados
- Estrutura de rotas clara

**Listagem e Organização (Obrigatório)**
- Paginação em todas as listas
- Infinite scroll opcional
- Drag and drop para reordenação

**Detalhes com Interatividade (Obrigatório)**
- Páginas de detalhes completas
- Comentários em despesas
- Sistema de avaliações

**Pesquisa e Filtros (Obrigatório)**
- Filtros avançados por categoria, data, valor
- Sugestões baseadas em histórico
- Pesquisa em tempo real

### 10.3 Requisitos Não Funcionais - Conformidade Acadêmica

**Segurança (Obrigatório)**
- HTTPS obrigatório
- Proteção contra OWASP Top 10
- Headers de segurança
- JWT + refresh token

**Performance (Obrigatório)**
- Cache distribuído (Redis)
- Lazy loading
- Otimização de queries
- Code splitting

**Escalabilidade (Obrigatório)**
- Arquitetura modular
- Microsserviços preparados
- Docker containerization

**Manutenibilidade (Obrigatório)**
- CI/CD pipeline
- Testes automatizados
- Documentação completa
- Code quality tools

### 10.4 Tecnologias Mandatórias - Checklist

**Backend:**
- Java + Spring Boot
- PostgreSQL
- Redis (cache)
- Docker
- Swagger/OpenAPI

**Frontend:**
- React (com hooks)
- React Router
- Axios/Fetch
- Tailwind CSS
- Jest + Testing Library

**DevOps:**
- GitHub Actions (CI/CD)
- Docker Compose
- Environment configs

**Documentação:**
- README detalhado
- API documentation
- User guide
- Architecture diagrams

## 11. Premissas e Restrições

### Restrições de Prazo Acadêmico

- Desenvolvimento: MVP em até 5 semanas e prazo final do trabalho até o final de outubro de 2025
- Equipe: 9 pessoas (6 backend, 2 frontend e 1 gestão)
- Priorização rigorosa das funcionalidades essenciais do curso
- Demonstração obrigatória de todas as competências técnicas aprendidas

### Restrições Tecnológicas do Curso

- Stack obrigatória definida pelo curso: Spring Boot + React + PostgreSQL
- Implementação obrigatória de todos os requisitos funcionais do backend
- Implementação obrigatória de todos os requisitos funcionais do frontend
- Integração de IA para futuras funcionalidades (demonstração de aprendizado)
- Deploy obrigatório em ambiente com Docker
- Pipeline CI/CD obrigatório (GitHub Actions)
- Documentação técnica completa obrigatória

### Restrições de Recursos Acadêmicos

- Projeto de conclusão de curso (sem orçamento para serviços pagos)
- Foco obrigatório em demonstrar competências técnicas do curso
- Validação com dados de demonstração realistas
- Apresentação e defesa obrigatória do projeto
- Avaliação baseada na implementação dos requisitos do curso

### Entregáveis Obrigatórios para Aprovação

**Documentação:**
- README com setup completo
- Documentação de API (Swagger)
- Guia do usuário
- Diagramas de arquitetura e ER
- Exemplos de API (Postman/Insomnia)

**Código:**
- Todos os requisitos funcionais implementados
- Testes automatizados (mínimo 70% coverage)
- CI/CD pipeline funcional
- Docker deployment
- Code quality (ESLint, SonarQube)

**Demonstração:**
- Apresentação técnica completa
- Demo das funcionalidades principais
- Explicação das decisões arquiteturais
- Discussão de melhorias futuras

---

## 12. Equipe Responsável

- Alan (Gestão de Projeto)
- Bruno Henrique (Backend)
- Cristiano (Backend)
- João (Backend)
- Tulio Malta (Backend)
- Alisson (Backend)
- Pedro Henrique (Backend)
- Cleyton (Frontend)
- Hugo (Frontend)

---

## 13. Histórico de Versões

| Versão | Data | Autor | Justificativa das Mudanças |
|--------|------|-------|---------------------------|
| **v1.0** | **Julho 2025** | **Equipe FinBoost+** | **Versão inicial do MVP** - Definição das funcionalidades básicas do controle financeiro compartilhado com foco na resolução do problema central dos usuários. |
| **v2.0** | **04 de Agosto de 2025** | **Alan (Gestão) + Equipe** | **Alinhamento com Requisitos Acadêmicos do Curso** - Atualização completa para atender todos os requisitos funcionais e não funcionais obrigatórios do projeto de conclusão de curso. Principais mudanças:<br/>• **Backend**: Adição de OAuth2, JWT, 2FA, CRUD completo, filtros dinâmicos, pesquisa avançada<br/>• **Frontend**: Navegação avançada, acessibilidade, listagem otimizada, personalização<br/>• **DevOps**: Pipeline CI/CD obrigatório, Docker, documentação Swagger<br/>• **Segurança**: Implementação de todos os requisitos OWASP e headers de segurança<br/>• **Documentação**: Estrutura acadêmica completa com diagramas e guias<br/>**Resultado**: Projeto mantém 100% do core original (controle financeiro compartilhado) com qualidade profissional e conformidade acadêmica total. |

### **Notas sobre a Versão v2.0**

**Core Preservado:** Todas as funcionalidades essenciais da v1.0 foram mantidas e aprimoradas
**Valor Agregado:** Requisitos acadêmicos trouxeram melhorias reais ao produto
**Personas Atendidas:** Todas as 4 personas continuam sendo contempladas
**Critérios de Sucesso:** Mantidos e fortalecidos com melhor UX/UI
**Cronograma:** Adaptado para 8 semanas com entregas por sprint

### **Rastreabilidade das Mudanças v2.0**

**Requisitos Funcionais Adicionados:**
- `RF10` - Navegação e Usabilidade Avançada
- `RF11` - Listagem e Organização Avançada  
- `RF12` - Sistema de Preferências e Personalização

**Requisitos Não Funcionais Expandidos:**
- `RNF02` - Performance e Otimização (Redis, lazy loading)
- `RNF08-RNF10` - Segurança robusta (OAuth2, OWASP, headers)
- `RNF12-RNF13` - DevOps e Documentação completos

**Seções Novas:**
- `Seção 10` - Alinhamento com Requisitos Acadêmicos
- `Seção 11` - Premissas e Restrições Acadêmicas
- `Seção 12` - Cronograma Acadêmico detalhado
- `Seção 14` - Histórico de Versões (esta seção)

**Tecnologias Mandatórias Adicionadas:**
- Redis (cache distribuído)
- Swagger/OpenAPI (documentação)
- Jest + Testing Library (testes)
- Docker + GitHub Actions (DevOps)
- Acessibilidade (ARIA, navegação por teclado)

---

### **Metadados do Documento**

**Documento:** Proposta de MVP - FinBoost+ Controle Financeiro Compartilhado  
**Versão Atual:** v2.0  
**Data da Última Atualização:** 04 de Agosto de 2025  
**Próxima Revisão Prevista:** Sprint Review (a cada 2 semanas)  
**Status:** Aprovado para implementação  
**Aprovação Acadêmica:** Conforme requisitos do curso  

---
