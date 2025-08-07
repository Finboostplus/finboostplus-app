# 🔧 Backend - FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/Java-17+-f89820" alt="Java">
  <img src="https://img.shields.io/badge/Spring_Boot-3.2+-6db33f" alt="Spring Boot">
  <img src="https://img.shields.io/badge/PostgreSQL-15+-336791" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
</div>

**API REST** desenvolvida em **Spring Boot** para o FinBoost+. Fornece endpoints seguros para autenticação, gestão de grupos financeiros e controle de despesas compartilhadas.

---

## 🚀 **Funcionalidades Principais**

- 🔐 **Autenticação JWT** - Login e registro seguros
- 👥 **Gestão de Grupos** - Criação e gerenciamento de grupos financeiros
- 💰 **Controle de Despesas** - Registro e divisão automática de gastos
- 📊 **Relatórios** - Saldos e estatísticas em tempo real
- 🔒 **Segurança** - Spring Security com controle de acesso

---

## 🛠️ **Tecnologias**

### **Core**
- **Java 21+** - Linguagem principal
- **Spring Boot 3.5+** - Framework web
- **Spring Security** - Autenticação e autorização
- **PostgreSQL** - Banco de dados principal

### **Desenvolvimento**
- **Maven** - Gerenciamento de dependências
- **JUnit 5** - Testes unitários
- **Mockito** - Mocking para testes
- **H2** - Banco em memória para testes

---

## 📁 **Estrutura Resumida**

```
backend/
├── 📁 src/main/java/com/projeto/finboost/
│   ├── 🎮 controller/     # Endpoints REST
│   ├── 🔧 service/        # Lógica de negócio  
│   ├── 🗄️ model/          # Entidades JPA
│   ├── 🔍 repository/     # Acesso a dados
│   ├── 📦 dto/           # Data Transfer Objects
│   ├── ⚙️ config/        # Configurações
│   └── 🔐 security/      # Segurança JWT
├── 📁 src/main/resources/
│   ├── application.yml    # Configurações principais
│   └── 🗃️ db/migration/   # Scripts de banco
└── 📁 src/test/          # Testes automatizados
```

> 📖 **Documentação completa:** Veja nossa [documentação técnica](https://finboostplus.github.io/finboostplus-app/) para detalhes de arquitetura, APIs e guias avançados.

---

## ⚡ **Execução Rápida**

### **Pré-requisitos**
- Java 21+
- Maven 3.8+
- PostgreSQL 15+ (ou use Docker)

### **1. Configurar Banco de Dados**
```bash
# Opção 1: Docker (Recomendado)
docker run --name postgres-finboost \
  -e POSTGRES_DB=finboost \
  -e POSTGRES_USER=finboost \
  -e POSTGRES_PASSWORD=dev123 \
  -p 5432:5432 -d postgres:15

# Opção 2: PostgreSQL local
createdb finboost
```

### **2. Configurar Aplicação**
```bash
# Copiar arquivo de configuração
cp src/main/resources/application.yml.example src/main/resources/application.yml

# Editar configurações do banco (se necessário)
nano src/main/resources/application.yml
```

### **3. Executar Backend**
```bash
# Instalar dependências e executar
./mvnw clean install
./mvnw spring-boot:run

# ✅ API rodando em: http://localhost:8080
```

---

## 🧪 **Testes**

```bash
# Executar todos os testes
./mvnw test

# Testes com cobertura
./mvnw test jacoco:report

# Ver relatório de cobertura
open target/site/jacoco/index.html
```

---

## 📡 **Endpoints Principais**

```bash
# Autenticação
POST /api/auth/register    # Cadastro
POST /api/auth/login       # Login

# Grupos
GET  /api/groups          # Listar grupos
POST /api/groups          # Criar grupo

# Despesas  
GET  /api/expenses        # Listar despesas
POST /api/expenses        # Criar despesa

# Health Check
GET  /actuator/health     # Status da API
```

> 📋 **Documentação da API:** Acesse `/swagger-ui.html` quando a aplicação estiver rodando ou veja nossa [documentação completa](../docs/api).

---

## 🐳 **Docker (Opcional)**

```bash
# Executar backend + PostgreSQL
docker-compose up -d

# Verificar se subiu
curl http://localhost:8080/actuator/health
```

---

## 🔧 **Variáveis de Ambiente**

Crie um arquivo `.env` (opcional):

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finboost
DB_USER=finboost
DB_PASSWORD=dev123

# JWT
JWT_SECRET=sua_chave_secreta_muito_longa_aqui
JWT_EXPIRATION=86400000
```

---

## 🤝 **Contribuindo**

1. Siga as [convenções do projeto](../CONTRIBUTING.md)
2. Escreva testes para novas funcionalidades
3. Mantenha cobertura > 80%
4. Use padrões de commit: `feat:` `fix:` `test:`

---

## 📞 **Suporte**

- 🐛 **Issues:** [GitHub Issues](../../issues)
- 📖 **Docs:** [Documentação Técnica](../docs)
- 💬 **Discord:** [Nosso servidor](link-discord)

---

<div align="center">
  <strong>🔧 API Spring Boot - FinBoost+</strong><br/>
  <em>Desenvolvido pelo Grupo 7 - +Prati & Codifica</em>
</div>
