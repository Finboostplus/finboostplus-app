# Documento de Uso de Inteligência Artificial no Desenvolvimento

## Introdução

Este documento descreve o uso de ferramentas de Inteligência Artificial (IA) durante o desenvolvimento deste projeto, 
visando garantir a transparência no processo de criação, manutenção e evolução do software. Este registro detalha como 
as ferramentas de IA contribuíram para o desenvolvimento do backend da aplicação de gerenciamento de finanças 
compartilhadas.

## Ferramentas de Inteligência Artificial Utilizadas

- **Nome da ferramenta**: ChatGPT
- **Fornecedor**: OpenAI
- **Descrição do uso**: Geração de código, refatoração, sugestões de melhoria e escrita de documentação

- **Nome da ferramenta**: Claude IA
- **Fornecedor**: Anthropic
- **Descrição do uso**: Geração de código, refatoração, sugestões de melhoria, escrita de documentação, correção de 
erros e verificação de arquivos de configuração

- **Nome da ferramenta**: GitHub Copilot
- **Fornecedor**: GitHub/OpenAI
- **Descrição do uso**: Assistência em tempo real nas IDEs Intellij e VS Code para pequenas correções de código e 
sugestões incrementais durante o desenvolvimento

## Aplicações da IA no Projeto

As principais áreas onde houve auxílio de IA incluem:

- [x] Geração de trechos de código
- [ ] Sugestões de arquitetura de software
- [x] Escrita de documentação
- [X] Criação de testes de integração
- [ ] Criação de testes unitários
- [x] Correção de bugs
- [x] Refatoração de código
- [ ] Traduções de trechos de código ou comentários

## Casos de Uso Específicos

### Criação de Testes de Integração

- **Data**: 15/08/2025
- **Ferramenta**: Copilot
- **Modo**: Agente de IA
- **Modelo**: GPT-5
- **Contibuição**: 
  - Criação dos arquivos de teste: 
    - UserControllerIntegrationTest.java
    - UserRegistrationIntegrationTest.java
    - UserRepositoryIntegrationTest.java
    - SecurityIntegrationTest.java
  - Além do arquivo de documentação: 
    - TESTING_GUIDE.md

## Revisão e Validação

Todo o conteúdo gerado com o apoio das ferramentas de IA foi:

- Revisado pelo líder do backend e mais 2 membros do time.
- Adaptado às necessidades do projeto
- Testado para garantir a adequação as necessidades do projeto
- Documentado para garantir rastreabilidade

Como evidenciado no arquivo de registro de prompts, cada sugestão das ferramentas de IA passou por adaptações manuais e 
ajustes específicos para garantir o funcionamento adequado no contexto do projeto.

## Rastreamento e Documentação

Para garantir total transparência, este projeto:

1. **Documenta** todas as interações significativas com ferramentas de IA no arquivo [ai_prompts_log.md](docs/ai_prompts_log.md), 
incluindo:
   - Data e ferramenta utilizada
   - Prompts enviados
   - Tipo de resultados obtidos
   - Ajustes manuais realizados

2. **Mantém** este sumário de alto nível [ai_usage.md](docs/ai_usage.md) para rápida visualização do uso de ferramentas de IA no 
projeto.

Esta abordagem de documentação visa:

- Garantir transparência sobre o uso de IA no desenvolvimento
- Permitir auditoria das contribuições de IA no projeto
- Facilitar a reprodutibilidade e compreensão do processo de desenvolvimento
- Servir como referência para futuros desenvolvedores e contribuidores

## Responsabilidade Final

Apesar do uso intensivo de ferramentas de IA, **todas as decisões finais de implementação, validação e curadoria**
foram tomadas pelos desenvolvedores do grupo, que assumem a responsabilidade final pelo projeto entregue.

## Atualizações

Este documento será atualizado sempre que novas ferramentas ou práticas de IA forem incorporadas ao projeto, garantindo 
uma documentação transparente e atualizada.
