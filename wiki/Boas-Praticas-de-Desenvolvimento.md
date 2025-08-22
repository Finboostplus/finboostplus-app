Estas diretrizes ajudam a manter o código do **FinBoost+** limpo, organizado e fácil de manter, garantindo qualidade e consistência entre todos os desenvolvedores.

---

### Organização de Código

- **Modularização por componentes e serviços** — evite arquivos muito grandes e com múltiplas responsabilidades.  
- **Divisão clara de responsabilidades**:
  - `Controller` → Receber requisições e retornar respostas.
  - `Service` → Implementar a lógica de negócio.
  - `Model` → Definir as entidades e estruturas de dados.
  - `Repository` → Acesso ao banco de dados.

---

### Documentação de Código

- **Backend:** Documentação automática com **Swagger/OpenAPI**.  
- **Frontend:** Uso de **JSDoc** para funções e componentes reutilizáveis.  
- **Backend:** Uso de **Javadoc** para classes e métodos reutilizáveis.  
- **Comentários** somente quando necessários — código limpo deve ser autoexplicativo.

---

### Testes

- **Backend:** [JUnit](https://junit.org/) + [Mockito](https://site.mockito.org/) para testes unitários e de integração.  
- **Frontend:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + Vitest para testes de interface.  
- Priorizar:
  - Testes unitários para funções críticas.
  - Testes de integração para fluxos principais.
  - Cobertura mínima recomendada: **70%**.

---

### Boas Práticas de Colaboração

- Faça **commits pequenos e frequentes**.
- Siga o padrão de commits do [Fluxo de Git e Branches](./Fluxo-de-Git-e-Branches).
- Sempre crie **Pull Requests** para revisão de código.
- Revise o código de outros membros com atenção e respeito.
- Mantenha o repositório **atualizado** antes de iniciar novas tarefas.

---

**Relacionado:**  
[Fluxo de Git e Branches](./Fluxo-de-Git-e-Branches) | [Padrões de Código](./Padroes-de-Codigo) | [Guia de Testes](./Guia-de-Testes)
