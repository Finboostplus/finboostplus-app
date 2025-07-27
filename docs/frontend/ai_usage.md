# Documento de Uso de Inteligência Artificial no Desenvolvimento

## Introdução

Este documento descreve o uso de ferramentas de Inteligência Artificial (IA) durante o desenvolvimento deste projeto, 
visando garantir a transparência no processo de criação, manutenção e evolução do software. Este registro detalha como 
as ferramentas de IA contribuíram para o desenvolvimento da aplicação web de análise de sentimentos nas redes sociais.

## Ferramentas de Inteligência Artificial Utilizadas

- **Nome da ferramenta**: ChatGPT
- **Fornecedor**: OpenAI
- **Descrição do uso**: Geração de código, refatoração, sugestões de melhoria, reescrita de documentação e design de 
interface


- **Nome da ferramenta**: Claude IA
- **Fornecedor**: Anthropic
- **Descrição do uso**: Geração de código, estruturação de projeto, refatoração, melhorias de layout e resolução de 
problemas técnicos


- **Nome da ferramenta**: GitHub Copilot
- **Fornecedor**: GitHub/OpenAI
- **Descrição do uso**: Assistência em tempo real na IDE PyCharm para pequenas correções de código e sugestões 
incrementais durante o desenvolvimento

## Aplicações da IA no Projeto

As principais áreas onde houve auxílio de IA incluem:

- [x] Geração de trechos de código
- [x] Otimização de algoritmos
- [x] Sugestões de arquitetura de software
- [x] Escrita de documentação
- [ ] Criação de testes automatizados
- [x] Refatoração de código
- [ ] Traduções de trechos de código ou comentários
- [x] Outras: Melhorias de interface de usuário e design visual

## Casos de Uso Específicos

### Planejamento e Descrição do Projeto
- **Data**: 2025-05-11
- **Ferramenta**: ChatGPT (GPT-4 Turbo)
- **Contribuição**: Reescrita e reformulação da descrição do projeto, com foco inicial no Reddit e plano de expansão 
para múltiplas redes sociais

### Estruturação Inicial do Projeto
- **Data**: 2025-05-11
- **Ferramenta**: Claude IA (Claude 3.7 Sonnet)
- **Contribuição**: Geração completa dos arquivos iniciais do projeto (`app.py`, `requirements.txt`, `README.md`) e 
implementação da análise de sentimento com TextBlob e NLTK

### Reorganização da Arquitetura
- **Data**: 2025-05-12
- **Ferramenta**: Claude IA (Claude 3.7 Sonnet)
- **Contribuição**: Refatoração do código para uma estrutura modular com separação em arquivos específicos:
  - `app.py`: Interface e fluxo principal da aplicação
  - `reddit_client.py`: Interação com a API do Reddit
  - `sentiment_analyzer.py`: Análise de sentimentos e processamento de texto
  - `visualization.py`: Geração de gráficos e visualizações

### Melhorias de Interface de Usuário
- **Data**: 2025-05-12
- **Ferramenta**: Claude IA (Claude 3.7 Sonnet) e ChatGPT (GPT-4 Turbo)
- **Contribuição**: 
  - Implementação de gráficos de pizza no lugar de barras verticais
  - Redesenho do layout da aplicação
  - Destaque ao botão "Analisar Sentimentos"
  - Simplificação da visualização com remoção de elementos redundantes

### Adição de Funcionalidades
- **Data**: 2025-05-12
- **Ferramenta**: ChatGPT (GPT-4 Turbo)
- **Contribuição**: Expansão da tabela de análise com novas colunas relevantes:
  - Proporção de cada palavra no total analisado
  - Tipo de sentimento dominante por palavra

### Compatibilidade com Tema Escuro
- **Data**: 2025-05-12
- **Ferramenta**: Claude IA (Claude 3.7 Sonnet)
- **Contribuição**: 
  - Implementação de detecção automática do tema atual
  - Ajustes de contraste e legibilidade para o modo escuro
  - Reorganização do código em uma estrutura mais sustentável com arquivos estáticos separados

### Assistência Contínua no Desenvolvimento
- **Período**: Durante todo o desenvolvimento
- **Ferramenta**: GitHub Copilot
- **Contribuição**: 
  - Sugestões incrementais em tempo real na IDE PyCharm
  - Pequenas correções de código e otimizações
  - Autocompletar para aumentar a produtividade durante a codificação

## Revisão e Validação

Todo o conteúdo gerado com o auxílio de ferramentas de IA foi:

- Revisado manualmente por um desenvolvedor humano.
- Testado para assegurar a qualidade e adequação ao escopo do projeto.
- Ajustado conforme as necessidades específicas do projeto.

Como evidenciado no arquivo de registro de prompts, cada sugestão das ferramentas de IA passou por adaptações manuais e 
ajustes específicos para garantir o funcionamento adequado no contexto do projeto.

## Desafios e Soluções

Durante o desenvolvimento, foram encontrados alguns desafios ao utilizar conteúdo gerado por IA:

1. **Problema com recursos do NLTK**: A implementação inicial da análise de sentimentos encontrou erro com recursos 
NLTK não encontrados (punkt_tab).
   - **Solução**: A ferramenta Claude IA sugeriu e criou uma versão alternativa simplificada da aplicação sem 
dependência crítica dos recursos do NLTK.

2. **Código monolítico**: O arquivo app.py tornou-se muito grande e difícil de manter.
   - **Solução**: Refatoração recomendada pela Claude IA para dividir o código em módulos especializados.

3. **Problemas de legibilidade no tema escuro**: A sidebar ficou ilegível no modo escuro.
   - **Solução**: Implementação de estilos condicionais baseados no tema atual e reorganização dos recursos estáticos 
em arquivos separados.

## Rastreamento e Documentação

Para garantir total transparência, este projeto:

1. **Documenta** todas as interações significativas com ferramentas de IA no arquivo [ai_prompts_log.md](docs/ai_prompts_log.md), incluindo:
   - Data e ferramenta utilizada
   - Prompts enviados
   - Tipo de resultados obtidos
   - Ajustes manuais realizados

2. **Mantém** este sumário de alto nível [ai_usage.md](docs/ai_usage.md) para rápida visualização do uso de ferramentas de IA no projeto.

Esta abordagem de documentação visa:

- Garantir transparência sobre o uso de IA no desenvolvimento
- Permitir auditoria das contribuições de IA no projeto
- Facilitar a reprodutibilidade e compreensão do processo criativo
- Servir como referência para futuros desenvolvedores e contribuidores

## Responsabilidade Final

Embora ferramentas de Inteligência Artificial tenham sido empregadas como suporte, **as decisões de implementação, 
curadoria de código e validação final** foram realizadas por um desenvolvedor humano, que assume a responsabilidade 
integral pelo conteúdo, funcionamento e conformidade do software.

## Atualizações

Este documento será atualizado sempre que novas ferramentas ou práticas de IA forem incorporadas ao projeto, garantindo 
uma documentação transparente e atualizada.
