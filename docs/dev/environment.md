# Configuração de Ambiente de Desenvolvimento

Este guia fornece instruções completas para configurar e executar o ambiente de desenvolvimento da aplicação FinBoost+ no Windows e Linux/Ubuntu.

## Pré-requisitos

### Ferramentas Necessárias

- **Docker** (versão 20.10+)
- **Docker Compose** (versão 2.0+)  
- **Git**
- **Postman** (opcional, para testes da API)

### Verificação dos Pré-requisitos

=== "Windows (PowerShell)"
    ```powershell
    # Verificar Docker
    docker --version
    docker-compose --version

    # Verificar Git
    git --version
    ```

=== "Linux/Ubuntu"
    ```bash
    # Verificar Docker
    docker --version
    docker compose version  # Nota: "compose" sem hífen no Linux moderno

    # Verificar Git
    git --version
    ```

## Instalação dos Pré-requisitos

### Docker Desktop (Windows)

!!! info "Instalação Windows"
    1. Baixe o Docker Desktop: https://www.docker.com/products/docker-desktop/
    2. Execute o instalador como administrador
    3. Reinicie o sistema quando solicitado
    4. Abra o Docker Desktop e aguarde a inicialização

### Docker (Linux/Ubuntu)

=== "Instalação Automática"
    ```bash
    # Script de instalação completa
    sudo apt update
    sudo apt install apt-transport-https ca-certificates curl software-properties-common
    
    # Adicionar chave GPG do Docker
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Adicionar repositório
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Instalar Docker
    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Configurar usuário
    sudo usermod -aG docker $USER
    newgrp docker
    ```

=== "Git"
    ```bash
    sudo apt update
    sudo apt install git
    ```

## Clone e Configuração do Projeto

=== "Windows (PowerShell)"
    ```powershell
    # Navegar para o diretório desejado
    cd "D:\Projetos" # ou outro diretório de sua escolha

    # Clonar o repositório
    git clone https://github.com/Finboostplus/finboostplus-app.git

    # Navegar para o diretório do backend
    cd finboostplus-app\backend\finboostplus_server
    ```

=== "Linux/Ubuntu"
    ```bash
    # Navegar para o diretório desejado
    cd ~/projetos # ou outro diretório de sua escolha

    # Clonar o repositório
    git clone https://github.com/Finboostplus/finboostplus-app.git

    # Navegar para o diretório do backend
    cd finboostplus-app/backend/finboostplus_server
    ```

## Executando a Aplicação com Docker

### Iniciar o Ambiente de Desenvolvimento

=== "Windows (PowerShell)"
    ```powershell
    # Navegar para o diretório do backend
    cd "D:\Projetos\finboostplus-app\backend\finboostplus_server"

    # Iniciar os containers em modo desenvolvimento
    docker-compose -f docker-compose.dev.yml up --build

    # Para executar em segundo plano (detached mode)
    docker-compose -f docker-compose.dev.yml up --build -d
    ```

=== "Linux/Ubuntu"
    ```bash
    # Navegar para o diretório do backend
    cd ~/projetos/finboostplus-app/backend/finboostplus_server

    # Iniciar os containers em modo desenvolvimento
    docker compose -f docker-compose.dev.yml up --build

    # Para executar em segundo plano (detached mode)
    docker compose -f docker-compose.dev.yml up --build -d
    ```

### Verificar Status dos Containers

=== "Windows (PowerShell)"
    ```powershell
    # Verificar containers em execução
    docker-compose -f docker-compose.dev.yml ps

    # Ver logs em tempo real
    docker-compose -f docker-compose.dev.yml logs -f

    # Ver logs de um serviço específico
    docker-compose -f docker-compose.dev.yml logs -f server
    docker-compose -f docker-compose.dev.yml logs -f db
    ```

=== "Linux/Ubuntu"
    ```bash
    # Verificar containers em execução
    docker compose -f docker-compose.dev.yml ps

    # Ver logs em tempo real
    docker compose -f docker-compose.dev.yml logs -f

    # Ver logs de um serviço específico
    docker compose -f docker-compose.dev.yml logs -f server
    docker compose -f docker-compose.dev.yml logs -f db
    ```

## Verificação do Ambiente

### 1. Status dos Containers

!!! success "Status Esperado"
    ```
    NAME                           IMAGE                        COMMAND                  SERVICE   CREATED         STATUS                   PORTS
    finboostplus_server-db-1       postgres:17                  "docker-entrypoint.s…"   db        X minutes ago   Up X minutes (healthy)   0.0.0.0:5432->5432/tcp
    finboostplus_server-server-1   finboostplus_server-server   "/__cacert_entrypoint…"   server    X minutes ago   Up X minutes             0.0.0.0:8080->8080/tcp
    ```

