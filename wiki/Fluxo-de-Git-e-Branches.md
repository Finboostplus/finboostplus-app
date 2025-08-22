Este documento descreve como organizamos o trabalho no **FinBoost+** usando Git.  
Seguir esse fluxo garante que o código fique organizado, fácil de revisar e sem conflitos desnecessários.

---

### Estrutura de Branches

- **`main`** → Branch de produção, sempre estável.  
- **`develop`** → Integração contínua do desenvolvimento.  
- **`feature/nome-da-feature`** → Nova funcionalidade.  
- **`fix/nome-da-correção`** → Correções de bugs.  
- **`hotfix/nome`** → Correções urgentes diretamente em produção.  
- **`docs/nome`** → Atualizações ou criação de documentação.

---

### Fluxo de Trabalho

###3 1. **Atualize o repositório local**
```bash
git checkout develop
git pull origin develop
```

#### 2. **Crie uma branch para sua tarefa**
```bash
git checkout -b feature/nome-da-feature
```

#### 3. **Desenvolva a funcionalidade ou correção**
- Siga os padrões de código e boas práticas.
- Faça commits claros e frequentes.

#### 4. **Envie suas alterações**
```bash
git push origin feature/nome-da-feature
```

#### 5. **Abra um Pull Request (PR)**
- Compare sua branch com `develop`.
- Preencha a descrição do PR.
- Aguarde o code review.

---

### Padrão de Commits

Usamos o formato do **Conventional Commits**:

```
tipo(escopo): descrição breve
```

###3 Tipos mais comuns:
- **`feat`**: nova funcionalidade
- **`fix`**: correção de bug
- **`docs`**: mudanças apenas na documentação
- **`style`**: ajustes de formatação sem impacto na lógica
- **`refactor`**: alteração de código sem mudar funcionalidade
- **`test`**: adição ou modificação de testes
- **`chore`**: tarefas de manutenção

#### Exemplos:
```bash
feat(auth): adiciona autenticação JWT
fix(expenses): corrige cálculo de divisão de despesas
docs(readme): atualiza instruções de instalação
```

---

**Relacionado:**  
[Boas Práticas de Desenvolvimento](./Boas-Praticas-de-Desenvolvimento) | [Padrões de Código](./Padroes-de-Codigo) | [CONTRIBUTING.md](https://github.com/Finboostplus/finboostplus-app/blob/develop/CONTRIBUTING.md)