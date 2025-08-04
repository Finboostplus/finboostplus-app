# Documento de Requisitos Completo - Aplicativo de Controle Financeiro Compartilhado (MVP)

## 1. Introdução

### 1.1 Objetivo do Documento

Este documento define os requisitos funcionais e não funcionais para o desenvolvimento do MVP (Produto Mínimo Viável) de um aplicativo de controle financeiro compartilhado.

### 1.2 Escopo do Projeto

Permitir que usuários criem grupos (casais, famílias, repúblicas), registrem despesas compartilhadas e visualizem de forma clara quem deve o quê para quem.

### 1.3 Contexto Acadêmico

Este é um projeto final de curso de desenvolvimento fullstack, com prazo limitado para 10 de dezembro de 2025 com uma equipe de 10 pessoas, priorizando funcionalidades essenciais que demonstrem competência técnica e entregem valor real.

---

## 2. Requisitos Funcionais (RF)

### [RF01] Cadastro e Gestão de Usuário

**Descrição:** O sistema deve permitir o cadastro de novos usuários e gestão completa de perfil.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome, e-mail, senha (ou login via conta Google)  
**Saída:** Usuário cadastrado e redirecionado para a tela de login.
**Requisitos Técnicos:**
- Entidade "Perfil" com dados pessoais (nome, e-mail) e preferências (tema, notificações)
- Consulta e edição de perfil e configurações
- Validação rigorosa de dados de entrada
- Criptografia de senhas (hash + salt)
- Verificação de e-mail opcional

### [RF02] Login e Autenticação Segura

**Descrição:** O sistema deve permitir login de usuários existentes com autenticação segura e múltiplas opções.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** E-mail e senha (ou conta Google via OAuth2)  
**Saída:** Acesso à interface principal do sistema com token JWT
**Requisitos Técnicos:**
- Implementação de OAuth2 para login social (Google)
- Emissão de token JWT com expiração e refresh token
- Fluxo de recuperação de senha por e-mail (link único, validade limitada)
- 2FA opcional via OTP para ações críticas
- Proteção contra ataques de força bruta

### [RF03] Criação e Gerenciamento de Grupos

**Descrição:** O sistema deve permitir criar grupos, convidar membros, visualizar membros e aceitar convites.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome do grupo, descrição, código de convite ou e-mail dos membros  
**Saída:** Grupo criado com sucesso e membros adicionados.

### [RF04] Cadastro e Registro de Despesas com CRUD Completo

**Descrição:** O sistema deve permitir registrar despesas com operações completas de CRUD, filtros e busca avançada.  
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
- Registro de histórico de buscas para sugestões
- Divisão igual ou personalizada de despesas

### [RF05] Cálculo Automático de Saldos

**Descrição:** O sistema deve calcular automaticamente quanto cada participante deve ou tem a receber.  
**Atores:** Sistema  
**Prioridade:** Essencial  
**Entradas:** Lista de despesas e participantes  
**Saída:** Saldo individual e resumo de "quem deve para quem".

### [RF06] Dashboard Resumo

**Descrição:** O sistema deve mostrar uma visão geral das finanças do grupo e do usuário.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Automáticas via sistema  
**Saída:** Total gasto, últimas despesas, saldos, débitos e créditos.

### [RF07] Categorias de Despesas

**Descrição:** O sistema deve oferecer categorias básicas para organização das despesas.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Categoria da despesa (Alimentação, Transporte, Casa, Lazer, Outros)  
**Saída:** Registro categorizado e visualização por categoria.

### [RF08] Metas de Economia

**Descrição:** O usuário poderá definir metas de economia individual ou familiar (ex: poupar R$ 300 por mês).  
**Atores:** Usuário  
**Prioridade:** Importante  
**Entradas:** Nome da meta, valor-alvo, prazo estimado  
**Saída:** Exibição do progresso em relação à meta.

### [RF09] Alertas Simples

