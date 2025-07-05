# 🔧 Backend - Controle Financeiro Compartilhado

<div align="center">
  <img src="https://img.shields.io/badge/Java-17+-orange" alt="Java">
  <img src="https://img.shields.io/badge/Spring_Boot-3.2+-green" alt="Spring Boot">
  <img src="https://img.shields.io/badge/PostgreSQL-15+-blue" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Maven-3.8+-red" alt="Maven">
</div>

API REST desenvolvida em **Spring Boot** para gerenciamento de finanças compartilhadas. Fornece endpoints seguros para autenticação, gestão de grupos, controle de despesas e geração de relatórios.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração](#-configuração)
- [Execução](#-execução)
- [Endpoints](#-endpoints-principais)
- [Testes](#-testes)
- [Docker](#-docker)

---

## 🛠️ Tecnologias

### Core
- **☕ Java 17** - Linguagem principal
- **🍃 Spring Boot 3.2+** - Framework web
- **📦 Maven 3.8+** - Gerenciamento de dependências

### Dependências Principais
- **🔐 Spring Security 6** - Autenticação e autorização
- **🗄️ Spring Data JPA** - Acesso a dados
- **🔄 Hibernate 6** - ORM
- **🐘 PostgreSQL** - Banco de dados
- **🎯 Spring Validation** - Validação de dados
- **📊 Spring Boot Actuator** - Monitoramento

### Desenvolvimento & Testes
- **🧪 JUnit 5** - Testes unitários
- **🎭 Mockito** - Mocking para testes
- **🗃️ H2 Database** - Banco em memória para testes
- **📱 TestContainers** - Testes de integração

---

## 📁 Estrutura do Projeto

```plaintext
backend/
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/com/projeto/controle/
│   │   │   ├── 📁 controller/           # Controladores REST
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── UserController.java
│   │   │   │   ├── GroupController.java
│   │   │   │   └── ExpenseController.java
│   │   │   ├── 📁 service/              # Lógica de negócio
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── GroupService.java
│   │   │   │   └── ExpenseService.java
│   │   │   ├── 📁 model/                # Entidades JPA
│   │   │   │   ├── User.java
│   │   │   │   ├── Group.java
│   │   │   │   ├── Expense.java
│   │   │   │   └── UserGroup.java
│   │   │   ├── 📁 repository/           # Repositórios
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── GroupRepository.java
│   │   │   │   └── ExpenseRepository.java
│   │   │   ├── 📁 dto/                  # Data Transfer Objects
│   │   │   │   ├── request/
│   │   │   │   └── response/
│   │   │   ├── 📁 config/               # Configurações
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtConfig.java
│   │   │   │   └── DatabaseConfig.java
│   │   │   ├── 📁 security/             # Segurança
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   └── CustomUserDetailsService.java
│   │   │   ├── 📁 exception/            # Tratamento de exceções
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── CustomExceptions.java
│   │   │   └── Application.java         # Classe principal
│   │   └── 📁 resources/
│   │       ├── application.yml          # Configurações
│   │       ├── application-dev.yml      # Ambiente de desenvolvimento
│   │       ├── application-prod.yml     # Ambiente de produção
│   │       └── 📁 db/migration/         # Scripts Flyway
│   │           ├── V001__Create_users_table.sql
│   │           ├── V002__Create_groups_table.sql
│   │           └── V003__Create_expenses_table.sql
│   └── 📁 test/                         # Testes
│       ├── 📁 java/com/projeto/controle/
│       │   ├── 📁 controller/           # Testes de controller
│       │   ├── 📁 service/              # Testes de service
│       │   └── 📁 repository/           # Testes de repository
│       └── 📁 resources/
│           └── application-test.yml     # Configurações de teste
├── pom.xml                              # Dependências Maven
├── Dockerfile                           # Container Docker
└── README.md                            # Este arquivo
```

---

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=controle_financeiro
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=sua_chave_secreta_jwt_muito_longa_e_segura
JWT_EXPIRATION=86400000

# Email (opcional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu_email@gmail.com
MAIL_PASSWORD=sua_senha_app
```

### 2. Configuração do Banco de Dados

```sql
-- Criar banco de dados
CREATE DATABASE controle_financeiro;

-- Criar usuário (opcional)
CREATE USER controle_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE controle_financeiro TO controle_user;
```

### 3. Configuração do `application.yml`

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:controle_financeiro}
    username: ${DB_USER:postgres}
    password: ${DB_PASSWORD:password}
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        format_sql: true

  flyway:
    enabled: true
    baseline-on-migrate: true

jwt:
  secret: ${JWT_SECRET:default_secret_key}
  expiration: ${JWT_EXPIRATION:86400000}
```

---

## 🚀 Execução

### Pré-requisitos
- Java 17+
- Maven 3.8+
- PostgreSQL 15+

### Comandos

```bash
# Instalar dependências
./mvnw clean install

# Executar aplicação
./mvnw spring-boot:run

# Executar com profile específico
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Executar com debug
./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"

# Gerar JAR
./mvnw clean package

# Executar JAR
java -jar target/controle-financeiro-backend-1.0.0.jar
```

### Verificação da Aplicação

```bash
# Health check
curl http://localhost:8080/actuator/health

# Swagger UI (se habilitado)
# Acesse: http://localhost:8080/swagger-ui.html
```

---

## 🔗 Endpoints Principais

### Autenticação
```http
POST /api/auth/register     # Cadastro
POST /api/auth/login        # Login
POST /api/auth/refresh      # Refresh token
```

### Usuários
```http
GET    /api/users/profile   # Perfil do usuário
PUT    /api/users/profile   # Atualizar perfil
DELETE /api/users/account   # Deletar conta
```

### Grupos
```http
GET    /api/groups          # Listar grupos
POST   /api/groups          # Criar grupo
GET    /api/groups/{id}     # Detalhes do grupo
PUT    /api/groups/{id}     # Atualizar grupo
DELETE /api/groups/{id}     # Deletar grupo
POST   /api/groups/{id}/members/{userId}  # Adicionar membro
```

### Despesas
```http
GET    /api/expenses        # Listar despesas
POST   /api/expenses        # Criar despesa
GET    /api/expenses/{id}   # Detalhes da despesa
PUT    /api/expenses/{id}   # Atualizar despesa
DELETE /api/expenses/{id}   # Deletar despesa
```

### Relatórios
```http
GET /api/reports/group/{groupId}/summary    # Resumo do grupo
GET /api/reports/user/balance               # Saldo do usuário
GET /api/reports/group/{groupId}/expenses   # Despesas por período
```

---

## 🧪 Testes

### Executar Testes
```bash
# Todos os testes
./mvnw test

# Testes unitários apenas
./mvnw test -Dtest="*UnitTest"

# Testes de integração apenas
./mvnw test -Dtest="*IntegrationTest"

# Testes com cobertura
./mvnw test jacoco:report

# Testes de uma classe específica
./mvnw test -Dtest="UserServiceTest"
```

### Estrutura de Testes
- **Unit Tests**: Testam componentes isolados
- **Integration Tests**: Testam integração entre componentes
- **Repository Tests**: Testam acesso a dados
- **Controller Tests**: Testam endpoints REST

### Relatórios
- **Cobertura**: `target/site/jacoco/index.html`
- **Surefire**: `target/surefire-reports/`

---

## 🐳 Docker

### Construir Imagem
```bash
# Construir imagem
docker build -t controle-financeiro-backend .

# Executar container
docker run -p 8080:8080 --env-file .env controle-financeiro-backend
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres
      - DB_NAME=controle_financeiro
      - DB_USER=postgres
      - DB_PASSWORD=password
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=controle_financeiro
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

---

## 📊 Monitoramento

### Actuator Endpoints
```bash
# Métricas da aplicação
curl http://localhost:8080/actuator/metrics

# Informações da aplicação
curl http://localhost:8080/actuator/info

# Beans gerenciados
curl http://localhost:8080/actuator/beans
```

### Logs
```bash
# Alterar nível de log em runtime
curl -X POST http://localhost:8080/actuator/loggers/com.projeto.controle \
  -H "Content-Type: application/json" \
  -d '{"configuredLevel": "DEBUG"}'
```

---

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**
   - Verifique se PostgreSQL está rodando
   - Confirme credenciais no `application.yml`

2. **Erro de JWT**
   - Verifique se `JWT_SECRET` está configurado
   - Confirme se token não expirou

3. **Erro de permissões**
   - Verifique roles e authorities do usuário
   - Confirme configuração do Spring Security

### Logs Úteis
```bash
# Logs em tempo real
./mvnw spring-boot:run | grep ERROR

# Logs do banco
tail -f /var/log/postgresql/postgresql-15-main.log
```

---

## 🤝 Contribuição

1. Siga os padrões de código do projeto
2. Escreva testes para novas funcionalidades
3. Documente endpoints no Swagger
4. Mantenha cobertura de testes > 80%

---

<div align="center">
  <strong>🔧 Backend desenvolvido com Spring Boot</strong>
</div>