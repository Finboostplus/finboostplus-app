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

### 4.3 Estrutura Técnica Mínima

**Backend (Spring Boot)**

1. **Controllers:**

   - AuthController (login/register)
   - UserController (perfil)
   - GroupController (CRUD grupos)
   - ExpenseController (CRUD despesas)
   - BalanceController (cálculos)

2. **Models:**

   - User
   - Group
   - Expense
   - UserGroup (relacionamento)

3. **Services:**
   - AuthService
   - GroupService
   - ExpenseService
   - BalanceService

**Frontend (React)**

1. **Pages:**

   - Login/Register
   - Dashboard
   - Group Detail
   - Add Expense
   - Profile

2. **Components:**
   - ExpenseList
   - BalanceCard
   - MemberList
   - ExpenseForm

**Database (PostgreSQL)**

1. **Tables:**
   - users
   - groups
   - expenses
   - user_groups
   - expense_splits

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

### [RF01] Cadastro de Usuário

**Descrição:** O sistema deve permitir o cadastro de novos usuários.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome, e-mail, senha (ou login via conta Google)  
**Saída:** Usuário cadastrado e redirecionado para a tela de login.

---

### [RF02] Login

**Descrição:** O sistema deve permitir login de usuários existentes.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** E-mail e senha (ou conta Google)  
**Saída:** Acesso à interface principal do sistema.

---

### [RF03] Criação e Gerenciamento de Grupos

**Descrição:** O sistema deve permitir criar grupos (ex: casal, família), convidar membros, visualizar membros e aceitar convites.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Nome do grupo, descrição, código de convite ou e-mail dos membros  
**Saída:** Grupo criado com sucesso e membros adicionados.

---

### [RF04] Cadastro e Registro de Despesas

**Descrição:** O sistema deve permitir registrar despesas (individuais ou em grupo), com opção de divisão igual ou personalizada.  
**Atores:** Usuário  
**Prioridade:** Essencial  
**Entradas:** Valor, descrição, data, categoria, pagador, participantes envolvidos  
**Saída:** Despesa registrada com saldo atualizado.

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

#### [RNF02] Capacidade de Usuários

- Suportar pelo menos 50 usuários simultâneos (adequado para projeto acadêmico)

#### [RNF03] Capacidade de Dados

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

#### [RNF08] Autenticação

- Senhas criptografadas (hash + salt)
- Sessões seguras
- Timeout de sessão após inatividade

#### [RNF09] Autorização

- Validação de permissões em todas as operações
- Isolamento de dados entre grupos
- Prevenção de acesso não autorizado

#### [RNF10] Proteção de Dados

- Comunicação HTTPS
- Sanitização de inputs
- Proteção contra SQL Injection básica

### 9.5 Manutenibilidade

#### [RNF11] Código Limpo

- Padrões de codificação consistentes
- Comentários em funções complexas
- Separação clara de responsabilidades (MVC)

#### [RNF12] Versionamento

- Uso de Git com commits descritivos
- Branches para features principais
- README com instruções de instalação

### 9.6 Portabilidade

#### [RNF13] Compatibilidade de Navegadores

- Chrome (versão atual)
- Firefox (versão atual)
- Edge (versão atual)

#### [RNF14] Responsividade

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

### 9.7 Tecnológicos

#### [RNF15] Arquitetura

- Backend: Spring Boot + PostgreSQL
- Frontend: React + CSS/Tailwind
- API RESTful
- Separação clara entre camadas

#### [RNF16] Banco de Dados

- Normalização adequada
- Índices em campos de consulta frequente
- Constraints de integridade referencial

---

## 10. Premissas e Restrições

### 10.1 Restrições de Prazo

- Desenvolvimento: MVP em até 5 semanas e prazo final do trabalho até 10 de dezembro de 2025.
- Equipe: 10 pessoas
- Priorização rigorosa das funcionalidades essenciais

### 10.2 Restrições Tecnológicas

- Stack definida: Spring Boot + React + PostgreSQL
- Integração de IA para futuras funcionalidades
- Sem integrações externas complexas (bancos, pagamentos)
- Deploy em ambiente de desenvolvimento/teste

### 10.3 Restrições de Recursos

- Projeto acadêmico (sem orçamento para serviços pagos)
- Foco em demonstrar competências técnicas
- Dados de demonstração suficientes

---

## 11. Cronograma e Próximos Passos

- Prazo final para a entrega do trabalho: 10 de dezembro de 2025
- Marcos recomendados:
  - Finalização do backend e frontend básico: 3 semanas
  - Integração frontend-backend: 1 semana
  - Testes de usabilidade e ajustes finais: 1 semana

---

## 12. Equipe Responsável

- Alan (Gestão de Projeto)
- Ana (Frontend)
- Bruno (Backend)
- Cleyton (Frontend)
- Cristiano (Backend)
- Eduardo (Backend)
- Ellen (Frontend)
- João (Backend)
- Mariana (Frontend)
- Raquel (Frontend)

---
