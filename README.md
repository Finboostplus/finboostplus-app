# 💸 FinBoost+ - Controle Financeiro Pessoal e Compartilhado

<div align="center">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
  <img src="https://img.shields.io/badge/Java-21+-orange" alt="Java">
  <img src="https://img.shields.io/badge/React-19+-61dafb" alt="React">
  <img src="https://img.shields.io/badge/Spring_Boot-3.5+-6db33f" alt="Spring Boot">
  <img src="https://img.shields.io/badge/PostgreSQL-15+-336791" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/License-MPL_2.0-blue.svg" alt="License">
</div>

<div align="center">
  <a href="https://codecov.io/gh/Finboostplus/finboostplus-app">
    <img src="https://codecov.io/gh/Finboostplus/finboostplus-app/branch/develop/graph/badge.svg?token=YOUR_CODECOV_TOKEN" alt="Coverage Status"/>
  </a>
  <a href="https://sonarcloud.io/dashboard?id=Finboostplus_finboostplus-app">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Finboostplus_finboostplus-app&metric=alert_status" alt="Quality Gate Status"/>
  </a>
  <a href="https://sonarcloud.io/dashboard?id=Finboostplus_finboostplus-app">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Finboostplus_finboostplus-app&metric=coverage" alt="Coverage"/>
  </a>
  <a href="https://sonarcloud.io/dashboard?id=Finboostplus_finboostplus-app">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=Finboostplus_finboostplus-app&metric=bugs" alt="Bugs"/>
  </a>
</div>

**Sistema fullstack para gerenciamento de finanças pessoais e compartilhadas**. Permite registro e divisão de despesas, acompanhamento de saldos individuais, geração de relatórios e sugestões inteligentes com IA.

> 🎓 **Projeto Final** do curso Desenvolvimento Full-Stack Jr – +Prati & Codifica

---

## 📚 Sumário

<details>
<summary><strong>Clique aqui para visualizar</strong></summary>
  
