A documentação técnica e interativa da API do **FinBoost+** está disponível online via **Swagger** e **Scalar**.

---

### Acessando a Documentação

Ambiente de Desenvolvimento (local) 
```
http://localhost:8080/swagger-ui.html
```

Ambiente de Produção (deploy)
```
https://api.finboostplus.com/swagger-ui.html
```

Também disponível via **Scalar** em:
```
https://api.finboostplus.com/scalar
```

---

### Recursos Disponíveis na Documentação Interativa

- Visualizar **todos os endpoints** e seus métodos (GET, POST, PUT, DELETE).
- Ver **descrição dos parâmetros** e **corpos de requisição**.
- Testar requisições diretamente no navegador.
- Ver exemplos de **respostas esperadas**.

---

### Boas Práticas ao Usar a API

- Sempre usar **HTTPS** em produção.
- Utilizar **tokens JWT válidos** nas rotas protegidas.
- Seguir a política de **limite de requisições** (rate limit) se definida.
- Em ambientes de teste, usar dados fictícios.

---

### Tecnologias Utilizadas

- **Spring Boot** com SpringDoc OpenAPI para geração do Swagger.
- **JWT Authentication** para segurança.
- **PostgreSQL** como banco de dados.

---

**Relacionado:**  
[API - Guia Rápido](./API‐Guia-Rapido)