### 2. Endpoints da API

!!! info "URLs de Acesso"
    - **Documentação da API**: http://localhost:8080/docs/scalar
    - **OpenAPI Specs**: http://localhost:8080/v3/api-docs

=== "Windows (PowerShell)"
    ```powershell
    # Testar documentação da API
    Invoke-WebRequest -Uri "http://localhost:8080/docs/scalar" -UseBasicParsing
    ```

=== "Linux/Ubuntu"
    ```bash
    # Testar documentação da API
    curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/docs/scalar

    # Testar se API está respondendo (deve retornar 404 - isso é normal)
    curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/
    ```

### 3. Conexão com Banco de Dados

=== "Conectar ao PostgreSQL"
    ```bash
    # Conectar ao container do PostgreSQL
    docker exec -it finboostplus_server-db-1 psql -U postgres -d finboostplus
    ```

=== "Comandos Úteis PostgreSQL"
    ```sql
    \l          -- Listar databases
    \dt         -- Listar tabelas
    \q          -- Sair
    ```

## Gerenciamento de Containers

### Parar Aplicação

=== "Windows (PowerShell)"
    ```powershell
    # Parar containers (preserva volumes)
    docker-compose -f docker-compose.dev.yml down

    # Parar e remover volumes (limpa banco de dados)
    docker-compose -f docker-compose.dev.yml down -v

    # Parar containers e limpar tudo
    docker-compose -f docker-compose.dev.yml down --remove-orphans
    ```

=== "Linux/Ubuntu"
    ```bash
    # Parar containers (preserva volumes)
    docker compose -f docker-compose.dev.yml down

    # Parar e remover volumes (limpa banco de dados)
    docker compose -f docker-compose.dev.yml down -v

    # Parar containers e limpar tudo
    docker compose -f docker-compose.dev.yml down --remove-orphans
    ```

### Reiniciar Serviços

=== "Windows (PowerShell)"
    ```powershell
    # Reiniciar apenas um serviço
    docker-compose -f docker-compose.dev.yml restart server
    docker-compose -f docker-compose.dev.yml restart db

    # Rebuild e restart completo
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml up --build
    ```

=== "Linux/Ubuntu"
    ```bash
    # Reiniciar apenas um serviço
    docker compose -f docker-compose.dev.yml restart server
    docker compose -f docker-compose.dev.yml restart db

    # Rebuild e restart completo
    docker compose -f docker-compose.dev.yml down
    docker compose -f docker-compose.dev.yml up --build
    ```

## Configurações do Ambiente

### Portas Utilizadas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| API Backend | `8080` | Spring Boot |
| Database | `5432` | PostgreSQL |

### Variáveis de Ambiente

```env
SPRING_PROFILES_ACTIVE=dev
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/finboostplus
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=1234
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Solução de Problemas

### Erro "Port already in use"

=== "Windows (PowerShell)"
    ```powershell
    # Verificar processos usando as portas
    netstat -ano | findstr :8080
    netstat -ano | findstr :5432

    # Parar processo específico (substitua <PID> pelo ID do processo)
    taskkill /PID <PID> /F
    ```

=== "Linux/Ubuntu"
    ```bash
    # Verificar processos usando as portas
    sudo lsof -i :8080
    sudo lsof -i :5432

    # Parar processo específico
    sudo kill -9 <PID>
    ```

=== "Ambos Sistemas"
    ```bash
    # Parar containers conflitantes
    docker ps
    docker stop <container_id>
    ```

### Erro de Conexão com Docker

!!! warning "Windows"
    - Verificar se Docker Desktop está rodando
    - Reiniciar Docker Desktop se necessário
    - Verificar se WSL 2 está ativado (se usando Windows 10/11)

!!! warning "Linux"
    ```bash
    # Verificar se Docker está rodando
    docker info

    # Reiniciar serviço Docker
    sudo systemctl restart docker

    # Verificar status do serviço
    sudo systemctl status docker
    ```

### Problemas de Permissão (Linux)

```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Verificar permissões
docker run hello-world
```

### Debug com Logs

=== "Windows (PowerShell)"
    ```powershell
    # Ver logs detalhados
    docker-compose -f docker-compose.dev.yml logs -f --tail=100

    # Entrar no container para debug
    docker exec -it finboostplus_server-server-1 bash
    docker exec -it finboostplus_server-db-1 bash
    ```

=== "Linux/Ubuntu"
    ```bash
    # Ver logs detalhados
    docker compose -f docker-compose.dev.yml logs -f --tail=100

    # Entrar no container para debug
    docker exec -it finboostplus_server-server-1 /bin/bash
    docker exec -it finboostplus_server-db-1 /bin/bash
    ```