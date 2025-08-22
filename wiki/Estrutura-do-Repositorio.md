Esta página descreve a organização das pastas e arquivos principais do projeto **FinBoost+**.  
O objetivo é facilitar a navegação e manter um padrão entre os desenvolvedores.

---

### Estrutura Geral

```
finboostplus-app/
├── backend/  
|   ├── finboostplus-server     # API em Java com Spring Boot
|   │   ├── src/                # Código-fonte backend
|   │   ├── pom.xml             # Configuração Maven
|   │   └── ...
├── frontend/                   # Aplicação React (Vite)
│   ├── src/pages/              # Páginas principais
│   ├── src/components/         # Componentes reutilizáveis
│   ├── src/services/           # Comunicação com API
│   ├── package.json            # Dependências frontend
│   └── ...
├── docs/                       # Documentação técnica (MkDocs)
│   ├── index.md
│   └── ...
├── project_docs/               # Planejamento e requisitos
│   ├── mvp.md
│   ├── personas.md
│   └── ...
├── docker-compose.yml          # Configuração para subir o projeto com Docker
├── README.md                   # Visão geral do projeto
├── CONTRIBUTING.md             # Guia de contribuição
└── LICENSE                     # Licença do projeto
```

---

### Observações

- **backend/** e **frontend/** possuem seus próprios `README.md` com instruções específicas de instalação, execução e testes.
- **docs/** é utilizado pelo MkDocs para gerar a documentação técnica.
- **project_docs/** contém arquivos de apoio ao planejamento do projeto, como MVP, personas, roadmap e diagramas de arquitetura.
- O arquivo `docker-compose.yml` permite rodar backend, frontend e banco de dados juntos com um único comando.
- O `README.md` principal serve como porta de entrada para o repositório, com links para a Wiki e para a documentação técnica.

---

**Relacionado:**  
[Como Rodar o Projeto](./Como-Rodar-o-Projeto) | [Boas Práticas de Desenvolvimento](./Boas-Praticas-de-Desenvolvimento)