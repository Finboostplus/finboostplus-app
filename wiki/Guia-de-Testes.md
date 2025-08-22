Este guia descreve como escrever, organizar e executar testes no **FinBoost+**.  
Nosso objetivo é garantir a qualidade do código e reduzir regressões, cobrindo as principais funcionalidades do sistema.

---

### Frontend (React + Vite)

#### Tecnologias

- **[Jest](https://jestjs.io/)** → Execução de testes unitários e de integração.  
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** → Testes de componentes focados na experiência do usuário.  
- **[Vitest](https://vitest.dev/)** → Alternativa rápida de execução (configurada via Vite).

#### Executando Testes

```bash
# Rodar todos os testes
npm test

# Rodar em modo "watch"
npm test -- --watch

# Gerar relatório de cobertura
npm test -- --coverage

# Rodar um teste específico
npm test -- Button.test.jsx
```

#### Estrutura de Arquivos de Teste

```
frontend/
├── __tests__/
│   ├── components/   
│   │   └── Button.test.jsx
│   ├── integration/
```

#### Exemplo de Teste (React Testing Library)

```javascript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('deve chamar onClick quando clicado', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Clique</Button>)
    
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

### Backend (Java + Spring Boot)

#### Tecnologias

- **JUnit 5** → Testes unitários e de integração.
- **Mockito** → Simulação de dependências.
- **Spring Boot Test** → Integração com contexto Spring.

#### Executando Testes

```bash
# Rodar todos os testes
./mvnw test

# Gerar relatório de cobertura com JaCoCo
./mvnw test jacoco:report

# Abrir relatório no navegador
open target/site/jacoco/index.html
```

#### Estrutura de Arquivos de Teste

```
finboostplus-server/
    ├── src/main/java/...    # Código-fonte
    ├── src/test/java/...    # Testes
```

#### Exemplo de Teste (JUnit + Mockito)

```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ExpenseServiceTest {

    @Autowired
    private ExpenseService expenseService;

    @Test
    void shouldCreateExpenseSuccessfully() {
        // Given
        CreateExpenseRequest request = new CreateExpenseRequest("Jantar", 100.0);
        
        // When
        ExpenseDto result = expenseService.createExpense(request, "user@test.com");
        
        // Then
        assertThat(result.getDescription()).isEqualTo("Jantar");
        assertThat(result.getAmount()).isEqualTo(100.0);
    }
}
```

---

### Cobertura de Testes

- **Frontend:** mínimo recomendado **70%**.
- **Backend:** mínimo recomendado **70%**.

### Priorizar testes em:
- Regras de negócio críticas.
- Fluxos principais do usuário.
- Integração com APIs e banco de dados.

---

**Relacionado:**  
[Boas Práticas de Desenvolvimento](./Boas-Praticas-de-Desenvolvimento) | [Fluxo de Git e Branches](./Fluxo-de-Git-e-Branches) | [Padrões de Código](./Padroes-de-Codigo)