**Descrição:** O sistema pode enviar alertas por e-mail quando limites de um orçamento forem ultrapassados.  
**Atores:** Sistema  
**Prioridade:** Desejável  
**Entradas:** Parâmetros definidos pelo usuário (limites de gasto, categoria)
**Saída:** Alerta enviado.

### [RF10] Navegação e Usabilidade Avançada

**Descrição:** O sistema deve garantir navegação fluida, intuitiva e acessível.  
**Atores:** Usuário  
**Prioridade:** Importante  
**Entradas:** Interações do usuário  
**Saída:** Interface responsiva e acessível
**Requisitos Técnicos:**
- Navegação fluida entre páginas com animações suaves
- Estrutura de menus e rotas clara e lógica
- Breadcrumbs para orientação do usuário
- Interface responsiva (mobile-first approach)
- Feedback visual claro e em tempo real
- Navegação por teclado para acessibilidade

### [RF11] Listagem e Organização Avançada

**Descrição:** O sistema deve exibir dados de forma organizada, interativa e otimizada.  
**Atores:** Usuário  
**Prioridade:** Importante  
**Entradas:** Dados do sistema  
**Saída:** Listagens otimizadas e interativas
**Requisitos Técnicos:**
- Listas paginadas ou carregamento contínuo (infinite scroll)
- Possibilidade de reorganizar itens (drag and drop)
- Filtros dinâmicos e ordenação múltipla
- Lazy loading para melhor performance
- Pesquisa em tempo real
- Exportação de dados básica

### [RF12] Sistema de Preferências e Personalização

**Descrição:** O usuário deve poder personalizar a experiência de uso da aplicação.  
**Atores:** Usuário  
**Prioridade:** Desejável  
**Entradas:** Configurações do usuário  
**Saída:** Interface personalizada
**Requisitos Técnicos:**
- Tema claro/escuro
- Configurações de notificações (e-mail, frequência)
- Preferências de visualização (formato de data, moeda)
- Configurações de privacidade
- Salvamento automático de configurações no perfil
- Sincronização entre dispositivos

### [RF13] Detalhes de Itens com Interatividade

**Descrição:** O sistema deve exibir informações detalhadas com recursos interativos.  
**Atores:** Usuário  
**Prioridade:** Importante  
**Entradas:** Seleção de itens pelo usuário  
**Saída:** Visualização detalhada com metadados
**Requisitos Técnicos:**
- Visualização detalhada de despesas com histórico
- Comentários em despesas (opcional)
- Tags e categorização avançada
- Anexo de comprovantes (futuro)
- Histórico de alterações
- Compartilhamento de informações

---

## Observações

- Funcionalidades como leitura de QR code, integração com bancos, IA, múltiplas moedas e auditoria ficam para versões futuras.
- Os requisitos foram derivados de personas reais e validados com base nas user stories e no MVP.

---

## 3. Requisitos Não Funcionais (RNF)

### 3.1 Desempenho

#### [RNF01] Tempo de Resposta e Performance

**Descrição:** O sistema deve responder às requisições do usuário em tempo adequado e com boa performance.  
**Critério:**

- Operações básicas (login, cadastro): máximo 3 segundos
- Cálculos de saldo: máximo 5 segundos
- Carregamento de páginas: máximo 4 segundos
- Cache distribuído (Redis ou equivalente)
- Lazy loading, índices adequados e otimização de queries
- Evitar re-renderizações desnecessárias no frontend

#### [RNF02] Capacidade de Usuários

**Descrição:** O sistema deve suportar múltiplos usuários simultâneos.  
**Critério:** Suportar pelo menos 50 usuários simultâneos (adequado para projeto acadêmico)

#### [RNF03] Capacidade de Dados

**Descrição:** O sistema deve suportar volume adequado de dados.  
**Critério:**

- Máximo 1000 usuários cadastrados
- Máximo 100 grupos
- Máximo 10.000 despesas

### 3.2 Usabilidade

#### [RNF04] Interface Intuitiva

