# Registro de Prompts Utilizados no Projeto

Este documento registra os principais prompts utilizados para gerar código, ideias, soluções ou documentações com o 
apoio de ferramentas de Inteligência Artificial durante o desenvolvimento deste projeto.

---

# Formulário de Registro

## Novo Registro

- [x] **Data**: 2025-05-11  
- [x] **Ferramenta Utilizada**: ChatGPT  
- [x] **Versão (se aplicável)**: GPT-4 Turbo  

### Prompt

> O Reddit parece ser uma boa escolha para testar a aplicação e depois posso fazer uma atualização para buscar em 
> múltiplas fontes incluindo o mastodon e depois twitter e comentários do youtube. Poderia fazer uma nova descrição do 
> projeto para usar o Reddit e deixar uma seção de implementação futura para múltiplas fontes?

### Resultado

- [x] Tipo de resultado:
  - [x] Reescrita e reformulação da descrição do projeto para usar o Reddit
  - [x] Sugestão de ‘roadmap’ de funcionalidades futuras

- [x] Breve descrição do resultado:
  - Foi gerada uma descrição completa e detalhada do projeto, com foco inicial no Reddit e expansão futura para 
múltiplas redes sociais (Mastodon, X/Twitter, YouTube).

### Observações

- [x] Ajustes realizados manualmente:
  - Pequenas modificações no código gerado.

- [ ] Problemas encontrados:
  - Nenhum

---

## Novo Registro

- [x] **Data**: 2025-05-11  
- [x] **Ferramenta Utilizada**: Claude IA  
- [x] **Versão (se aplicável)**: Claude 3.7 Sonnet 

### Prompt

> Crie uma aplicação web em Python com Streamlit, que permite ao usuário pesquisar a percepção pública sobre produtos, 
> serviços ou marcas com base em postagens extraídas do Reddit.

### Resultado

- [x] Tipo de resultado:
  - [x] Geração de código
  - [x] Estruturação inicial de projeto

- [x] Breve descrição do resultado:
  - Geração completa dos arquivos do projeto: `app.py`, `requirements.txt`, `README.md`.
  - Implementação da análise de sentimento com TextBlob e NLTK.

### Observações

- [x] Problemas encontrados:
  - Erro com uso dos recursos do NLTK (punkt_tab não encontrado)

- [x] Ajustes realizados pela ferramenta de IA:
  - Sugestão e criação de versão alternativa simplificada da aplicação (`simplified_app.py`) sem dependência crítica do 
NLTK.

---

## Novo Registro

- [x] **Data**: 2025-05-12  
- [x] **Ferramenta Utilizada**: Claude IA  
- [x] **Versão (se aplicável)**: Claude 3.7 Sonnet 

### Prompt

> Fiz uma aplicação web interativa desenvolvida em Python com Streamlit, que permite ao usuário pesquisar a percepção 
> pública sobre produtos, serviços ou marcas com base em postagens extraídas do Reddit. Todo o código python está no 
> arquivo app.py, por isso o código ficou muito grande. Poderia analisar o arquivo e verificar se parte código ficaria 
> melhor em um arquivo separado?

### Resultado

- [x] Tipo de resultado:
  - [x] Refatoração de código
  - [x] Reestruturação do projeto

- [x] Breve descrição do resultado:
  - Alteração da estrutura do projeto para separar a lógica em diferentes arquivos:
    - `app.py`: Gerencia a interface do Streamlit e o fluxo principal da aplicação
    - `reddit_client.py`: Lida com a interação com a API do Reddit
    - `sentiment_analyzer.py`: Análise de sentimentos e processamento de texto
    - `visualization.py`: Geração de gráficos e visualizações
  
### Observações

- [x] Ajustes realizados manualmente:
  - Pequenas modificações no código gerado.

- [ ] Problemas encontrados:
  - Nenhum

---

## Novo Registro

- [x] **Data**: 2025-05-12  
- [x] **Ferramenta Utilizada**: Claude IA   
- [x] **Versão (se aplicável)**: Claude 3.7 Sonnet

### Prompt

> Uma coisa que eu gostaria de melhora nos gráficos é que os mesmos ficaram muito grandes. E também o grafico de barras 
> vertical não me parece bom para esta aplicação, talvez fosse melhor um gráfico de pizza? E também acho que poderia 
> deixar o gráfico do lado da nuvem de palavras, bem como fazer ajustes para melhorar a visualização e beleza da página.
> Também quero deixar a sidebar no lado esquerdo. Poderia me ajudar fazendo essas melhorias?

### Resultado

- [x] Tipo de resultado:
  - [x] Melhoria de layout

- [x] Breve descrição do resultado:
    - Ajustes no layout da aplicação:
        - Gráficos de pizza para análise de sentimentos
        - Sidebar movida para o lado esquerdo
        - Melhoria na estética geral da página

### Observações (Opcional)

- [x] Ajustes realizados manualmente:
  - Pequenas modificações no código gerado.

- [ ] Problemas encontrados:
  - Nenhum

---

## Novo Registro

