# 🤝 Guia de Contribuição - FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/Contribuições-Bem_Vindas-brightgreen" alt="Contribuições">
  <img src="https://img.shields.io/badge/Primeira_Contribuição-Friendly-blue" alt="Primeira Contribuição">
  <img src="https://img.shields.io/badge/Code_Review-Obrigatório-red" alt="Code Review">
</div>

Obrigado por considerar contribuir para o **FinBoost+**! Este guia ajudará você a entender nosso processo de desenvolvimento e como fazer contribuições efetivas.

---

## 🎯 **Como Contribuir**

### **Pull Requests**

1. **Fork** do repositório
2. **Clone** seu fork: `git clone https://github.com/SEU_USUARIO/finboostplus-app.git`
3. **Crie uma branch**: `git checkout -b feature/sua-funcionalidade`
4. **Desenvolva** seguindo nossos padrões
5. **Teste** suas alterações
6. **Commit** com mensagens claras
7. **Push**: `git push origin feature/sua-funcionalidade`
8. **Abra um Pull Request**

---

## 📋 **Padrões de Desenvolvimento**

### **🏷️ Convenções de Commit**

Usamos [Conventional Commits](https://www.conventionalcommits.org/pt-br/) para manter histórico organizado:

```bash
tipo(escopo): descrição

# Tipos permitidos:
feat:     # Nova funcionalidade
fix:      # Correção de bug
docs:     # Documentação
style:    # Formatação, sem mudança de lógica
refactor: # Refatoração de código
test:     # Adição ou correção de testes
chore:    # Tarefas de manutenção
```

**Exemplos:**
```bash
feat(auth): adiciona autenticação JWT
fix(expenses): corrige cálculo de divisão de despesas
docs(readme): atualiza instruções de instalação
test(button): adiciona testes para componente Button
```

### **🌿 Estratégia de Branches**

```
main                    # Produção - sempre estável
├── develop            # Desenvolvimento - integração
├── feature/nome       # Novas funcionalidades
├── fix/nome          # Correções
└── docs/nome         # Documentação
```

**Nomenclatura:**
- `feature/auth-jwt` - Nova funcionalidade de autenticação
- `fix/expense-calculation` - Correção no cálculo de despesas
- `docs/contributing-guide` - Documentação

### **📝 Padrões de Código**

#### **Frontend (React)**
```javascript
// ✅ Bom
import { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null)
  
  // Hooks no início
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])
  
  // Early return para casos especiais
  if (!user) return <Loading />
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <Button onClick={handleEdit}>Editar</Button>
    </div>
  )
}

export default UserProfile
```

#### **Backend (Java/Spring)**
```java
// ✅ Bom
@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    
    private final ExpenseService expenseService;
    
    @PostMapping
    public ResponseEntity<ExpenseDto> createExpense(
            @Valid @RequestBody CreateExpenseRequest request,
            Authentication authentication) {
        
        ExpenseDto expense = expenseService.createExpense(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(expense);
    }
}
```

---

## 🧪 **Testes**

### **Cobertura Mínima**
- **Frontend:** 80%+
- **Backend:** 85%+

### **Tipos de Teste**

#### **Frontend**
```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm test -- --watch

# Cobertura
npm test -- --coverage

# Teste específico
npm test -- Button.test.jsx
```

**Exemplo de teste:**
```javascript
// components/Button.test.jsx
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

#### **Backend**
```bash
# Executar todos os testes
./mvnw test

# Testes com cobertura
./mvnw test jacoco:report

# Ver relatório
open target/site/jacoco/index.html
```

**Exemplo de teste:**
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

## 📁 **Estrutura de Arquivos**

### **Adicionando Nova Funcionalidade**

```bash
# Frontend
src/
├── components/
│   └── expenses/           # Nova feature
│       ├── ExpenseForm.jsx
│       ├── ExpenseList.jsx
│       └── index.js
├── pages/
│   └── Expenses/           # Nova página
│       ├── index.jsx
│       └── ExpensesActions.jsx
├── hooks/
│   └── useExpenses.js      # Hook customizado
└── services/
    └── expenses.js         # API calls

# Backend
src/main/java/com/finboost/
├── controller/
│   └── ExpenseController.java
├── service/
│   └── ExpenseService.java
├── model/
│   └── Expense.java
├── repository/
│   └── ExpenseRepository.java
└── dto/
    ├── ExpenseDto.java
    └── CreateExpenseRequest.java
```

---

## 🔍 **Code Review**

### **Checklist do Reviewer**

#### **Frontend**
- [ ] Componentes seguem padrões do projeto
- [ ] Props têm PropTypes ou TypeScript
- [ ] Testes cobrem funcionalidades principais
- [ ] CSS é responsivo e segue design system
- [ ] Não há console.logs esquecidos
- [ ] Imports estão organizados

#### **Backend**
- [ ] Endpoints seguem REST conventions
- [ ] Validação de entrada adequada
- [ ] Tratamento de erros consistente
- [ ] Testes unitários e integração
- [ ] Documentação JavaDoc quando necessário
- [ ] Segurança considerada

### **Checklist do Autor**

Antes de abrir um PR, verifique:

- [ ] **Funciona:** Testei localmente
- [ ] **Testes:** Adicionei/atualizei testes
- [ ] **Documentação:** Atualizei quando necessário
- [ ] **Linting:** Código passou no ESLint/Checkstyle
- [ ] **Commits:** Mensagens seguem padrão
- [ ] **Descrição:** PR tem descrição clara do que faz

---

## 🚀 **Setup de Desenvolvimento**

### **Primeira Configuração**

```bash
# 1. Clone e setup
git clone https://github.com/Finboostplus/finboostplus-app.git
cd finboostplus-app

# 2. Backend
cd backend/finboostplus_teste
./mvnw clean install
./mvnw spring-boot:run

# 3. Frontend (novo terminal)
cd ../../frontend
npm install
npm run dev

# 4. Teste se está funcionando
curl http://localhost:8080/actuator/health
curl http://localhost:5173
```

### **Banco de Dados de Desenvolvimento**

```bash
# Docker (Recomendado)
docker run --name postgres-finboost-dev \
  -e POSTGRES_DB=finboost_dev \
  -e POSTGRES_USER=finboost \
  -e POSTGRES_PASSWORD=dev123 \
  -p 5432:5432 -d postgres:15

# Configurar backend/src/main/resources/application-dev.yml
```

### **Ferramentas Recomendadas**

#### **VS Code Extensions**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Extension Pack for Java
- GitLens
- Prettier - Code formatter

#### **IntelliJ IDEA Plugins**
- Spring Boot
- Database Navigator
- GitToolBox

---

## 📚 **Recursos**

### **Documentação Técnica**
- [Documentação Completa](https://finboostplus.github.io/finboostplus-app/)
- [Frontend Guide](./frontend/README.md)
- [Backend Guide](./backend/README.md)
- [Testing Guide](./frontend/TESTING_GUIDE.md)

### **Referências Externas**
- [React Docs](https://react.dev/)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ **FAQ**

### **Q: Como fazer minha primeira contribuição?**
A: Comece com issues marcadas como `good first issue` ou `help wanted`. São problemas menores e bem definidos.

### **Q: Posso contribuir apenas com documentação?**
A: Sim! Documentação é fundamental. Issues com label `documentation` são uma ótima forma de começar.

### **Q: Como reportar um bug de segurança?**
A: Para vulnerabilidades de segurança, envie email para: **finboostplus.security@gmail.com**

### **Q: Posso usar bibliotecas externas?**
A: Sim, mas discuta primeiro abrindo uma issue. Preferimos soluções que não aumentem muito o bundle size.

### **Q: Como funciona o processo de release?**
A: Releases são feitas a partir da branch `main` após aprovação da equipe. Tags seguem [Semantic Versioning](https://semver.org/).

---

## 👥 **Equipe e Contato**

### **Core Team**
- **🏆 Product Owner:** Alan Oliveira
- **🔙 Backend Lead:** Bruno Henrique
- **🎨 Frontend Lead:** Cleiton
- 
### **Como Nos Encontrar**
- 📧 **Email:** finboostplus@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/Finboostplus/finboostplus-app/issues)

---

## 📄 **Licença**

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---

<div align="center">
  <strong>🤝 Obrigado por contribuir com o FinBoost+!</strong><br/>
  <em>Juntos construímos uma ferramenta financeira melhor para todos</em>
</div>
