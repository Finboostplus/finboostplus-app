# Styling - Frontend FinBoost+

## Visão Geral

O sistema de estilização do FinBoost+ é baseado em TailwindCSS combinado com CSS Custom Properties (variáveis CSS) para criar um design system consistente, responsivo e com suporte a temas claro e escuro. Essa abordagem garante flexibilidade e consistência visual em toda a aplicação.

## Filosofia de Design

**Princípios:**
- Utility-First: classes utilitárias do TailwindCSS
- Design System: tokens para cores, tipografia e espaçamentos
- Mobile-First: responsividade priorizando dispositivos móveis
- Acessibilidade: contraste adequado e suporte a leitores de tela
- Tema dinâmico: alternância entre modo claro e escuro

**Metodologia:**
- Component-Based: estilos organizados por componentes
- CSS Variables: tokens de design reutilizáveis
- Naming semântico para cores e espaçamentos
- Progressive Enhancement para navegadores modernos

## Sistema de Cores

### Paleta Principal

**Modo Claro:**
```css
:root {
  --color-primary: #0152ac;
  --color-secondary: #00a6ed;
  --color-success: #18af7d;
  --color-error: #e74c3c;
  --color-neutral: #f5f7fa;
  --color-surface: #ffffff;
  --color-text: #1f2d3d;
  --color-muted: #95a5a6;
}
```

**Modo Escuro:**
```css
.dark {
  --color-primary: #4a90e2;
  --color-secondary: #5bc0f8;
  --color-success: #2fd8a3;
  --color-error: #ff7a6b;
  --color-neutral: #2e3239;
  --color-surface: #3a3f47;
  --color-text: #e3e8ee;
  --color-muted: #a0a9b8;
}
```

### Psicologia das Cores

| Cor             | Significado                  | Uso no FinBoost+                        |
|-----------------|-----------------------------|-----------------------------------------|
| Azul Primário   | Confiança, estabilidade     | Botões principais, logos, links         |
| Azul Secundário | Modernidade, tecnologia     | Botões secundários, destaques           |
| Verde           | Sucesso, crescimento        | Valores positivos, ganhos, confirmações |
| Vermelho        | Atenção, urgência           | Gastos, erros, alertas                  |
| Neutro          | Calma, equilíbrio           | Backgrounds, divisores                  |
| Surface         | Limpeza, organização        | Cards, modais, áreas de conteúdo        |

## Boas Práticas

**Performance:**
- PurgeCSS: Tailwind remove classes não utilizadas automaticamente
- CSS Variables: mudanças de tema sem re-render completo
- Uso mínimo de CSS customizado

**Manutenibilidade:**
- Design tokens centralizados
- Naming semântico e consistente
- Classes agrupadas em componentes reutilizáveis

**Acessibilidade:**
- Contraste adequado (WCAG 2.1 AA)
- Focus states visíveis
- Suporte a screen readers (sr-only)

**Responsividade:**
- Mobile-first
- CSS Grid e Flexbox para layouts adaptativos
- Tipografia fluida

---

O sistema de styling do FinBoost+ garante uma experiência visual consistente, acessível e profissional em todos os dispositivos, mantendo flexibilidade para futuras expansões e personalizações.
