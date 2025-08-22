O **FinBoost+** pode ser implantado em duas arquiteturas principais, sempre priorizando **plataformas gratuitas**.  
Ambos os métodos seguem nossa filosofia de **baixo custo**, **manutenção simples** e **escalabilidade gradual**.

---

### Método 1 — Vercel + Render + Neon

#### Visão Geral
- **Frontend:** [Vercel](https://vercel.com/)  
- **Backend:** [Render](https://render.com/)  
- **Banco de Dados:** [Neon](https://neon.tech/) (PostgreSQL Serverless)  
- **Docker:** opcional no Render (se usar build customizada)

##

### Passo a Passo

#### 1. Configurar Backend no Render
1. Criar conta no [Render](https://render.com/).
2. Criar novo serviço **Web Service**.
3. Conectar ao repositório no GitHub.
4. Definir **Branch** de deploy (ex.: `main`).
5. **Build Command:**  
   ```bash
   ./mvnw clean package -DskipTests
   ```
6. **Start Command:**
   ```bash
   java -jar target/*.jar
   ```
7. Adicionar variáveis de ambiente (chaves, URL do banco Neon, JWT_SECRET, etc.).

#### 2. Configurar Banco de Dados no Neon
1. Criar conta no **Neon**.
2. Criar um projeto PostgreSQL.
3. Copiar a connection string.
4. Adicionar essa string às variáveis de ambiente do Render.

#### 3. Configurar Frontend no Vercel
1. Criar conta no **Vercel**.
2. Importar o repositório no Vercel.
3. Definir **Branch** de deploy (ex.: `main`).
4. Adicionar variáveis de ambiente (URL do backend no Render).
5. Deploy automático a cada push.

---

### Método 2 — Oracle Cloud Always Free (Docker)

#### Visão Geral
- **Frontend + Backend + Banco** no mesmo servidor.
- **Banco:** PostgreSQL rodando via Docker.
- **Serviços:** Spring Boot + React servidos via Nginx/Java.

##

### Passo a Passo

#### 1. Criar Instância na Oracle Cloud
1. Criar conta no **Oracle Cloud**.
2. Criar VM **Always Free** (Ampere ou x86).
3. Configurar chave SSH para acesso.

#### 2. Instalar Docker
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
```

#### 3. Clonar Repositório e Subir Containers
```bash
git clone https://github.com/Finboostplus/finboostplus-app.git
cd finboostplus-app
docker-compose up -d
```

O `docker-compose.yml` conterá:
- Backend (Spring Boot)
- Frontend (Nginx servindo build do React)
- PostgreSQL

#### 4. Configurar Variáveis de Ambiente
1. Criar arquivo `.env` na raiz do projeto.
2. Incluir:
   ```env
   POSTGRES_USER=finboost
   POSTGRES_PASSWORD=senha123
   POSTGRES_DB=finboost
   JWT_SECRET=chave_super_secreta
   ```

---

### Boas Práticas para Deploy Gratuito

- Sempre usar **variáveis de ambiente** para credenciais.
- Habilitar **HTTPS** sempre que possível (Vercel já oferece por padrão; no Oracle, usar Certbot).
- Configurar **monitoramento básico** (UptimeRobot, Healthchecks.io).
- Evitar armazenar arquivos sensíveis no repositório.

---

**Relacionado:**  
[Como Rodar o Projeto](./Como-Rodar-o-Projeto) | [Estrutura do Repositório](./Estrutura-do-Repositorio)