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

### [RF01] Cadastro de Usuário

**Descrição:** O sistema deve permitir o cadastro de novos usuários.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome, e-mail, senha (ou login via conta Google)  
**Saída:** Usuário cadastrado e redirecionado para a tela de login.

### [RF02] Login

**Descrição:** O sistema deve permitir login de usuários existentes.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** E-mail e senha (ou conta Google)  
**Saída:** Acesso à interface principal do sistema.

### [RF03] Criação e Gerenciamento de Grupos

**Descrição:** O sistema deve permitir criar grupos, convidar membros, visualizar membros e aceitar convites.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome do grupo, descrição, código de convite ou e-mail dos membros  
**Saída:** Grupo criado com sucesso e membros adicionados.

### [RF04] Cadastro e Registro de Despesas

**Descrição:** O sistema deve permitir registrar despesas com opção de divisão igual ou personalizada.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Valor, descrição, data, categoria, pagador, participantes envolvidos  
**Saída:** Despesa registrada com saldo atualizado.

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

**Descrição:** O sistema pode enviar alertas por e-mail, whatsapp ou app quando limites de um orçamento forem ultrapassados.  
**Atores:** Sistema  
**Prioridade:** Desejável  
**Entradas:** Parâmetros definidos pelo usuário (limites de gasto, categoria)
**Saída:** Alerta enviado.

---

## Observações

- Funcionalidades como leitura de QR code, integração com bancos, IA, múltiplas moedas e auditoria ficam para versões futuras.
- Os requisitos foram derivados de personas reais e validados com base nas user stories e no MVP.

---

## 3. Requisitos Não Funcionais (RNF)

### 3.1 Desempenho

#### [RNF01] Tempo de Resposta

**Descrição:** O sistema deve responder às requisições do usuário em tempo adequado.  
**Critério:**

- Operações básicas (login, cadastro): máximo 3 segundos
- Cálculos de saldo: máximo 5 segundos
- Carregamento de páginas: máximo 4 segundos

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

#### [RNF05] Acessibilidade Básica

**Descrição:** O sistema deve atender requisitos básicos de acessibilidade.  
**Critério:**

- Contraste adequado de cores
- Textos alternativos para imagens
- Navegação por teclado

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

#### [RNF08] Autenticação

**Descrição:** O sistema deve garantir que apenas usuários autenticados acessem suas informações.  
**Critério:**

- Senhas criptografadas (hash + salt)
- Sessões seguras
- Timeout de sessão após inatividade

#### [RNF09] Autorização

**Descrição:** Usuários só podem acessar dados dos grupos aos quais pertencem.  
**Critério:**

- Validação de permissões em todas as operações
- Isolamento de dados entre grupos
- Prevenção de acesso não autorizado

#### [RNF10] Proteção de Dados

**Descrição:** Dados sensíveis devem ser protegidos.  
**Critério:**

- Comunicação HTTPS
- Sanitização de inputs
- Proteção contra SQL Injection básica

### 3.5 Manutenibilidade

#### [RNF11] Código Limpo

**Descrição:** O código deve ser bem estruturado e documentado.  
**Critério:**

- Padrões de codificação consistentes
- Comentários em funções complexas
- Separação clara de responsabilidades (MVC)

#### [RNF12] Versionamento

**Descrição:** O código deve ser versionado adequadamente.  
**Critério:**

- Uso de Git com commits descritivos
- Branches para features principais
- README com instruções de instalação

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

### 3.7 Tecnológicos

#### [RNF15] Arquitetura

**Descrição:** O sistema deve seguir arquitetura adequada para o escopo.  
**Critério:**

- Backend: Spring Boot + PostgreSQL
- Frontend: React + CSS/Tailwind
- API RESTful
- Separação clara entre camadas

#### [RNF16] Banco de Dados

**Descrição:** O banco deve ser estruturado adequadamente.  
**Critério:**

- Normalização adequada
- Índices em campos de consulta frequente
- Constraints de integridade referencial

---

## 4. Restrições

### 4.1 Restrições de Prazo

- Desenvolvimento: até 10 de dezembro de 2025.
- Equipe: 10 pessoas
- Priorização rigorosa das funcionalidades essenciais

### 4.2 Restrições Tecnológicas

- Stack definida: Spring Boot + React + PostgreSQL
- Integração com de IA para implementação de novas funcionalidades
- Sem integrações externas complexas (bancos, pagamentos)
- Deploy em ambiente de desenvolvimento/teste

### 4.3 Restrições de Recursos

- Projeto acadêmico (sem orçamento para serviços pagos)
- Foco em demonstrar competências técnicas
- Dados de demonstração suficientes

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

## 6. Glossário

**Grupo:** Conjunto de usuários que compartilham despesas (ex: casal, família, república)

**Despesa Compartilhada:** Gasto que é dividido entre membros de um grupo

**Saldo:** Valor que uma pessoa deve ou tem a receber em relação ao grupo

**Divisão Igual:** Divisão do valor total da despesa pelo número de participantes

**Divisão Personalizada:** Divisão onde cada participante paga um valor específico

**MVP:** Produto Mínimo Viável - versão com funcionalidades essenciais
