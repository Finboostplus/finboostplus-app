# Registro de Prompts Utilizados no Projeto

Este documento registra os principais prompts utilizados para gerar código, ideias, soluções ou documentações com o apoio de ferramentas de Inteligência Artificial durante o desenvolvimento deste projeto.

---

# Formulário de Registro

## Novo Registro

**Data**: 19/05/2025  
**Ferramenta Utilizada**: DeepSeek  
**Versão (se aplicável)**: -

### Prompt
> "Tá certo estruturar dessa forma: pasta components/Button e dentro dela tudo relacionado ao botão, 
> inclusive subcomponentes como Label?"

### Resultado

**Tipo de resultado**:
- Estruturação de projeto
- Boas práticas de arquitetura

**Breve descrição do resultado**:
Estrutura hierárquica e coesa por componente (component-centric) é uma boa prática em projetos React.

**Vantagens**:
- Organização e clareza
- Manutenção e escalabilidade
- Importações mais limpas

**Quando evitar**:
- Componentes muito simples ou genéricos

**Boas práticas**:
- Padronização
- Documentação
- Evitar aninhamento excessivo

### Observações

**Conclusão**:  
Abordagem recomendada, principalmente para componentes com subcomponentes ou lógica própria.

---

## Novo Registro

**Data**: 02/06/2025  
**Ferramenta Utilizada**: Gemini  
**Versão (se aplicável)**: -

### Prompt
> "No React, qual é o melhor context para se trabalhar?"

### Resultado

**Tipo de resultado**:
- Gerenciamento de estado
- Recomendação de biblioteca

**Breve descrição do resultado**:  
Para o MVP deste app de gerenciamento e compartilhamento de finanças, escolhemos o **Jotai** como biblioteca de gerenciamento de estado.

**Características**:

- Leve, simples e eficiente
- Permite granularidade no controle do estado (via átomos)
- Evita re-renderizações desnecessárias
- Se integra naturalmente com o React
- Escalável e fácil de manter

### Observações

**Conclusão**:
Ideal para MVPs rápidos, enxutos e com foco em desempenho.

---

## Novo Registro

**Data**: 05/07/2025  
**Ferramenta Utilizada**: Claude  
**Versão (se aplicável)**: -

#### Prompt
> "Quais paletas de cores representam bem um MVP de sistema de gerenciamento de finanças?"

### Resultado

**Tipo de resultado**:
- Design de interface
- Paleta de cores especializada

**Breve descrição do resultado**:
Claude sugeriu 4 paletas eficazes, com destaque para a **Paleta Confiança (Recomendada)**