- [💸 FinBoost+ - Controle Financeiro Pessoal e Compartilhado](#-finboost---controle-financeiro-pessoal-e-compartilhado)
  - [📚 Sumário](#-sumário)
  - [🚀 **Demo ao Vivo**](#-demo-ao-vivo)
  - [🎯 **O que o FinBoost+ faz?**](#-o-que-o-finboost-faz)
    - [✅ **Funcionalidades Principais**](#-funcionalidades-principais)
  - [🛠️ **Tecnologias**](#️-tecnologias)
  - [📁 **Estrutura do Projeto**](#-estrutura-do-projeto)
  - [🚀 **Como Executar**](#-como-executar)
    - [📋 **Pré-requisitos**](#-pré-requisitos)
    - [⚡ **Execução Rápida (Recomendado)**](#-execução-rápida-recomendado)
    - [🔧 **Execução Manual**](#-execução-manual)
  - [🧪 **Testes e Cobertura**](#-testes-e-cobertura)
  - [👥 **Nossa Equipe**](#-nossa-equipe)
  - [🤝 **Como Contribuir**](#-como-contribuir)
  - [🎓 **Sobre o Projeto**](#-sobre-o-projeto)
  - [📞 **Suporte**](#-suporte)
  - [📄 **Licença**](#-licença)

</details>

---

## 🚀 **Demontração**

<!-- Adicionar quando tiver deploy -->
- 🌐 **Aplicação:** [FinBoost+](https://finboostplus-app-zeta.vercel.app/)
- 📚 **Documentação:** [FinBoost+ Docs](https://finboostplus.github.io/finboostplus-app/)

---

## 🎯 **O que o FinBoost+ faz?**

### ✅ **Funcionalidades Principais**

- 🔐 **Autenticação Segura** - Login e cadastro com JWT
- 👥 **Grupos Financeiros** - Crie e gerencie grupos de gastos compartilhados
- 💰 **Divisão Automática** - Divida despesas automaticamente entre membros
- 📊 **Dashboard Inteligente** - Visualize gastos e estatísticas em tempo real
- 💳 **Controle de Saldos** - Acompanhe quem deve para quem
- 📱 **Interface Responsiva** - Funciona perfeitamente em qualquer dispositivo

---

## 🛠️ **Tecnologias**

<table>
<tr>
<td><strong>🔙 Backend</strong></td>
<td><strong>🎨 Frontend</strong></td>
<td><strong>🗄️ Database</strong></td>
</tr>
<tr>
<td>
• Java 21+<br/>
• Spring Boot 3.5+<br/>
• Spring Security<br/>
• JPA/Hibernate<br/>
• Maven
</td>
<td>
• React 19+<br/>
• Vite<br/>
• TailwindCSS<br/>
• Axios<br/>
• Recharts
</td>
<td>
• PostgreSQL 15+<br/>
• Docker<br/>
• MkDocs<br/>
• GitHub Actions
</td>
</tr>
</table>

---

## 📁 **Estrutura do Projeto**

```
finboost/
├── 🎨 frontend/          # React App (Interface)
├── 🔙 backend/           # Spring Boot API  
├── 📚 docs/              # MkDocs (Documentação técnica)
├── 📋 project_docs/      # Planejamento e requisitos
└── 🐳 docker-compose.yml # Ambiente completo
```

> 📖 **Documentação completa:** Acesse nossa [documentação técnica](https://finboostplus.github.io/finboostplus-app/) para detalhes de arquitetura, APIs e guias avançados.

---

## 🚀 **Como Executar**

### 📋 **Pré-requisitos**
- Node.js 18+ e npm
- Java 21+ e Maven  
- PostgreSQL 15+ (ou Docker)

### ⚡ **Execução Rápida (Recomendado)**

```bash
# 1. Clone o projeto
git clone https://github.com/Finboostplus/finboostplus-app.git
cd finboostplus-app

# 2. Execute com Docker
docker-compose up -d

# 3. Acesse a aplicação
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
```

### 🔧 **Execução Manual**

<details>
<summary><strong>Clique para ver instruções detalhadas</strong></summary>

```bash
# Backend
cd backend
./mvnw clean install
./mvnw spring-boot:run

# Frontend (novo terminal)
cd frontend  
npm install
npm run dev
```

**Variáveis de ambiente:**
```bash
# backend/application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/finboost
    username: seu_usuario
    password: sua_senha
```

</details>

---

## 🧪 **Testes e Cobertura**

### 🚀 **Executar Testes**

```bash
# Backend (Spring Boot + JUnit)
cd backend/finboostplus_server
./mvnw test

# Frontend (Vitest + React Testing Library)  
cd frontend
npm test
npm run test:watch          # Modo watch
npm run test:ui             # Interface visual
```

### 📊 **Relatórios de Cobertura HTML**

```bash
# Backend - Gera relatório HTML com JaCoCo
cd backend/finboostplus_server
./mvnw test jacoco:report
# Visualizar: abrir backend/finboostplus_server/target/site/jacoco/index.html

# Frontend - Gera relatório HTML com Vitest
cd frontend
npm run test:coverage:html
# Visualizar: abrir frontend/coverage/index.html
```

### 📈 **Onde Encontrar os Relatórios**

| Componente | Localização do Relatório HTML | Comando |
|------------|--------------------------------|---------|
| **Backend** | `backend/finboostplus_server/target/site/jacoco/index.html` | `./mvnw test jacoco:report` |
| **Frontend** | `frontend/coverage/index.html` | `npm run test:coverage:html` |

### 🎯 **Cobertura Online**

- 📊 **Codecov:** [Dashboard de Cobertura](https://codecov.io/gh/Finboostplus/finboostplus-app)
- 🔍 **SonarCloud:** [Análise de Qualidade](https://sonarcloud.io/dashboard?id=Finboostplus_finboostplus-app)

> 💡 **Dica:** Os relatórios HTML são gerados automaticamente após executar os testes com cobertura e oferecem visualização detalhada linha por linha do código testado.

---

## 👥 **Nossa Equipe**

<table>
<tr>
<td align="center"><strong>🏆 Gestão</strong></td>
<td align="center"><strong>🔙 Backend</strong></td>
<td align="center"><strong>🎨 Frontend</strong></td>
</tr>
<tr>
<td align="center">Alan</td>
<td align="center">Bruno, Cristiano<br/>Eduardo, João<br/>Pedro, Alisson, Túlio</td>
<td align="center">Cleiton, Hugo e Ana</td>
</tr>
</table>

---

## 🤝 **Como Contribuir**

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

**Padrões de commit:** `feat:` `fix:` `docs:` `style:` `refactor:` `test:`

---

## 🎓 **Sobre o Projeto**

O **FinBoost+** foi desenvolvido como projeto final do curso **Desenvolvimento Full-Stack Jr** da **+Prati & Codifica**. 

**Objetivos de aprendizado:**
- ✅ APIs REST com Spring Boot
- ✅ Interfaces modernas com React  
- ✅ Autenticação JWT
- ✅ Trabalho em equipe (Metodologia Ágil)
- ✅ DevOps e boas práticas

---

## 📞 **Suporte**

- 🐛 **Bugs:** [Issues](https://github.com/Finboostplus/finboostplus-app/issues)
- 📧 **Email:** finboostplus@gmail.com

---

## 📄 **Licença**

Distribuído sob a **MPL-2.0**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

<div align="center">
  <strong>Desenvolvido com 💙 pelo Grupo 7 da Turma 2</strong><br/>
  <em>+Prati & Codifica - 2025</em>
</div>