**Descrição:** O sistema deve ser fácil de usar, mesmo para usuários não técnicos.  
**Critério:**

- Máximo 3 cliques para qualquer funcionalidade principal
- Interface responsiva (mobile-first)
- Feedback visual para todas as ações

#### [RNF05] Acessibilidade e Usabilidade Avançada

**Descrição:** O sistema deve atender requisitos avançados de acessibilidade e usabilidade.  
**Critério:**

- Contraste adequado de cores
- Textos alternativos para imagens
- Navegação por teclado
- Compatibilidade com leitores de tela
- Feedback visual claro e em tempo real
- Animações suaves e não invasivas
- Breadcrumbs para orientação
- Máximo 3 cliques para qualquer funcionalidade principal

### 3.3 Confiabilidade

#### [RNF06] Disponibilidade

**Descrição:** O sistema deve estar disponível durante o período de avaliação.  
**Critério:** 95% de disponibilidade durante horário comercial (adequado para projeto acadêmico)

#### [RNF07] Recuperação de Erros

**Descrição:** O sistema deve tratar erros graciosamente.  
**Critério:**

- Mensagens de erro claras e acionáveis
- Não perder dados do usuário em caso de erro
- Logs de erro para debug

### 3.4 Segurança

#### [RNF08] Autenticação e Autorização Avançada

**Descrição:** O sistema deve garantir autenticação robusta e autorização adequada.  
**Critério:**

- Senhas criptografadas (hash + salt)
- Sessões seguras com JWT e refresh token
- Timeout de sessão após inatividade
- OAuth2 para login social (Google)
- 2FA opcional via OTP para ações críticas
- Fluxo de recuperação de senha seguro

#### [RNF09] Proteção e Segurança de APIs

**Descrição:** As APIs devem ser protegidas contra ataques comuns.  
**Critério:**

- Proteção de APIs via JWT e HTTPS obrigatório
- Mitigação de SQL Injection, XSS e CSRF
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options)
- Validação rigorosa de entrada
- Rate limiting para prevenir ataques de força bruta

#### [RNF10] Isolamento e Controle de Acesso

**Descrição:** Dados sensíveis devem ser protegidos com controle de acesso adequado.  
**Critério:**

- Validação de permissões em todas as operações
- Isolamento de dados entre grupos
- Prevenção de acesso não autorizado
- Logs de auditoria para ações críticas
- Sanitização de inputs
- Proteção contra OWASP Top 10

### 3.5 Manutenibilidade e DevOps

#### [RNF11] Código Limpo e Arquitetura

**Descrição:** O código deve ser bem estruturado, documentado e seguir boas práticas.  
**Critério:**

- Padrões de codificação consistentes
- Comentários em funções complexas
- Separação clara de responsabilidades (MVC)
- Arquitetura modular ou microsserviços
- Code splitting e separação de responsabilidades
- Testes automatizados (Jest, Testing Library)

#### [RNF12] Versionamento e Deploy

**Descrição:** O código deve ser versionado adequadamente com pipeline de deploy.  
**Critério:**

- Uso de Git com commits descritivos
- Branches para features principais
- Pipeline de CI/CD (GitHub Actions, GitLab CI ou Jenkins)
- Containerização com Docker
- README com instruções de instalação
- Documentação de ambiente local

#### [RNF13] Documentação Técnica Completa

**Descrição:** O projeto deve ter documentação técnica abrangente.  
**Critério:**

- Guia de configuração do ambiente local
- Documentação de API: Swagger / OpenAPI
- Exemplos de chamadas de API (Postman/Insomnia)
- Diagramas de modelo de dados (ER) e fluxos principais
- Guia do usuário (básico ou detalhado)
- Comentários no código explicando pontos importantes
- Diagramas simples de arquitetura e componentes

### 3.6 Portabilidade

#### [RNF13] Compatibilidade de Navegadores

**Descrição:** O sistema deve funcionar nos principais navegadores.  
**Critério:**

