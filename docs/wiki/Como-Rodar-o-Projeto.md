Este guia explica como executar o projeto **FinBoost+** em ambiente local para desenvolvimento e testes.

---

### Backend (Java + Spring Boot)

#### Pré-requisitos
- **Java 21+**
- **PostgreSQL**
- Variáveis de ambiente configuradas **ou** arquivo `application.yml`

#### Executando
```bash
cd backend
./mvnw spring-boot:run
```

**Dica:** Para evitar conflito entre ambientes de desenvolvimento e produção, utilize perfis separados no Spring Boot (`application-dev.yml`, `application-prod.yml`).

---

### Frontend (React + Vite)

#### Pré-requisitos
- **Node.js 18+**
- **Vite** (instalado localmente via `npm`)

#### Executando
```bash
cd frontend
npm install
npm run dev
```

O frontend será iniciado por padrão em `http://localhost:5173` (ou na porta configurada).

---

### Observações Importantes

- Antes de iniciar o backend, certifique-se que o **PostgreSQL** está rodando e que o banco de dados foi criado.
- É possível usar **Docker** para o banco, facilitando a configuração.
- Para testes automatizados, o backend pode usar **H2** como banco de dados em memória.