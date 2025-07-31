# Documento de Uso de Inteligência Artificial no Frontend

## Introdução

Este documento descreve o uso de ferramentas de Inteligência Artificial (IA) durante o desenvolvimento do frontend deste projeto, visando garantir a transparência no processo de criação, manutenção e evolução do software. A seguir, detalhamos como as ferramentas de IA auxiliaram na geração de ideias, produção de código, design de interface e definições técnicas ao longo do desenvolvimento da aplicação de gerenciamento de finanças compartilhadas.

## Ferramentas de Inteligência Artificial Utilizadas

- **Nome da ferramenta**: ChatGPT  
  **Fornecedor**: OpenAI  
  **Descrição do uso**: Geração de código, definição de escopo do MVP, naming do projeto, sugestões de design, estruturação de pastas e modelagem de dados

- **Nome da ferramenta**: Claude IA  
  **Fornecedor**: Anthropic  
  **Descrição do uso**: Geração de paletas de cores, sugestões de branding, boas práticas de arquitetura de frontend

- **Nome da ferramenta**: DeepSeek  
  **Fornecedor**: DeepSeek  
  **Descrição do uso**: Implementação de gerenciamento de estado com Zustand/Jotai, persistência de tema, estruturação de mocks e contratos com Zod

- **Nome da ferramenta**: Stitch  
  **Fornecedor**: Stitch AI  
  **Descrição do uso**: Sugestões de design de telas (wireframes) para páginas como Cadastro, Login, Home, Grupos, etc.

## Aplicações da IA no Projeto

As principais áreas com auxílio de IA incluem:

- [x] Definição de escopo e funcionalidades
- [x] Design de interface (cores, telas, layout)
- [x] Geração e refatoração de código
- [x] Estruturação de projeto frontend (React + Zustand/Jotai)
- [x] Modelagem de dados mockados
- [x] Escrita de documentação e naming
- [ ] Criação de testes automatizados (planejado para etapas futuras)

## Casos de Uso Específicos

### Design e Identidade Visual
- **Data**: 05/07/2025  
- **Ferramenta**: Claude IA  
- **Contribuição**: Criação de paleta de cores baseada em valores como confiança, estabilidade e crescimento financeiro.

### MVP e Definição de Escopo
- **Data**: 06/07/2025  
- **Ferramenta**: ChatGPT  
- **Contribuição**: Geração da definição inicial do MVP com foco em grupos de despesas, cálculo automático de saldos e painel visual.

### Nome e Branding do App
- **Data**: 09/07/2025  
- **Ferramenta**: ChatGPT  
- **Contribuição**: Sugestão e justificativa de nomes como “FinBoost”, “GranaFácil” e “Divide+”.

### Gerenciamento de Estado
- **Data**: 02 e 30/07/2025  
- **Ferramenta**: DeepSeek  
- **Contribuição**: Comparação entre Zustand e Jotai, com recomendação e implementação de exemplo modular com persistência via localStorage.

### Dados Mockados Realistas
- **Data**: 22 e 30/07/2025  
- **Ferramenta**: DeepSeek  
- **Contribuição**: Estrutura de diretório `/mock` e criação de exemplos realistas de grupos e transações.

### Sugestão de Telas e Navegação
- **Data**: 22/07/2025  
- **Ferramenta**: Stitch  
- **Contribuição**: Wireframes para páginas principais do app: login, home, perfil, grupos, modais e detalhes.

### Contrato de Respostas da API
- **Data**: 30/07/2025  
- **Ferramenta**: DeepSeek  
- **Contribuição**: Implementação de contratos de API usando `zod` com validação segura, mesmo sem TypeScript.

## Revisão e Validação

Todo o conteúdo gerado com o apoio das ferramentas de IA foi:

- Revisado por líder do frontend e mais 2 membros do time
- Adaptado às necessidades do projeto
- Testado para garantir a adequação as necessidades do projeto
- Documentado para garantir rastreabilidade

## Desafios e Soluções

1. **Organização de dados mockados**
   - **Desafio**: Manter consistência e realismo nos exemplos de grupos e despesas
   - **Solução**: Uso de estrutura modular com arquivos separados e dados inspirados em situações reais

2. **Escolha do gerenciador de estado**
   - **Desafio**: Encontrar ferramenta leve e escalável para o MVP
   - **Solução**: Análise comparativa com recomendação do Jotai para granularidade e performance

3. **Persistência de tema**
   - **Desafio**: Manter dark mode ativo entre sessões
   - **Solução**: Implementação de persistência via `localStorage` usando middleware do Zustand

## Rastreamento e Documentação

1. **Arquivo de prompts utilizados**:  
   Todos os prompts e resultados estão registrados em [ai_prompts_log.md](docs/frontend/ai_prompts_log.md).

2. **Este sumário de alto nível**:  
   Resume as contribuições de IA no projeto de forma organizada, objetiva e auditável.

## Responsabilidade Final

Apesar do uso intensivo de ferramentas de IA, **todas as decisões finais de implementação, validação e curadoria** foram tomadas pelos desenvolvedores do grupo, que assumem a responsabilidade final pelo projeto entregue.

## Atualizações

Este documento será atualizado sempre que houver novo uso relevante de IA no projeto, garantindo rastreamento e transparência contínuos.
