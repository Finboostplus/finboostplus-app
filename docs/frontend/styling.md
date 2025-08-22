# Styling - Frontend FinBoost+

## Visão Geral

Sistema de estilização baseado em **TailwindCSS** + **CSS Custom Properties** para design system consistente, responsivo e com suporte a temas claro/escuro.

## Filosofia de Design

!!! abstract "Princípios Fundamentais"
- **Utility-First:** Classes utilitárias do TailwindCSS
- **Design System:** Tokens para cores, tipografia e espaçamentos
- **Mobile-First:** Responsividade priorizando dispositivos móveis
- **Acessibilidade:** Contraste adequado e suporte a leitores de tela
- **Tema Dinâmico:** Alternância entre modo claro e escuro

### Metodologia

=== "Component-Based"
    Estilos organizados por componentes reutilizáveis

=== "CSS Variables"
    Tokens de design centralizados e reutilizáveis

=== "Naming Semântico"
    Convenções claras para cores e espaçamentos

=== "Progressive Enhancement"
    Funcionalidades avançadas para navegadores modernos

## Sistema de Cores

### Tokens de Design

=== "Modo Claro"
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

=== "Modo Escuro"
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

| Cor | Significado | Uso no FinBoost+ |
|-----|-------------|------------------|
| 🔵 **Azul Primário** | Confiança, estabilidade | Botões principais, logos, links |
| 🔷 **Azul Secundário** | Modernidade, tecnologia | Botões secundários, destaques |
| 🟢 **Verde** | Sucesso, crescimento | Valores positivos, ganhos, confirmações |
| 🔴 **Vermelho** | Atenção, urgência | Gastos, erros, alertas |
| ⚫ **Neutro** | Calma, equilíbrio | Backgrounds, divisores |
| ⚪ **Surface** | Limpeza, organização | Cards, modais, áreas de conteúdo |

## Implementação com TailwindCSS

### Classes Personalizadas

```css
/* Usando CSS Variables com Tailwind */
.btn-primary {
  @apply bg-primary text-white hover:bg-primary-dark 
         focus:ring-2 focus:ring-primary-light;
}

.card {
  @apply bg-surface border border-neutral rounded-lg 
         shadow-sm dark:shadow-lg;
}

.text-success {
  color: var(--color-success);
}
```

### Configuração do Tema

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        neutral: 'var(--color-neutral)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

## Componentes Estilizados

### Padrões de Button

```jsx
// Exemplo de componente com variantes
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseStyles = 'font-medium rounded-lg focus:outline-none focus:ring-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light',
    success: 'bg-success text-white hover:bg-success-dark focus:ring-success-light',
    ghost: 'text-primary hover:bg-primary-light focus:ring-primary-light',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Cards Responsivos

```jsx
const Card = ({ children, className = '' }) => (
  <div className={`
    bg-surface border border-neutral rounded-lg shadow-sm
    p-4 md:p-6 
    dark:bg-surface dark:border-neutral dark:shadow-lg
    ${className}
  `}>
    {children}
  </div>
);
```

## Responsividade

### Breakpoints TailwindCSS

| Breakpoint | Tamanho | Uso |
|------------|---------|-----|
| `sm` | 640px+ | Tablets pequenos |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Desktop pequeno |
| `xl` | 1280px+ | Desktop |
| `2xl` | 1536px+ | Desktop grande |

### Exemplo Mobile-First

```jsx
const ResponsiveGrid = () => (
  <div className="
    grid grid-cols-1           // Mobile: 1 coluna
    sm:grid-cols-2             // Tablet pequeno: 2 colunas  
    lg:grid-cols-3             // Desktop: 3 colunas
    gap-4 sm:gap-6 lg:gap-8    // Espaçamento responsivo
    p-4 sm:p-6 lg:p-8          // Padding responsivo
  ">
    {/* Conteúdo */}
  </div>
);
```

## Acessibilidade

### Contraste e Visibilidade

```css
/* Garantindo contraste adequado WCAG 2.1 AA */
.high-contrast {
  @apply text-gray-900 dark:text-gray-100;
}

/* Estados de foco visíveis */
.focus-visible:focus {
  @apply outline-none ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800;
}

/* Texto para leitores de tela */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
}
```

### Estados Interativos

```jsx
const AccessibleButton = ({ children, ...props }) => (
  <button
    className="
      px-4 py-2 rounded
      bg-primary text-white
      hover:bg-primary-dark
      focus:outline-none focus:ring-2 focus:ring-primary-light
      active:bg-primary-darker
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
    "
    {...props}
  >
    {children}
  </button>
);
```

## Tema Dark/Light

### Toggle de Tema

```jsx
import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
};
```

### Componente ThemeToggle

```jsx
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg
        bg-neutral hover:bg-neutral-dark
        text-text dark:text-text-dark
        transition-all duration-200
      "
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

## Animações e Transições

### Transições Suaves

```css
/* Classes utilitárias para transições */
.transition-smooth {
  @apply transition-all duration-300 ease-in-out;
}

.hover-lift {
  @apply transform hover:scale-105 transition-transform duration-200;
}

.fade-in {
  @apply animate-fade-in;
}

/* Animações customizadas */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Micro-interações

```jsx
const Card = ({ children }) => (
  <div className="
    bg-surface rounded-lg shadow-sm
    hover:shadow-md hover:scale-105
    transition-all duration-200 ease-in-out
    cursor-pointer
  ">
    {children}
  </div>
);
```

## Performance

!!! success "Otimizações"
- **PurgeCSS:** TailwindCSS remove classes não utilizadas automaticamente
- **CSS Variables:** Mudanças de tema sem re-render completo  
- **Minimal Custom CSS:** Máximo uso das classes utilitárias
- **Critical CSS:** Estilos críticos inline quando necessário

## Debugging

### Ferramentas Úteis

```jsx
// Componente para debug de breakpoints
const BreakpointDebug = () => (
  <div className="fixed top-0 left-0 p-2 bg-black text-white text-xs z-50">
    <span className="block sm:hidden">XS</span>
    <span className="hidden sm:block md:hidden">SM</span>
    <span className="hidden md:block lg:hidden">MD</span>
    <span className="hidden lg:block xl:hidden">LG</span>
    <span className="hidden xl:block">XL</span>
  </div>
);

// Helper para ver CSS variables aplicadas
const debugCSSVars = () => {
  const root = getComputedStyle(document.documentElement);
  console.log({
    primary: root.getPropertyValue('--color-primary'),
    secondary: root.getPropertyValue('--color-secondary'),
    // ... outras variáveis
  });
};
```

## Melhores Práticas

!!! tip "Desenvolvimento"
- **Consistência:** Use sempre os tokens de design
- **Semântica:** Nomes de classes descritivos
- **Reutilização:** Extraia padrões comuns em componentes
- **Performance:** Prefira classes do Tailwind ao CSS customizado

---

!!! abstract "Resumo"
O sistema de styling garante **consistência visual**, **acessibilidade** e **performance** em todos os dispositivos, mantendo flexibilidade para expansões futuras.