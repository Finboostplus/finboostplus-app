# Guia de Testes Backend (JUnit 5 + Mockito + Spring Boot)

<div align="center">
  <img src="https://img.shields.io/badge/Test-JUnit_5-25A162" />
  <img src="https://img.shields.io/badge/Mock-Mockito-blue" />
  <img src="https://img.shields.io/badge/Cobertura-JaCoCo-orange" />
</div>

<details>
<summary><strong>📚 Sumário</strong></summary>

- [Camadas de Teste](#camadas-de-teste)
- [Comandos](#comandos)
- [Estrutura Recomendada](#estrutura-recomendada)
- [Dependências Principais (já presentes)](#dependências-principais-já-presentes)
- [Exemplos](#exemplos)
  - [Teste Unitário (Service + Mockito)](#1-teste-unitário-service--mockito)
  - [Controller (@WebMvcTest)](#2-controller-webmvctest)
  - [Repository (@DataJpaTest)](#3-repository-datajpatest)
  - [Integração (@SpringBootTest)](#4-integração-springboottest)
  - [Segurança (Com MockUser)](#5-segurança-com-mockuser)
  - [Test Data Factory](#6-test-data-factory)
- [Cobertura](#cobertura)
- [Boas Práticas](#boas-práticas)
  - [Exceção](#exceção)
- [Testcontainers (Opcional)](#testcontainers-opcional)
- [Matchers Úteis (AssertJ)](#matchers-úteis-assertj)
- [Problemas Comuns](#problemas-comuns)
- [Execução Rápida](#execução-rápida)

</details>

## Camadas de Teste
- ✅ Unitários: testam classes isoladas (Services, Utils) com Mockito.
- ✅ Slice Tests: @WebMvcTest (Controllers), @DataJpaTest (Repos), @JsonTest (Serialização).
- ✅ Integração: @SpringBootTest carregando o contexto completo.
- 🔄 (Opcional) Testcontainers: PostgreSQL real em container (sugerido para evitar H2).

## Comandos
```bash
# Executar testes
./mvnw test

# Executar com relatório JaCoCo
./mvnw test jacoco:report
open target/site/jacoco/index.html

# Teste específico (pattern)
./mvnw -Dtest=UserServiceTest test

# Reexecutar falhas rapidamente
./mvnw -Dtest=UserServiceTest#deveCriarUsuario test
```

## Estrutura Recomendada
```
src/test/java/com/finboostplus/
  config/         # Suportes e utilidades de teste
  factory/        # Builders / TestDataFactory
  controller/     # Controller (WebMvcTest)
  service/        # Unit tests de serviços
  repository/     # DataJpaTest
  integration/    # SpringBootTest + (Testcontainers)
```

## Dependências Principais (já presentes)
- spring-boot-starter-test (JUnit 5, AssertJ, Mockito, JSON)
- spring-security-test (testar segurança)
- jacoco-maven-plugin (cobertura)

## Exemplos
### 1. Teste Unitário (Service + Mockito)
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
  @Mock UserRepository userRepository;
  @InjectMocks UserService userService;

  @Test
  void deveCriarUsuario() {
    var novo = new User("email@test.com","Nome");
    when(userRepository.save(any())).thenAnswer(inv -> { var u = inv.getArgument(0, User.class); u.setId(1L); return u; });

    var salvo = userService.create(novo);

    assertThat(salvo.getId()).isNotNull();
    verify(userRepository).save(novo);
  }
}
```

### 2. Controller (@WebMvcTest)
```java
@WebMvcTest(UserController.class)
class UserControllerTest {
  @Autowired MockMvc mvc;
  @MockBean UserService userService;

  @Test
  void deveRetornarUsuario() throws Exception {
    when(userService.findById(1L)).thenReturn(new User(1L,"email@test.com"));

    mvc.perform(get("/api/users/1"))
       .andExpect(status().isOk())
       .andExpect(jsonPath("$.email").value("email@test.com"));
  }
}
```

### 3. Repository (@DataJpaTest)
```java
@DataJpaTest
class UserRepositoryTest {
  @Autowired UserRepository repo;

  @Test
  void devePersistirEConsultar() {
    var u = repo.save(new User(null, "a@b.com"));
    var encontrado = repo.findByEmail("a@b.com");
    assertThat(encontrado).isPresent();
  }
}
```

### 4. Integração (@SpringBootTest)
```java
@SpringBootTest
@AutoConfigureMockMvc
class AuthFlowIT {
  @Autowired MockMvc mvc;

  @Test
  void fluxoLogin() throws Exception {
    mvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\"email\":\"u@test.com\",\"password\":\"123\"}"))
       .andExpect(status().isOk())
       .andExpect(jsonPath("$.token").exists());
  }
}
```

### 5. Segurança (Com MockUser)
```java
@WebMvcTest(SecureController.class)
class SecureControllerTest {
  @Autowired MockMvc mvc;

  @Test @WithMockUser(username="admin", roles={"ADMIN"})
  void devePermitirAdmin() throws Exception {
    mvc.perform(get("/api/admin/ping"))
       .andExpect(status().isOk());
  }
}
```

### 6. Test Data Factory
```java
public class UserFactory {
  public static User buildValid() { return new User(null, "user"+UUID.randomUUID()+"@test.com"); }
}
```

## Cobertura
- Meta sugerida: >= 80% linhas / 70% branches.
- Focar em regras de negócio (Service, Security, Util). Controllers podem ter menor cobertura.

## Boas Práticas
1. AAA (Arrange / Act / Assert) claro.
2. Nomes descritivos: deveSalvarUsuarioQuandoDadosValidos.
3. Evitar lógica complexa dentro de testes (sem if/for desnecessário).
4. Não mockar o que você não controla (ex: JPA Entities normalmente não precisam de mock).
5. Um assert principal por cenário (agrupado com assertAll quando necessário).
6. Limpar mocks: @ExtendWith(MockitoExtension) já faz reset por teste.
7. Testar exceções: assertThatThrownBy / assertThrows.

### Exceção
```java
@Test
void deveFalharSeEmailDuplicado() {
  when(repo.existsByEmail("a@b.com")).thenReturn(true);
  assertThatThrownBy(() -> service.create(new User(null,"a@b.com")))
      .isInstanceOf(DomainException.class)
      .hasMessageContaining("email");
}
```

## Testcontainers (Opcional)
Adicionar no pom (exemplo):
```xml
<dependency>
  <groupId>org.testcontainers</groupId>
  <artifactId>postgresql</artifactId>
  <scope>test</scope>
</dependency>
```
Config:
```java
@Testcontainers
@SpringBootTest
class DbIT {
  @Container static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:15");
  @DynamicPropertySource
  static void props(DynamicPropertyRegistry r){
    r.add("spring.datasource.url", db::getJdbcUrl);
    r.add("spring.datasource.username", db::getUsername);
    r.add("spring.datasource.password", db::getPassword);
  }
}
```

## Matchers Úteis (AssertJ)
- assertThat(list).hasSize(3).extracting(User::getEmail).contains("a@b.com")
- assertThat(optional).isPresent()
- assertThat(json).contains("token")

## Problemas Comuns
| Erro | Causa | Solução |
|------|-------|---------|
| Failed to load ApplicationContext | Beans faltando / config circular | Usar slice test ou corrigir dependência |
| LazyInitializationException | Sessão fechou no teste | Forçar fetch ou usar @DataJpaTest isolado |
| Port already in use | Execução paralela de @SpringBootTest | Definir random port / desligar contexto pesado |

## Execução Rápida
```bash
./mvnw clean test
./mvnw test jacoco:report
```
Relatório: target/site/jacoco/index.html

---
<div align="center">
  <strong>🧪 Testes Backend - FinBoost+</strong><br/>
  <em>Qualidade e confiabilidade garantidas</em>
</div>