- Chrome (versão atual)
- Firefox (versão atual)
- Edge (versão atual)

#### [RNF14] Responsividade

**Descrição:** O sistema deve funcionar em diferentes tamanhos de tela.  
**Critério:**

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

### 3.7 Tecnológicos e Escalabilidade

#### [RNF15] Arquitetura e Stack Tecnológica

**Descrição:** O sistema deve seguir arquitetura adequada com stack moderna.  
**Critério:**

- Backend: Spring Boot + PostgreSQL
- Frontend: React + CSS/Tailwind + TypeScript (opcional)
- API RESTful com documentação Swagger/OpenAPI
- Separação clara entre camadas
- Navegação: React Router
- Chamadas de API: Axios, Fetch API
- Estado Global: Redux, Context API
- Componentes auxiliares em linguagens diversas, conforme necessidade

#### [RNF16] Banco de Dados e Performance

**Descrição:** O banco deve ser estruturado adequadamente com foco em performance.  
**Critério:**

- PostgreSQL como banco principal
- Normalização adequada
- Índices em campos de consulta frequente
- Constraints de integridade referencial
- Cache distribuído (Redis)
- Otimização de queries complexas

#### [RNF17] Escalabilidade e Monitoramento

**Descrição:** O sistema deve ser preparado para crescimento e monitoramento.  
**Critério:**

- Arquitetura modular ou microsserviços
- Containerização com Docker
- Logs estruturados para debug e monitoramento
- Métricas de performance básicas
- Preparação para load balancing futuro

---

## 4. Restrições e Alinhamento Acadêmico

### 4.1 Restrições de Prazo

- Desenvolvimento: até o final de outubro de 2025
- Equipe: 10 pessoas (7 backend, 2 frontend, 1 gestão)
- Priorização rigorosa das funcionalidades essenciais
- Foco em demonstrar competências técnicas do curso

### 4.2 Restrições Tecnológicas Alinhadas ao Curso

- Stack obrigatória: Spring Boot + React + PostgreSQL
- Implementação de todos os requisitos funcionais do curso backend
- Implementação de todos os requisitos funcionais do curso frontend
- Integração com ferramentas de IA para implementação de novas funcionalidades
- Deploy em ambiente de desenvolvimento/teste com Docker
- Pipeline CI/CD obrigatório
- Documentação técnica completa (Swagger, README, diagramas)

### 4.3 Restrições de Recursos Acadêmicos

- Projeto de conclusão de curso (sem orçamento para serviços pagos)
- Foco em demonstrar competências técnicas aprendidas na formação
- Validação com dados de demonstração realistas
- Apresentação e defesa do projeto obrigatória
- Documentação acadêmica completa

### 4.4 Requisitos Mínimos para Aprovação

- Todos os requisitos funcionais essenciais implementados
- Autenticação segura com OAuth2 e JWT
- CRUD completo para todas as entidades
- API RESTful documentada (Swagger)
- Frontend responsivo e acessível
- Testes automatizados básicos
- Deploy com Docker
- Pipeline CI/CD funcional
- Documentação técnica completa

---

## 5. Critérios de Aceitação

### 5.1 Funcionalidades Essenciais

- Usuário consegue se cadastrar e fazer login
- Usuário consegue criar um grupo e convidar membros
- Usuário consegue registrar uma despesa e dividi-la
- Sistema calcula automaticamente quem deve o quê
- Dashboard mostra resumo claro da situação financeira

### 5.2 Qualidade Técnica

- Código bem estruturado e documentado
- Tratamento adequado de erros
- Interface responsiva e intuitiva
- Funcionalidades essenciais sem bugs críticos

### 5.3 Entrega Acadêmica

- Demonstração funcional completa
- Documentação técnica adequada
- Apresentação dos resultados
- Código disponível no repositório

---

## 7. Alinhamento com Requisitos do Curso

### 7.1 Requisitos Backend Atendidos

