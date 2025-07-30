# 💸 FinBoost+ - Controle Financeiro Pessoal ou Compartilhado

<div align="left">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
  <img src="https://img.shields.io/badge/Java-17+-orange" alt="Java">
  <img src="https://img.shields.io/badge/React-18+-blue" alt="React">
  <img src="https://img.shields.io/badge/Spring_Boot-3.2+-green" alt="Spring Boot">
  <img src="https://img.shields.io/badge/PostgreSQL-15+-blue" alt="PostgreSQL">
</div>

**Sistema fullstack para gerenciamento de finanças pessoais ou compartilhadas**. Permite o registro e divisão de despesas, acompanhamento de saldos individuais, geração de relatórios e sugestões inteligentes com uso de IA.

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-repositório)
- [Como Executar](#-como-executar-localmente)
- [Testes](#-testes)
- [Contribuição](#-como-contribuir)
- [Equipe](#-equipe-de-desenvolvimento)
- [Licença](#-licença)

---

## 🎯 Funcionalidades

### ✅ MVP (Versão Atual)

- [x] **Autenticação**: Cadastro e login seguro de usuários
- [x] **Gerenciamento de Grupos**: Criação e administração de grupos financeiros
- [x] **Controle de Despesas**: Adição e divisão automática de gastos
- [x] **Saldos em Tempo Real**: Visualização de saldo individual e do grupo
- [x] **Dashboard Intuitivo**: Resumo completo de gastos e estatísticas
- [x] **Histórico de Transações**: Visualização detalhada de todas as movimentações

### 🚀 Funcionalidades Futuras (Roadmap)

- [ ] **IA para Categorização**: Classificação automática de despesas
- [ ] **Sugestões Inteligentes**: Recomendações personalizadas de economia
- [ ] **Alertas Preditivos**: Notificações sobre gastos atípicos
- [ ] **Entrada por Voz**: Lançamento de despesas via speech-to-text
- [ ] **Leitura de QR Code**: Registro automático via códigos QR
- [ ] **Relatórios Avançados**: Análises detalhadas com gráficos
- [ ] **Integração Bancária**: Sincronização com contas bancárias
- [ ] **App Mobile**: Aplicativo nativo para iOS e Android

---

## 🛠️ Tecnologias Utilizadas

### 🔧 Backend

- **☕ Java 17+** - Linguagem principal
- **🍃 Spring Boot 3.2+** - Framework web
- **🔐 Spring Security** - Autenticação e autorização
- **🗄️ PostgreSQL** - Banco de dados relacional
- **🔄 JPA / Hibernate** - Mapeamento objeto-relacional
- **🧪 JUnit 5 + Mockito** - Testes unitários e de integração
- **📊 Spring Data JPA** - Acesso a dados simplificado

### 🎨 Frontend

- **⚛️ React.js 18+** - Biblioteca de interface
- **⚡ Vite** - Build tool e dev server
- **🎨 TailwindCSS** - Framework CSS utilitário
- **📡 Axios** - Cliente HTTP para requisições
- **🔐 JWT** - Autenticação via tokens
- **🧪 Jest + React Testing Library** - Testes de componentes
- **📊 Recharts** - Gráficos e visualizações

### 🚀 DevOps & Ferramentas

- **🐳 Docker** - Containerização
- **🔧 Maven** - Gerenciamento de dependências (Backend)
- **📦 npm** - Gerenciamento de pacotes (Frontend)
- **🌐 GitHub Actions** - CI/CD
- **📝 ESLint + Prettier** - Padronização de código

---

## 📁 Estrutura do Repositório

```
| Caminho           | Conteúdo                                                              |
|-------------------|-----------------------------------------------------------------------|
| `frontend/`       | Aplicação React (interface)                                           |
| `backend/`        | API REST em Spring Boot                                               |
| `docs/`           | Documentação técnica do projeto em Markdown (usada com MkDocs)        |
| `project_docs/`   | Documentos de planejamento, requisitos, MVPs, diagramas, atas, etc.   |
| `README.md`       | Apresentação geral do projeto                                         |

```

---

## 🚀 Como Executar Localmente

### 📋 Pré-requisitos

- **Node.js** 18+ e npm
- **Java** 17+ e Maven
- **PostgreSQL** 15+
- **Docker** (opcional)

### 🔧 Configuração do Ambiente

1. **Clone o repositório**

```bash
git clone https://github.com/sua-organizacao/controle-financeiro.git
cd controle-financeiro
```

2. **Configure o banco de dados**

```bash
# Crie um banco PostgreSQL
createdb controle_financeiro

# Configure as variáveis de ambiente
cp backend/src/main/resources/application.yml.example backend/src/main/resources/application.yml
```

### 🔙 Executando o Backend

```bash
cd backend

# Instale as dependências
./mvnw clean install

# Execute a aplicação
./mvnw spring-boot:run

# A API estará disponível em http://localhost:8080
```

### 🎨 Executando o Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# A aplicação estará disponível em http://localhost:5173
```

### 🐳 Executando com Docker

```bash
# Execute todos os serviços
docker-compose up -d

# Para parar os serviços
docker-compose down
```

---

## 🧪 Testes

### Backend

```bash
cd backend

# Executar todos os testes
./mvnw test

# Executar testes com relatório de cobertura
./mvnw test jacoco:report

# Executar apenas testes unitários
./mvnw test -Dtest="*UnitTest"

# Executar apenas testes de integração
./mvnw test -Dtest="*IntegrationTest"
```

### Frontend

```bash
cd frontend

# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

---

## 📊 Métricas e Qualidade

- **Cobertura de Testes**: Meta de 80%+
- **Análise de Código**: SonarQube
- **Performance**: Lighthouse Score 90+
- **Acessibilidade**: WCAG 2.1 AA

---

## 🤝 Como Contribuir

1. **Fork** este repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### 📝 Padrões de Commit

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas de manutenção

---

## 👥 Equipe de Desenvolvimento

| Área                     | Membros                              |
| ------------------------ | ------------------------------------ |
| **🏆 Gestão do Projeto** | Alan                                 |
| **🔧 Backend**           | Bruno, Cristiano, Eduardo, João      |
| **🎨 Frontend**          | Cleiton, Ana, Ellen, Mariana, Raquel |

---

## 🎓 Sobre o Projeto

Este projeto foi desenvolvido como trabalho final do curso **Desenvolvimento Full-Stack** da **Prati+**. O objetivo é demonstrar competências em:

- Desenvolvimento de APIs REST com Spring Boot
- Criação de interfaces modernas com React
- Implementação de autenticação e autorização
- Trabalho em equipe e metodologias ágeis
- Boas práticas de desenvolvimento e DevOps

---

## 📄 Licença

Este projeto é de **uso educacional**, desenvolvido no curso de **Desenvolvimento Full-Stack Jr – +Prati & Codifica**.

---

## 📬 Contato

Para dúvidas, sugestões ou feedback:

- 💬 **Discord**: [Link do servidor]
- 🐛 **Issues**: [Reporte bugs aqui](https://github.com/Finboostplus/finboost/issues)

---

<div align="center">
  <strong>Desenvolvido com 💙 pelo Grupo 7 da Turma 2 do curso Desenvolvimento Full-Stack Jr – +Prati & Codifica</strong>
</div>
