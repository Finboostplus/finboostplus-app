# 🔧 Guia de Configurações - FinBoost Plus

## 📁 Estrutura das Configurações

### ✅ **Por que Manter Separado (Recomendado)**

```
config/
├── ResourceServerConfig.java     # Segurança OAuth2/JWT principal
├── H2SecurityConfig.java        # H2 Console (só perfil test)
├── CorsConfig.java             # Configurações CORS
├── OpenApiConfig.java          # Swagger/OpenAPI
└── AuthorizationServerConfig.java # Servidor OAuth2
```

**Vantagens:**
- ✅ **Responsabilidade única** - cada arquivo tem propósito específico
- ✅ **Manutenibilidade** - fácil localizar e modificar configs
- ✅ **Profiles** - configs condicionais (ex: H2 só em test)
- ✅ **Evita conflitos** - com `@Order` e `securityMatcher` específicos
- ✅ **Reutilização** - habilitar/desabilitar independentemente

### ⚠️ **Problemas de Uma Config Unificada**

```java
// NÃO RECOMENDADO - Arquivo único grande
@Configuration
public class AllInOneConfig {
    // 200+ linhas misturando CORS, Security, Swagger, etc.
    // Difícil de manter e entender
}
```

**Desvantagens:**
- ❌ **Difícil manutenção** - arquivo muito grande
- ❌ **Responsabilidades misturadas** - viola SOLID
- ❌ **Conflitos** - mais difícil debuggar problemas
- ❌ **Profiles complexos** - lógica condicional confusa

---

## 🛡️ Como Evitar Conflitos de Segurança

### 1. **Use @Order para Prioridade**
```java
@Bean
@Order(1)  // PRIMEIRA prioridade
public SecurityFilterChain h2Console(HttpSecurity http) { ... }

@Bean  
@Order(2)  // SEGUNDA prioridade
public SecurityFilterChain mainSecurity(HttpSecurity http) { ... }
```

### 2. **Use securityMatcher Específicos**
```java
// H2 Console - APENAS /h2-console/**
.securityMatcher(AntPathRequestMatcher.antMatcher("/h2-console/**"))

// Main - TODAS exceto /h2-console
.securityMatcher(request -> !request.getRequestURI().startsWith("/h2-console"))
```

### 3. **Use @Profile para Ambiente**
```java
@Configuration
@Profile("test")  // Só ativa em ambiente de teste
public class H2SecurityConfig { ... }
```

---

## 🗃️ Dados Iniciais (import.sql)

### ✅ **SIM, você precisa do import.sql!**

**Por que é necessário:**
- 🔑 **Roles obrigatórias** - sistema não funciona sem elas
- 📊 **Dados de referência** - categorias padrão
- 👤 **Admin inicial** - para primeiros testes

### 🔄 **Funciona em Ambos:**

**H2 (Teste):**
```properties
spring.jpa.hibernate.ddl-auto=create-drop  # Recria BD + executa import.sql
```

**PostgreSQL (Docker):**
```properties
spring.jpa.hibernate.ddl-auto=create-drop  # Recria BD + executa import.sql
```

### 📋 **O que contém:**
```sql
-- OBRIGATÓRIO - Roles do sistema
INSERT INTO roles (authority) VALUES ('ROLE_USER');
INSERT INTO roles (authority) VALUES ('ROLE_ADMIN');
INSERT INTO roles (authority) VALUES ('ROLE_OWNER');

-- OPCIONAL - Categorias padrão (facilita desenvolvimento)
INSERT INTO categories (name, description, color, icon) VALUES 
    ('Alimentação', 'Gastos com comida e bebidas', '#FF6B6B', 'utensils');

-- APENAS DEV/TEST - Admin inicial (REMOVER EM PRODUÇÃO!)
INSERT INTO users (name, email, password) VALUES 
    ('Admin', 'admin@finboost.com', '$2a$10$...');
```

---

## 🚀 Para Produção

### 1. **Use Flyway Migrations**
```
src/main/resources/db/migration/
├── V1__create_initial_schema.sql
├── V2__insert_roles.sql
└── V3__insert_categories.sql
```

### 2. **Remove Dados Sensíveis**
```sql
-- ❌ REMOVER EM PRODUÇÃO
-- INSERT INTO users (name, email, password) VALUES ('Admin', ...);
```

### 3. **Configuração Específica por Ambiente**
```properties
# application-prod.properties
spring.jpa.hibernate.ddl-auto=validate  # NÃO recria tabelas
spring.flyway.enabled=true              # USA migrations
```

---

## 📋 Checklist de Configuração

### ✅ **Configurações Atuais:**
- [x] ResourceServerConfig com @Order(2)
- [x] H2SecurityConfig com @Order(1) + @Profile("test")
- [x] CorsConfig separado e funcional
- [x] import.sql com roles obrigatórias
- [x] Compatibilidade H2 + PostgreSQL

### 🎯 **Próximos Passos:**
- [ ] Testar com PostgreSQL via Docker
- [ ] Configurar Flyway para produção
- [ ] Remover dados sensíveis em prod
- [ ] Monitorar logs para conflitos

---

## 🐛 Troubleshooting

### Erro: "UnreachableFilterChainException"
```
Causa: Múltiplos SecurityFilterChain sem securityMatcher específico
Solução: Use securityMatcher() em cada @Bean SecurityFilterChain
```

### Erro: "Roles não encontradas"
```
Causa: import.sql não foi executado
Solução: Verifique spring.jpa.hibernate.ddl-auto=create-drop
```

### H2 Console não funciona
```
Causa: ResourceServerConfig bloqueando /h2-console
Solução: H2SecurityConfig com @Order(1) + securityMatcher específico
```
