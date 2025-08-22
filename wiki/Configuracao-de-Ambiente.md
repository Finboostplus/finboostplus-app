Esta página orienta como preparar seu ambiente de desenvolvimento para trabalhar no **FinBoost+**, incluindo instalação de ferramentas, configuração de variáveis e ajustes recomendados.

---

### Requisitos Mínimos

- **Java:** 21+
- **Node.js:** 18+
- **PostgreSQL:** 15+ (ou Docker)
- **Maven:** incluso no wrapper (`mvnw`)
- **Git:** 2.30+

---

### Ferramentas Recomendadas

#### IDEs e Editores

- **Frontend:** VS Code  
  **Extensões recomendadas:**
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - GitLens

- **Backend:** IntelliJ IDEA (Community ou Ultimate)  
  **Plugins recomendados:**
  - Spring Boot
  - Database Navigator
  - GitToolBox

---

### Usando Docker para o Banco de Dados

Ambiente PostgreSQL local via Docker:

```bash
docker run --name postgres-finboost-dev \
  -e POSTGRES_DB=finboost_dev \
  -e POSTGRES_USER=finboost \
  -e POSTGRES_PASSWORD=dev123 \
  -p 5432:5432 -d postgres:15
```

---

### Variáveis de Ambiente

Defina as variáveis no arquivo `application-dev.yml` (backend) e no `.env` (frontend).

#### Backend (application-dev.yml)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/finboost_dev
    username: finboost
    password: dev123

jwt:
  secret: chave_super_secreta
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:8080
```

---

### Configuração Inicial

```bash
# 1. Clonar repositório
git clone https://github.com/Finboostplus/finboostplus-app.git
cd finboostplus-app

# 2. Configurar backend
cd backend
./mvnw clean install

# 3. Configurar frontend
cd ../frontend
npm install
```

---

### Checklist de Ambiente Pronto

- [ ] Java instalado e configurado
- [ ] Node.js instalado e funcionando
- [ ] PostgreSQL (local ou Docker) rodando
- [ ] Variáveis de ambiente configuradas
- [ ] Projeto compila e executa localmente

---

**Relacionado:**  
[Como Rodar o Projeto](./Como-Rodar-o-Projeto) | [Guia de Deploy](./Guia-de-Deploy)