- [x] **Data**: 2025-05-12  
- [x] **Ferramenta Utilizada**: ChatGPT
- [x] **Versão (se aplicável)**: GPT-4 Turbo

### Prompt

> Poderia me ajudar melhorando os códigos app.py e visualization.py para deixar o botão Analisar Sentimentos mais 
> evidente. Tirar a segunda coluna com a nuvem de palavras e deixar só o gráfico de pizzas com a legenda? Tirar o 
> gráfico de palavras mais frequentes e deixar só a tabela para melhorar a visualização.  

### Resultado

- [x] Tipo de resultado:
  - [x] Melhoria de layout

- [x] Breve descrição do resultado:
    - Ajustes no layout da aplicação:
        - Botão "Analisar Sentimentos" mais destacado
        - Remoção da segunda coluna com a nuvem de palavras
        - Gráfico de pizza com legenda
        - Tabela de palavras mais frequentes mantida

### Observações

- [x] Ajustes realizados manualmente:
  - Pequenas modificações no código gerado.

- [ ] Problemas encontrados:
  - Nenhum

---  

## Novo Registro

- [x] **Data**: 2025-05-12  
- [x] **Ferramenta Utilizada**: ChatGPT
- [x] **Versão (se aplicável)**: GPT-4 Turbo

### Prompt

> Poderia me ajudar melhorando os códigos app.py e visualization.py para deixar o botão Analisar Sentimentos mais 
> evidente. Tirar a segunda coluna com a nuvem de palavras e deixar só o gráfico de pizzas com a legenda? Tirar o 
> gráfico de palavras mais frequentes e deixar só a tabela para melhorar a visualização. Poderia também remover a função
> display_sentiment_distribution não está sendo usada atualmente?

### Resultado

- [x] Tipo de resultado:
  - [x] Refatoração de código
  - [x] Melhoria de layout

- [x] Breve descrição do resultado:
    - A função display_sentiment_distribution() foi completamente removida. 
    - Ajustes no layout da aplicação:
        - Botão "Analisar Sentimentos" mais destacado
        - Remoção da segunda coluna com a nuvem de palavras
        - Gráfico de pizza com legenda
        - Tabela de palavras mais frequentes mantida

### Observações

- [x] Ajustes realizados manualmente:
  - Pequenas modificações no código gerado.

- [ ] Problemas encontrados:
  - Nenhum

---

## Novo Registro

- [x] **Data**: 2025-05-12  
- [x] **Ferramenta Utilizada**: ChatGPT
- [x] **Versão (se aplicável)**: GPT-4 Turbo

### Prompt

> Tem alguma sugestão de dados relevantes para colocar mais colunas na tabela?

### Resultado

- [x] Tipo de resultado:
  - [x] Adição de novos dados na tabela

- [x] Breve descrição do resultado:
    - Adição de novas colunas na tabela:
        - Proporção - Mostra o peso daquela palavra no total de palavras analisadas.
        - Tipo de Sentimento Dominante.

### Observações

- [x] Ajustes realizados pela ferramenta de IA:
  - Modificação no código da função display_common_words para exibir as novas colunas.
  - Criação de uma nova função em sentiment_analyzer.py para mapear as palavras mais comuns com as suas contagens por 
sentimento.

- [ ] Problemas encontrados:
  - Nenhum

---  
  
## Novo Registro

- [x] **Data**: 2025-05-12  
- [x] **Ferramenta Utilizada**: Claude IA   
- [x] **Versão (se aplicável)**: Claude 3.7 Sonnet

### Prompt

> Fiz uma aplicação em python com streamlit, para analisar sentimentos de produtos ou serviços em redes sociais. 
> A interface no modo claro ficou boa, mas no modo escuro a sidebar fica inelegivel, poderia me ajudar a resolver este 
> problema?  
  
### Resultado

- [x] Tipo de resultado:
  - [x] Ajuste visual da sidebar no modo escuro

- [x] Breve descrição do resultado:
    - Ajustes no layout da aplicação:  
        - Detecção do tema atual para aplicar estilos condicionais. 
        - Alteração da cor de fundo e do texto da sidebar para torná-la legível no modo escuro.        

### Observações

- [x] Solução implementada pela ferramenta de forma automatizada:
    - Detecção automática do tema - O script monitora mudanças no tema e atualiza os estilos automaticamente
    - Estilos específicos para cada modo - regras de estilo diferentes para:
        - Modo claro: Mantém a configuração original.
        - Modo escuro: Usa cores adequadas para melhor contraste e legibilidade.

- [x] Problemas encontrados:
  - Código de app.py ficou muito grande, dificultando a manutenção.
  
- [x] Ajustes realizados pela ferramenta de IA:
  - Organizar os estilos CSS e scripts JavaScript em arquivos separados na pasta `static/`.
  - Criar um novo arquivo `resource_manager.py` para gerenciar os recursos estáticos.

---

# Nota Final

Este registro tem como objetivo garantir a transparência, rastreabilidade e documentação de boas práticas no uso de 
Inteligência Artificial durante o desenvolvimento de software.