**Autenticação e Segurança:**
- Login social (OAuth2) e cadastro próprio
- Emissão de token JWT com expiração e refresh
- Fluxo de recuperação de senha por e-mail
- 2FA opcional via OTP para ações críticas

**Gestão de Usuário:**
- Entidade "Perfil" com dados pessoais e preferências
- Consulta e edição de perfil e configurações

**CRUD de Entidades:**
- Criação, leitura, atualização e exclusão para todas as entidades
- Filtros dinâmicos e paginação em listagens

**Detalhes de Item:**
- Consulta detalhada incluindo relacionamentos
- Cálculo de métricas simples (contagem, soma, média)

**Pesquisa Avançada:**
- Busca full-text com filtros em múltiplos campos
- Registro de histórico de buscas

### 7.2 Requisitos Frontend Atendidos

**Autenticação de Usuário:**
- Login seguro com OAuth2 e autenticação social
- Recuperação de senha e verificação de e-mail

**Gerenciamento de Perfis:**
- Gerenciamento de informações básicas de perfil
- Personalização (tema claro/escuro, notificações)

**Navegação e Usabilidade:**
- Navegação fluida com animações e breadcrumbs
- Estrutura de menus e rotas clara

**Listagem e Organização:**
- Listas paginadas ou carregamento contínuo
- Reorganização de itens (drag and drop)

**Detalhes com Interatividade:**
- Informações detalhadas de itens
- Recursos de comentários e avaliações

**Pesquisa e Filtros:**
- Buscas com filtros avançados
- Sugestões baseadas em histórico

### 7.3 Requisitos Não Funcionais Atendidos

**Backend:**
- Proteção de APIs via JWT e HTTPS
- Mitigação de SQL Injection, XSS e CSRF
- Cache distribuído (Redis)
- Arquitetura modular
- Containerização com Docker
- Pipeline de CI/CD
- Documentação completa (Swagger/OpenAPI)

**Frontend:**
- Performance e otimização (lazy loading, caching)
- Segurança (prevenção XSS, CSRF)
- Usabilidade e acessibilidade
- Escalabilidade e manutenibilidade
- CI/CD integrado

### 7.4 Tecnologias Alinhadas

- **Backend:** Spring Boot (Java)
- **Frontend:** React com Javascript
- **Banco:** PostgreSQL
- **Cache:** Redis
- **Container:** Docker
- **CI/CD:** GitHub Actions
- **Documentação:** Swagger/OpenAPI
- **Testes:** Jest, Testing Library
- **Navegação:** React Router
- **Estado:** Context API/Redux
- **Estilização:** Tailwind CSS

---

## 8. Glossário

**Grupo:** Conjunto de usuários que compartilham despesas (ex: casal, família, república)

**Despesa Compartilhada:** Gasto que é dividido entre membros de um grupo

**Saldo:** Valor que uma pessoa deve ou tem a receber em relação ao grupo

**Divisão Igual:** Divisão do valor total da despesa pelo número de participantes

**Divisão Personalizada:** Divisão onde cada participante paga um valor específico

**MVP:** Produto Mínimo Viável - versão com funcionalidades essenciais

---

## 9. Histórico de Versões

| Versão | Data | Autor | Justificativa das Mudanças |
|--------|------|-------|---------------------------|
| **v1.0** | **Julho 2025** | **Equipe FinBoost+** | **Versão inicial dos requisitos** - Definição dos requisitos funcionais e não funcionais básicos para um MVP de controle financeiro compartilhado, focado nas necessidades das personas identificadas. |
| **v2.0** | **04 de Agosto de 2025** | **Alan (Gestão) + Equipe** | **Expansão para Conformidade Acadêmica Completa** - Atualização abrangente para alinhar 100% com os requisitos obrigatórios do curso de desenvolvimento fullstack. Principais adições:<br/>**Requisitos Funcionais:**<br/>• RF01-RF02: Autenticação avançada (OAuth2, JWT, 2FA, recuperação de senha)<br/>• RF04: CRUD completo com filtros dinâmicos e pesquisa avançada<br/>• RF10-RF13: Navegação avançada, listagens otimizadas, personalização, interatividade<br/>**Requisitos Não Funcionais:**<br/>• Segurança robusta (OWASP Top 10, headers de segurança, rate limiting)<br/>• Performance otimizada (Redis, lazy loading, code splitting)<br/>• DevOps completo (Docker, CI/CD, documentação Swagger)<br/>• Acessibilidade e responsividade avançadas<br/>**Documentação:**<br/>• Seção completa de alinhamento com requisitos do curso<br/>• Checklist de tecnologias obrigatórias<br/>• Critérios de aprovação acadêmica detalhados<br/>**Impacto**: Evolução natural que preserva 100% do escopo original com qualidade profissional. |

