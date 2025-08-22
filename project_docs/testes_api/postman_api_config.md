# Configurando o Postman para Requisições da API

## Credenciais da Aplicação

Para configurar adequadamente o Postman para fazer requisições à API, você precisará das credenciais da aplicação.

## Obtendo o Token JWT

### Configuração de Autenticação

Para obter o token JWT, siga os passos abaixo:

1. Na aba **Authorization**, defina o **Type** como **Basic Auth**
2. Forneça as credenciais da aplicação:
   - **Username**: `myclientid`
   - **Password**: `myclientsecret`

> ⚠️ **Atenção**: Certifique-se de usar a URL correta do OAuth2

### Configuração do Corpo da Requisição

No corpo da requisição:

- Marque a opção indicada (não envie JSON neste caso)
- Forneça o e-mail (tratado como nome único de usuário na aplicação)
- Inclua a senha do usuário
- Defina `grant_type` como `password`

**Exemplo de parâmetros:**
```
email: usuario@exemplo.com
password: senhaDoUsuario
grant_type: password
```

### Executando a Requisição

1. Configure o método como **POST**
2. Execute a requisição
3. **Copie o token** retornado

### Automação com Variáveis de Ambiente

Para quem trabalha com variáveis de ambiente, é possível salvar automaticamente o token gerado em uma variável chamada `token` por meio de um script personalizado.

## Acessando Endpoints Protegidos

### Configuração Bearer Token

Para acessar endpoints protegidos:

1. Altere o tipo de requisição para **Bearer Token**
2. Cole o token obtido anteriormente
3. Execute as requisições protegidas

### Requisições Sem Proteção

Para realizar requisições que não necessitam autenticação, volte para a opção **No Auth**.

## Endpoint de Cadastro de Usuário

### Rota `/user` - Método POST

Esta rota permite realizar o cadastro de um usuário. Utilize o exemplo JSON abaixo:

```json
{
  "name": "Bruno",
  "email": "bruno@gmail.com",
  "password": "123456",
  "colorTheme": "#FFF"
}
```

### Como Usar

1. Configure o método como **POST**
2. Defina a URL para `/user`
3. No corpo da requisição, selecione **JSON**
4. Insira o JSON de exemplo adaptado com os dados desejados
5. Execute a requisição

---

**Dica**: Mantenha suas credenciais seguras e utilize variáveis de ambiente sempre que possível para evitar exposição de informações sensíveis.