**Cores**:
- **Primária**: Azul (#2563EB, #1E40AF) → confiança e estabilidade
- **Secundária**: Verde (#059669, #047857) → crescimento financeiro
- **Alerta**: Vermelho (#DC2626, #B91C1C) → gastos e avisos
- **Neutros**: Cinza (#6B7280, #374151, #F9FAFB) → fundo e equilíbrio visual

**Motivos**:
- Acolhida universal no setor financeiro
- Legível, acessível e profissional
- Equilibra simplicidade com funcionalidade visual

### Observações

**Dicas de uso**:
- 60% neutros, 30% azul (primária), 10% verde/vermelho
- Verde para valores positivos; vermelho para negativos
- Alto contraste para acessibilidade

---

## Novo Registro

**Data**: 06/07/2025  
**Ferramenta Utilizada**: ChatGPT  
**Versão (se aplicável)**: -

### Prompt
> "MVP do Controle Financeiro Compartilhado"

### Resultado

**Tipo de resultado**:
- Definição de produto
- Escopo do MVP

**Breve descrição do resultado**:
Sistema para gerenciar despesas compartilhadas entre grupos, com divisão automática de gastos, saldos individuais, relatórios e uma interface simples.

**Funcionalidades-Chave**:
- Cadastro e login de usuários
- Criação de grupos de despesas
- Adição e visualização de despesas compartilhadas
- Cálculo automático de saldos
- Painel financeiro com resumo visual
- Interface adaptável ao tema claro/escuro

### Observações

**Tecnologias sugeridas**:
- React + Vite
- TailwindCSS
- TypeScript
- Zustand ou Jotai para estado
- Suporte a i18n, tema e PWA para entregas futuras

---

## Novo Registro

**Data**: 08/07/2025  
**Ferramenta Utilizada**: Gemini  
**Versão (se aplicável)**: -

#### Prompt
> "Tem como criar um board para dividir tarefas da minha equipe?"

### Resultado

**Tipo de resultado**:
- Gestão de projeto
- Ferramentas de organização

**Breve descrição do resultado**: Opções de ferramentas

**GitHub Projects**:
- Ideal se o projeto já está no GitHub
- Template "Board"
- Colunas: Backlog, To Do, In Progress, Review, Done
- Integração com Issues/PRs, gratuito para repositórios públicos

**Trello**:
- Simples, visual
- Listas: Backlog, Sprint Atual, Em Desenvolvimento, Code Review, Testando, Concluído
- Cards com título, responsável, prazo e tags
- Integra com GitHub via Power-Up

**Notion**:
- Mais completo e personalizável
- Campos: título, responsável, status, prioridade, prazo, pasta
- Útil para tarefas + documentação
- Mais complexo que Trello

---

## Novo Registro

**Data**: 09/07/2025  
**Ferramenta Utilizada**: ChatGPT  
**Versão (se aplicável)**: -

### Prompt
> "Quais seriam bons nomes para o app?"

### Resultado

**Tipo de resultado**:
- Naming e branding
- Sugestões criativas

**Breve descrição do resultado**:
Sugestões de nomes:
- **FinBoost** (destaque escolhido)
- SplitWiseBR
- GranaFácil
- Compartilha$
- Divide+
- MeuBolso

### Observações

**Justificativa**:
FinBoost transmite dinamismo e foco financeiro com nome curto e sonoro.

---

## Novo Registro

**Data**: 18/07/2025  
**Ferramenta Utilizada**: DeepSeek  
**Versão (se aplicável)**: -

### Prompt
> "Meu app de 1.1s de first contentful paint"

### Resultado

**Tipo de resultado**:
- Análise de performance
- Sugestões de otimização

**Breve descrição do resultado**: 
Um FCP de 1.1s é considerado ótimo.

**Classificação do Lighthouse**:
- < 1.8s = Excelente
- 1.8s a 3s = Precisa melhorar
- \> 3s = Ruim

**Dicas para melhorar ainda mais**:
- Otimização de imagens
- Minificação de CSS/JS
- Uso de CDN
- Cache no navegador
- Redução do TTFB

### Observações

**Conclusão**:
Você já está acima da média, ótimo trabalho!

---

## Novo Registro

**Data**: 22/07/2025  
**Ferramenta Utilizada**: Stitch  
**Versão (se aplicável)**: -

### Prompt
> "Quero ideias de design de telas para um app de gerenciamento de finanças com: Cadastro, Login, Home, Perfil, > Lista de Grupos, Novo Grupo, Detalhes do Grupo e Modal de Nova Despesa"

### Resultado

**Tipo de resultado**:
- Design de interface
- Wireframes de telas

**Breve descrição do resultado**:
- **Cadastro**: Campos para nome, e-mail, senha + botão "Cadastrar"
- **Login**: Campos para e-mail, senha + botão "Entrar"
- **Home**: Saldo total, gastos recentes e gráfico por categoria
- **Perfil**: Nome, e-mail, editar ou sair
- **Grupos**: Lista de grupos com botão "Novo grupo"
- **Novo Grupo**: Formulário com nome e descrição
- **Detalhes do Grupo**: Info do grupo, despesas e botão "Nova despesa"
- **Modal Nova Despesa**: Valor, descrição, categoria e data

---

## Novo Registro

**Data**: 22/07/2025  
**Ferramenta Utilizada**: ChatGPT  
**Versão (se aplicável)**: -

#### Prompt
> "Me mostra exemplos mais ricos de grupos de despesas compartilhadas, como se fossem dados reais do app."

### Resultado

**Tipo de resultado**:
- Dados de exemplo
- Casos de uso realistas

**Breve descrição do resultado**: Exemplos realistas de grupos.

**Grupo: Viagem para Florianópolis**
- Despesas: Hotel, gasolina, refeições, Uber
- Participantes: Alice, João, LunaStar

**Grupo: Aluguel e Contas do AP**
- Despesas mensais: aluguel, energia, internet
- Divisão por porcentagem ou valor fixo

**Grupo: Projeto de TCC**
- Gastos com impressão, cafés, coworking
- Reembolso entre colegas

---

## Novo Registro

**Data**: 30/07/2025  
**Ferramenta Utilizada**: ChatGPT  
**Versão (se aplicável)**: -

### Prompt
> "Jotai é uma boa escolha para o gerenciamento de estado do app?"

### Resultado

**Tipo de resultado**:
- Validação de tecnologia
- Análise técnica

**Breve descrição do resultado**:
Vantagens do Jotai para o projeto.

**Vantagens**:

- Estados com granularidade por tipo de dado (transações, saldo, usuário)
- Alta performance
- API simples
- Escalável com átomos derivados, persistência e devtools
- Menos boilerplate que Redux ou Context

### Observações

**Conclusão**:
Jotai entrega performance e simplicidade ideais para MVPs como o FinBoost.

---

## Novo Registro

**Data**: 30/07/2025  
**Ferramenta Utilizada**: ChatGPT  
**Versão (se aplicável)**: -

### Prompt
> "Você acha válido ter um gráfico que menciona o gasto por categoria?"

### Resultado

**Tipo de resultado**:
- Funcionalidade de visualização
- Recomendação de UX

**Breve descrição do resultado**:
Sim, é recomendado.

**Motivos**:
- Facilita visualização dos gastos
- Oferece insights rápidos
- Melhora a experiência do usuário

#### Observações

**Sugestão técnica**:
Usar bibliotecas como Recharts ou Chart.js

---

# Prompts Técnicos Específicos

## Novo Registro

**Data**: 11/07/2025  
**Ferramenta Utilizada**: DeepSeek  
**Versão (se aplicável)**: -

#### Prompt
> "Como usar Zustand para controle de tema com arquivos separados?"

#### Resultado

**Tipo de resultado**:
- Implementação técnica
- Gerenciamento de estado

**Estrutura sugerida**:
```bash
/store
  └─ themeStore.ts
```

**Código**:
```typescript
import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
```

---

## Novo Registro

**Data**: 22/07/2025  
**Ferramenta Utilizada**: DeepSeek  
**Versão (se aplicável)**: -

### Prompt
> "Quero centralizar meus dados mockados em um local só e deixá-los mais realistas"

### Resultado

**Tipo de resultado**:
- Organização de dados
- Estrutura de projeto

**Estrutura sugerida**:
```bash
/mock
  └─ groups.ts
  └─ transactions.ts
```

**Exemplo de dado**:
```typescript
export const mockGroups = [
  {
    id: 'grupo-1',
    nome: 'Viagem para o Rio',
    criadorId: 'user-1',
    participantes: ['user-1', 'user-2'],
    despesas: [
      { id: 'despesa-1', valor: 300, categoria: 'Transporte', data: '2025-07-01' }
    ],
  },
];
```

---

### Novo Registro

**Data**: 30/07/2025  
**Ferramenta Utilizada**: DeepSeek  
**Versão (se aplicável)**: -

#### Prompt
> "Como faço o dark mode persistir no localStorage?"

#### Resultado

**Tipo de resultado**:
- Implementação técnica
- Persistência de dados

**Código**:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
```

---

## Novo Registro

**Data**: 30/07/2025  
**Ferramenta Utilizada**: DeepSeek  
**Versão (se aplicável)**: -

### Prompt
> "Quero organizar a estrutura dos meus grupos com mais realismo e detalhes personalizados"

### Resultado

**Tipo de resultado**:
- Modelagem de dados
- Estrutura realista

**Exemplo**:
```typescript
{
  id: 'g-1',
  nome: 'Churrasco do fim de semana',
  descricao: 'Despesas do churrasco com amigos',
  participantes: [
    { id: 'u1', nome: 'LunaStar', saldo: -20 },
    { id: 'u2', nome: 'João', saldo: +20 }
  ],
  despesas: [
    { id: 'd1', valor: 40, categoria: 'Comida', autor: 'u1', data: '2025-07-20' }
  ]
}
```

---

## Novo Registro

**Data**: 30/07/2025  
**Ferramenta Utilizada**: DeepSeek  
**Versão (se aplicável)**: -

### Prompt
> "Tem como implementar contrato das respostas da API usando JS (sem TypeScript)?"

### Resultado

**Tipo de resultado**:
- Validação de dados
- Implementação sem TypeScript

**Código**:
```javascript
import { z } from 'zod';

const grupoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  participantes: z.array(z.string()),
});

async function fetchGrupo(id) {
  const res = await fetch(`/api/grupos/${id}`);
  const data = await res.json();
  const parsed = grupoSchema.parse(data);
  return parsed;
}
```

### Observações

**Vantagens**:
- Tipagem e validação segura mesmo sem TypeScript
- Tratamento de erros mais claro
- Contratos reutilizáveis e testáveis

---

# Nota Final

Este registro tem como objetivo garantir a transparência, rastreabilidade e documentação de boas práticas no uso de Inteligência Artificial durante o desenvolvimento de software.
