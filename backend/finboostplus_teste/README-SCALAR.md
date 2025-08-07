# Documentação da API com Scalar

## Visão Geral

A documentação da API do FinBoost Plus foi implementada usando **Scalar**, uma ferramenta moderna de documentação de APIs que oferece uma interface elegante e interativa baseada em OpenAPI/Swagger.

## Acessando a Documentação

Após iniciar a aplicação, você pode acessar a documentação através das seguintes URLs:

### 🎯 **Scalar (Recomendado)**
- **URL**: `http://localhost:8080/docs/scalar`
- **Descrição**: Interface moderna e elegante do Scalar

### 📚 **Swagger UI (Alternativo)**
- **URL**: `http://localhost:8080/swagger-ui.html`
- **Descrição**: Interface tradicional do Swagger UI

### 🔧 **API Docs JSON**
- **URL**: `http://localhost:8080/v3/api-docs`
- **Descrição**: Especificação OpenAPI em formato JSON

## Funcionalidades do Scalar

### ✨ **Características Principais**
- Interface moderna e responsiva
- Suporte completo à autenticação JWT
- Modo escuro/claro automático
- Busca avançada com atalho de teclado (Ctrl+K)
- Exemplos de código interativos
- Testador de API integrado

### 🔐 **Autenticação**
A API utiliza autenticação JWT Bearer Token. Para testar endpoints protegidos:

1. Obtenha um token JWT através do endpoint de login
2. Clique no botão "Authorize" no Scalar
3. Insira o token no formato: `Bearer seu_token_aqui`
4. Todos os endpoints protegidos serão testáveis

## Configurações Implementadas

### 📋 **Dependências Adicionadas**
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.6.0</version>
</dependency>
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-common</artifactId>
    <version>2.6.0</version>
</dependency>
```

### ⚙️ **Configurações no application.properties**
```properties
# SpringDoc OpenAPI Configuration
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
springdoc.api-docs.enabled=true

# Configurações específicas para integração com Scalar
springdoc.swagger-ui.disable-swagger-default-url=true
springdoc.swagger-ui.config-url=/v3/api-docs/swagger-config
springdoc.swagger-ui.url=/v3/api-docs
```

## Arquivos Criados

### 🏗️ **Estrutura de Arquivos**
```
src/main/java/com/finboostplus/
├── config/
│   └── OpenApiConfig.java          # Configuração da API OpenAPI
├── controller/
│   └── ApiDocsController.java      # Controller para servir o Scalar
│   └── UserController.java         # Atualizado com anotações de documentação

src/main/resources/
└── templates/
    └── scalar-docs.html            # Template HTML do Scalar
```

## Como Usar

### 🚀 **Iniciando a Aplicação**
```bash
mvn spring-boot:run
```

### 📖 **Acessando a Documentação**
1. Abra o navegador
2. Navegue para `http://localhost:8080/docs/scalar`
3. Explore a documentação interativa

### 🧪 **Testando Endpoints**
1. Clique em qualquer endpoint na documentação
2. Preencha os parâmetros necessários
3. Clique em "Send Request" para testar
4. Veja a resposta em tempo real

## Vantagens do Scalar vs Swagger UI

### ✅ **Scalar**
- Interface mais moderna e elegante
- Melhor experiência do usuário
- Performance superior
- Suporte nativo ao modo escuro
- Busca mais intuitiva

### 📊 **Swagger UI**
- Mais tradicional e familiar
- Amplamente adotado
- Funcionalidades robustas

## Próximos Passos

### 🔄 **Melhorias Futuras**
1. **Documentação Avançada**: Adicionar mais exemplos e descrições detalhadas
2. **Temas Personalizados**: Customizar cores e layout do Scalar
3. **Versionamento**: Implementar versionamento da API
4. **Ambientes**: Configurar diferentes ambientes (dev, staging, prod)

### 📝 **Adicionando Documentação aos Controllers**
Para documentar novos endpoints, use as anotações:

```java
@Operation(summary = "Título do endpoint", description = "Descrição detalhada")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Sucesso"),
    @ApiResponse(responseCode = "400", description = "Erro de validação"),
    @ApiResponse(responseCode = "401", description = "Não autorizado")
})
@Tag(name = "Nome do Grupo", description = "Descrição do grupo de endpoints")
```

## Suporte

Para dúvidas ou problemas relacionados à documentação da API, consulte:
- [Documentação do SpringDoc](https://springdoc.org/)
- [Documentação do Scalar](https://github.com/scalar/scalar)
- [OpenAPI Specification](https://swagger.io/specification/)
