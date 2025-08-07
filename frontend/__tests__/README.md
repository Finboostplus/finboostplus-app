# 🧪 Testes - Frontend FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/Framework-Vitest-yellow" alt="Vitest">
  <img src="https://img.shields.io/badge/Library-React_Testing_Library-red" alt="RTL">
  <img src="https://img.shields.io/badge/Coverage-80%+-green" alt="Coverage">
</div>

Este diretório contém todos os **testes automatizados** do frontend FinBoost+, seguindo as melhores práticas da indústria com **Vitest** e **React Testing Library**.

## 🧪 Status Atual

**✅ 19 testes passando em 4 arquivos**

```
 ✓ components/Header.test.jsx (1 teste)
 ✓ components/Logo.test.jsx (4 testes)  
 ✓ components/Button.test.jsx (9 testes)
 ✓ integration/LoginForm.test.jsx (5 testes)
```

## 📁 Estrutura

```
__tests__/
├── components/           # Testes de componentes individuais
│   ├── Header.test.jsx   # Teste do Header
│   ├── Logo.test.jsx     # Teste do LogoImage
│   └── Button.test.jsx   # Teste do ButtonUI
├── integration/          # Testes de integração
│   └── LoginForm.test.jsx # Teste de formulário completo
├── setup.js             # Configuração global dos testes
└── test-utils.js        # Utilitários e helpers
```

## 🚀 Como Executar

```bash
# Todos os testes
npm test

# Com relatório de coverage
npm test -- --coverage

# Modo watch (desenvolvimento)
npm test -- --watch

# Teste específico
npm test -- Header.test.jsx
```

## 📖 Guias

- **[TESTING_GUIDE.md](../TESTING_GUIDE.md)** - Guia completo de como escrever testes
- **[test-utils.js](./test-utils.js)** - Funções auxiliares para testes
- **[setup.js](./setup.js)** - Configuração e mocks globais

## 🎯 Exemplos por Tipo

### Teste Simples
```jsx
// components/Logo.test.jsx
it('deve renderizar a imagem do logo', () => {
  render(<LogoImage />);
  
  const logoImg = screen.getByAltText('Logo da Finboostplus');
  expect(logoImg).toBeInTheDocument();
});
```

### Teste com Interação
```jsx
// components/Button.test.jsx
it('deve chamar a função onClick quando clicado', () => {
  const mockClick = vi.fn();
  render(<ButtonUI title="Botão teste" fnClick={mockClick} />);
  
  fireEvent.click(screen.getByRole('button'));
  
  expect(mockClick).toHaveBeenCalledTimes(1);
});
```

### Teste de Integração
```jsx
// integration/LoginForm.test.jsx
it('deve submeter o formulário com dados válidos', async () => {
  const user = userEvent.setup();
  const mockSubmit = vi.fn().mockResolvedValue();
  
  render(<LoginForm onSubmit={mockSubmit} />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/senha/i), 'password123');
  await user.click(screen.getByRole('button', { name: /entrar/i }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

## 🔧 Tecnologias

- **[Vitest](https://vitest.dev/)** - Framework de testes
- **[React Testing Library](https://testing-library.com/react)** - Testes de componentes React
- **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)** - Matchers customizados
- **[@testing-library/user-event](https://github.com/testing-library/user-event)** - Simulação de eventos

## ✨ Próximos Passos

1. Adicionar testes para componentes existentes em `src/components/`
2. Criar testes para hooks em `src/hooks/`
3. Adicionar testes para páginas em `src/pages/`

---

**💡 Dica:** Consulte o [TESTING_GUIDE.md](../TESTING_GUIDE.md) para exemplos detalhados e boas práticas!

---

<div align="center">
  <strong>🧪 Testes automatizados - FinBoost+</strong><br/>
  <em>Qualidade e confiabilidade garantidas</em>
</div>