### **Comparativo de Versões**

| Aspecto | v1.0 (Básica) | v2.0 (Acadêmica) | Benefício |
|---------|---------------|------------------|-----------|
| **Autenticação** | E-mail + Senha | OAuth2 + JWT + 2FA | ↑ Segurança e UX |
| **CRUD** | Básico | Completo + Filtros + Busca | ↑ Funcionalidade |
| **Frontend** | Simples | Responsivo + Acessível | ↑ Usabilidade |
| **Backend** | API REST | API + Cache + Métricas | ↑ Performance |
| **DevOps** | Manual | CI/CD + Docker | ↑ Manutenibilidade |
| **Documentação** | Básica | Swagger + Diagramas | ↑ Profissionalismo |
| **Core do Produto** | Preservado | Preservado | Consistência |

### **Validação da Evolução**

**Funcionalidades Core Mantidas:**
- Criação e gestão de grupos 
- Registro e divisão de despesas  
- Cálculo automático de saldos 
- Dashboard de resumo financeiro 

**Personas Continuam Atendidas:**
- Marina (Gastadora Impulsiva) 
- Gabriel (Estudante Consciente) 
- João e Letícia (Casal Organizado) 
- Marcos e Vanessa (Família) 

**Critérios de Sucesso Fortalecidos:**
- "Dividir conta em 5 minutos" → Melhorado com UX otimizada
- "Saber quanto deve/recebe" → Melhorado com dashboard avançado
- "Evitar discussões" → Melhorado com transparência total

### **Rastreabilidade das Mudanças v2.0**

**Requisitos Funcionais Expandidos:**
- `RF01-RF02` - Autenticação robusta (OAuth2, JWT, 2FA)
- `RF04` - CRUD completo com filtros e pesquisa avançada
- `RF10-RF13` - Novos requisitos para UX/UI avançada

**Requisitos Não Funcionais Reformulados:**
- `RNF01-RNF03` - Performance otimizada (cache, lazy loading)
- `RNF08-RNF10` - Segurança avançada (OWASP, headers, rate limiting)
- `RNF11-RNF13` - DevOps completo (CI/CD, Docker, documentação)
- `RNF15-RNF18` - Arquitetura profissional e escalável

**Seções Novas:**
- `Seção 4` - Restrições e Alinhamento Acadêmico
- `Seção 7` - Alinhamento com Requisitos do Curso  
- `Seção 9` - Histórico de Versões (esta seção)

**Critérios de Aprovação Adicionados:**
- Coverage de testes >70%
- Pipeline CI/CD funcional
- Documentação Swagger completa
- Deploy com Docker
- Conformidade com padrões de acessibilidade

---

### **Metadados do Documento**

**Documento:** Documento de Requisitos Completo - FinBoost+ MVP  
**Versão Atual:** v2.0  
**Data da Última Atualização:** 04 de Agosto de 2025  
**Próxima Revisão Prevista:** Início de cada Sprint  
**Status:** Aprovado para desenvolvimento  
**Conformidade Acadêmica:** 100% alinhado com requisitos do curso  
**Baseline para Implementação:** Confirmado pela equipe técnica  

---
