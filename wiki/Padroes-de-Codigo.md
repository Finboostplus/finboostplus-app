Este guia define as convenções de nomenclatura e escrita de código adotadas no **FinBoost+** para garantir consistência e legibilidade entre todos os membros da equipe.

---

### Convenções de Nomenclatura

#### Java / Backend

- **camelCase** → variáveis e métodos  
  ```java
  String userName;
  getUserData();
  ```

- **PascalCase** → classes
  ```java
  public class ExpenseService { ... }
  ```

- **snake_case** → nomes de tabelas e colunas no banco de dados
  ```sql
  CREATE TABLE user_accounts (
      id SERIAL PRIMARY KEY, 
      created_at TIMESTAMP
  );
  ```

#### JavaScript / Frontend

- **camelCase** → variáveis e funções
  ```javascript
  const userName = "João";
  function getUserData() { ... }
  ```

- **PascalCase** → componentes React
  ```javascript
  function ExpenseList() { ... }
  export default ExpenseList;
  ```

---

### Comentários

- Sempre em **português**, objetivos e claros.
- Evitar comentários redundantes que expliquem código óbvio.
- Utilizar **JSDoc** (frontend) ou **Javadoc** (backend) para funções, classes e métodos que sejam reutilizáveis.

---

### Boas Práticas Adicionais

- Manter indentação consistente (2 ou 4 espaços, conforme o padrão do projeto).
- Limitar o comprimento de linhas para facilitar leitura (ex.: 100–120 caracteres).
- Evitar variáveis com nomes genéricos como `data` ou `temp` — prefira nomes descritivos.
- Sempre remover código comentado e `console.log`/`System.out.println` antes de fazer commit.
- Manter imports organizados e remover os não utilizados.

---

**Relacionado:**  
[Boas Práticas de Desenvolvimento](./Boas-Praticas-de-Desenvolvimento) | [Fluxo de Git e Branches](./Fluxo-de-Git-e-Branches)