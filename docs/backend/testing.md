# Testes Automatizados - Backend FinBoost+

## Visão Geral

O backend do FinBoost+ implementa uma estratégia robusta de testes automatizados usando **JUnit 5**, **Mockito** e **Spring Boot Test**. A arquitetura de testes segue as melhores práticas de pirâmide de testes, garantindo cobertura > 70% e qualidade de código.

## Stack de Testes

### Frameworks e Ferramentas
- **JUnit 5**: Framework principal de testes unitários
- **Mockito**: Framework de mocking para isolamento
- **Spring Boot Test**: Testes de integração e slice testing
- **AssertJ**: Assertions fluentes e expressivas
- **Testcontainers**: Containers Docker para testes de integração (opcional)
- **JaCoCo**: Cobertura de código
- **H2**: Banco em memória para testes

### Dependências (pom.xml)
```xml
<dependencies>
    <!-- Starter de testes (inclui JUnit 5, Mockito, AssertJ) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    
    <!-- Testes de segurança -->
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-test</artifactId>
        <scope>test</scope>
    </dependency>
    
    <!-- Docker Compose para testes de integração -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-docker-compose</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## Arquitetura de Testes

### Pirâmide de Testes

```
           /\
          /  \      E2E Tests (poucos, específicos)
         /____\     
        /      \    Integration Tests (@SpringBootTest)
       /        \   
      /__________\  Unit Tests (maioria, isolados)
     /            \
    /______________\ Slice Tests (@WebMvcTest, @DataJpaTest)
```

### Categorias de Testes

1. **Unit Tests (70%)**: Testam classes isoladamente
2. **Slice Tests (20%)**: Testam fatias específicas da aplicação
3. **Integration Tests (10%)**: Testam fluxos completos

## Estrutura de Testes

```
src/test/java/com/finboostplus/
├── config/                          # Configurações de teste
│   ├── TestConfig.java              # Beans para testes
│   └── TestSecurityConfig.java      # Configuração de segurança
├── 
├── factory/                         # Factories de dados de teste
│   ├── UserTestFactory.java         # Criação de usuários
│   ├── GroupTestFactory.java        # Criação de grupos
│   └── ExpenseTestFactory.java      # Criação de despesas
├── 
├── controller/                      # Testes de Controller
│   ├── UserControllerTest.java      # @WebMvcTest
│   ├── GroupControllerTest.java     # @WebMvcTest
│   └── AuthControllerTest.java      # @WebMvcTest
├── 
├── service/                         # Testes de Service
│   ├── UserServiceTest.java         # @ExtendWith(MockitoExtension)
│   ├── GroupServiceTest.java        # Unit tests
│   └── ExpenseServiceTest.java      # Unit tests
├── 
├── repository/                      # Testes de Repository
│   ├── UserRepositoryTest.java      # @DataJpaTest
│   ├── GroupRepositoryTest.java     # @DataJpaTest
│   └── ExpenseRepositoryTest.java   # @DataJpaTest
├── 
├── integration/                     # Testes de Integração
│   ├── AuthFlowIT.java              # @SpringBootTest
│   ├── GroupManagementIT.java       # Fluxos completos
│   └── ExpenseManagementIT.java     # End-to-end
└── 
└── util/                           # Utilitários de teste
    ├── TestUtils.java              # Helpers gerais
    └── DatabaseTestUtils.java     # Utilitários de banco
```

## Tipos de Testes

### 1. Testes Unitários (Service Layer)

**Características:**
- Testam lógica de negócio isolada
- Usam mocks para dependências
- Execução rápida e independente

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock 
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    @DisplayName("Deve criar usuário com dados válidos")
    void shouldCreateUserWithValidData() {
        // Arrange
        var createDTO = UserTestFactory.createValidUserDTO();
        var encodedPassword = "encoded_password";
        var savedUser = UserTestFactory.createUserEntity(createDTO);
        savedUser.setId(1L);
        
        when(userRepository.existsByEmail(createDTO.email())).thenReturn(false);
        when(passwordEncoder.encode(createDTO.password())).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        // Act
        var result = userService.create(createDTO);
        
        // Assert
        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.name()).isEqualTo(createDTO.name());
        assertThat(result.email()).isEqualTo(createDTO.email());
        
        verify(userRepository).existsByEmail(createDTO.email());
        verify(passwordEncoder).encode(createDTO.password());
        verify(userRepository).save(argThat(user -> 
            user.getName().equals(createDTO.name()) &&
            user.getEmail().equals(createDTO.email()) &&
            user.getPassword().equals(encodedPassword)
        ));
    }
    
    @Test
    @DisplayName("Deve lançar exceção para email duplicado")
    void shouldThrowExceptionForDuplicateEmail() {
        // Arrange
        var createDTO = UserTestFactory.createValidUserDTO();
        when(userRepository.existsByEmail(createDTO.email())).thenReturn(true);
        
        // Act & Assert
        assertThatThrownBy(() -> userService.create(createDTO))
            .isInstanceOf(BusinessException.class)
            .hasMessageContaining("Email já está em uso");
        
        verify(userRepository).existsByEmail(createDTO.email());
        verifyNoMoreInteractions(userRepository, passwordEncoder);
    }
    
    @Test
    @DisplayName("Deve buscar usuário por ID")
    void shouldFindUserById() {
        // Arrange
        var userId = 1L;
        var user = UserTestFactory.createUserEntity();
        user.setId(userId);
        
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        
        // Act
        var result = userService.findById(userId);
        
        // Assert
        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(userId);
        assertThat(result.name()).isEqualTo(user.getName());
        
        verify(userRepository).findById(userId);
    }
    
    @Test
    @DisplayName("Deve lançar exceção para usuário não encontrado")
    void shouldThrowExceptionForUserNotFound() {
        // Arrange
        var userId = 999L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThatThrownBy(() -> userService.findById(userId))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("Usuário não encontrado");
        
        verify(userRepository).findById(userId);
    }
}
```

### 2. Testes de Controller (Slice Tests)

**Características:**
- Testam camada web isoladamente
- Mockam services
- Testam serialização/deserialização JSON

```java
@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    @DisplayName("Deve criar usuário com sucesso")
    void shouldCreateUserSuccessfully() throws Exception {
        // Arrange
        var createDTO = UserTestFactory.createValidUserDTO();
        var responseDTO = UserTestFactory.createUserResponseDTO();
        
        when(userService.create(any(UserCreateDTO.class))).thenReturn(responseDTO);
        
        // Act & Assert
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(responseDTO.id()))
                .andExpect(jsonPath("$.name").value(responseDTO.name()))
                .andExpect(jsonPath("$.email").value(responseDTO.email()))
                .andExpect(header().string("Location", "/api/users/" + responseDTO.id()));
        
        verify(userService).create(any(UserCreateDTO.class));
    }
    
    @Test
    @DisplayName("Deve retornar erro 400 para dados inválidos")
    void shouldReturn400ForInvalidData() throws Exception {
        // Arrange - DTO com dados inválidos
        var invalidDTO = new UserCreateDTO("", "email-invalido", "123"); // Nome vazio, email inválido, senha curta
        
        // Act & Assert
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Dados inválidos"))
                .andExpect(jsonPath("$.errors.name").value("Nome é obrigatório"))
                .andExpect(jsonPath("$.errors.email").value("Email deve ser válido"))
                .andExpect(jsonPath("$.errors.password").value("Senha deve ter pelo menos 6 caracteres"));
        
        verifyNoInteractions(userService);
    }
    
    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Deve listar usuários com perfil admin")
    void shouldListUsersWithAdminRole() throws Exception {
        // Arrange
        var users = List.of(
            UserTestFactory.createUserResponseDTO("João", "joao@test.com"),
            UserTestFactory.createUserResponseDTO("Maria", "maria@test.com")
        );
        var page = new PageImpl<>(users);
        
        when(userService.findAll(any(Pageable.class), isNull())).thenReturn(page);
        
        // Act & Assert
        mockMvc.perform(get("/api/users")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].name").value("João"))
                .andExpect(jsonPath("$.content[1].name").value("Maria"));
        
        verify(userService).findAll(any(Pageable.class), isNull());
    }
    
    @Test
    @DisplayName("Deve retornar 403 para usuário sem permissão")
    void shouldReturn403ForUnauthorizedUser() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isUnauthorized());
        
        verifyNoInteractions(userService);
    }
}
```

### 3. Testes de Repository (Data Layer)

**Características:**
- Testam acesso a dados
- Usam banco H2 em memória
- Testam queries customizadas

```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Usar H2 configurado
class UserRepositoryTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    @DisplayName("Deve persistir usuário corretamente")
    void shouldPersistUserCorrectly() {
        // Arrange
        var user = UserTestFactory.createUserEntity();
        
        // Act
        var savedUser = userRepository.save(user);
        
        // Assert
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getName()).isEqualTo(user.getName());
        assertThat(savedUser.getEmail()).isEqualTo(user.getEmail());
        assertThat(savedUser.getCreatedAt()).isNotNull();
        
        // Verificar se foi persistido no banco
        var foundUser = entityManager.find(User.class, savedUser.getId());
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getEmail()).isEqualTo(user.getEmail());
    }
    
    @Test
    @DisplayName("Deve encontrar usuário por email")
    void shouldFindUserByEmail() {
        // Arrange
        var user = UserTestFactory.createUserEntity();
        entityManager.persistAndFlush(user);
        
        // Act
        var foundUser = userRepository.findByEmail(user.getEmail());
        
        // Assert
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getId()).isEqualTo(user.getId());
        assertThat(foundUser.get().getName()).isEqualTo(user.getName());
    }
    
    @Test
    @DisplayName("Deve retornar empty para email inexistente")
    void shouldReturnEmptyForNonExistentEmail() {
        // Act
        var foundUser = userRepository.findByEmail("inexistente@test.com");
        
        // Assert
        assertThat(foundUser).isEmpty();
    }
    
    @Test
    @DisplayName("Deve verificar se email existe")
    void shouldCheckIfEmailExists() {
        // Arrange
        var user = UserTestFactory.createUserEntity();
        entityManager.persistAndFlush(user);
        
        // Act & Assert
        assertThat(userRepository.existsByEmail(user.getEmail())).isTrue();
        assertThat(userRepository.existsByEmail("inexistente@test.com")).isFalse();
    }
    
    @Test
    @DisplayName("Deve buscar usuários ativos em grupos")
    void shouldFindActiveUsersInGroups() {
        // Arrange
        var user1 = UserTestFactory.createUserEntity("joao@test.com");
        var user2 = UserTestFactory.createUserEntity("maria@test.com");
        var group = GroupTestFactory.createGroupEntity();
        
        entityManager.persistAndFlush(user1);
        entityManager.persistAndFlush(user2);
        entityManager.persistAndFlush(group);
        
        var member1 = GroupMemberTestFactory.createMember(group, user1, true);
        var member2 = GroupMemberTestFactory.createMember(group, user2, false); // Inativo
        
        entityManager.persistAndFlush(member1);
        entityManager.persistAndFlush(member2);
        
        // Act
        var activeUsers = userRepository.findActiveUsersByGroupId(group.getId());
        
        // Assert
        assertThat(activeUsers).hasSize(1);
        assertThat(activeUsers.get(0).getEmail()).isEqualTo("joao@test.com");
    }
}
```

### 4. Testes de Integração

**Características:**
- Testam fluxos completos
- Usam contexto Spring completo
- Simulam cenários reais

```java
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthFlowIT {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private UserService userService;
    
    @Test
    @DisplayName("Deve realizar fluxo completo de registro e login")
    void shouldPerformCompleteRegistrationAndLoginFlow() throws Exception {
        // 1. Registrar usuário
        var registerDTO = UserTestFactory.createValidUserDTO();
        
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(registerDTO.name()))
                .andExpect(jsonPath("$.email").value(registerDTO.email()));
        
        // 2. Fazer login
        var loginDTO = new LoginRequestDTO(registerDTO.email(), registerDTO.password());
        
        var loginResult = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.user.email").value(registerDTO.email()))
                .andReturn();
        
        // 3. Extrair token
        var loginResponse = objectMapper.readValue(
            loginResult.getResponse().getContentAsString(),
            TokenResponseDTO.class
        );
        
        // 4. Usar token para acessar endpoint protegido
        mockMvc.perform(get("/api/users/profile")
                .header("Authorization", "Bearer " + loginResponse.token()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(registerDTO.email()));
    }
    
    @Test
    @DisplayName("Deve rejeitar login com credenciais inválidas")
    void shouldRejectLoginWithInvalidCredentials() throws Exception {
        // Arrange
        var invalidLogin = new LoginRequestDTO("inexistente@test.com", "senhaerrada");
        
        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidLogin)))
                .andExpected(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Credenciais inválidas"));
    }
}

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class GroupManagementIT {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @MockBean // ou criar usuário real nos testes
    private UserDetails mockUser;
    
    @Test
    @WithMockUser(username = "test@test.com")
    @DisplayName("Deve realizar fluxo completo de gestão de grupos")
    void shouldPerformCompleteGroupManagementFlow() throws Exception {
        // 1. Criar grupo
        var createGroupDTO = GroupTestFactory.createValidGroupDTO();
        
        var createResult = mockMvc.perform(post("/api/groups")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createGroupDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(createGroupDTO.name()))
                .andReturn();
        
        var groupResponse = objectMapper.readValue(
            createResult.getResponse().getContentAsString(),
            GroupResponseDTO.class
        );
        
        // 2. Listar grupos do usuário
        mockMvc.perform(get("/api/groups"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[?(@.id == " + groupResponse.id() + ")].name").value(createGroupDTO.name()));
        
        // 3. Buscar detalhes do grupo
        mockMvc.perform(get("/api/groups/" + groupResponse.id()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(groupResponse.id()))
                .andExpect(jsonPath("$.name").value(createGroupDTO.name()))
                .andExpect(jsonPath("$.members", hasSize(1))); // Apenas o criador
        
        // 4. Atualizar grupo
        var updateDTO = new GroupUpdateDTO("Grupo Atualizado", "Nova descrição");
        
        mockMvc.perform(put("/api/groups/" + groupResponse.id())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Grupo Atualizado"));
    }
}
```

## Configuração de Testes

### Test Configuration

```java
@TestConfiguration
public class TestConfig {
    
    @Bean
    @Primary
    public PasswordEncoder testPasswordEncoder() {
        // Usar encoder mais rápido para testes
        return new BCryptPasswordEncoder(4); // Menor strength para velocidade
    }
    
    @Bean
    @Primary
    public Clock testClock() {
        return Clock.fixed(Instant.parse("2024-01-15T10:00:00Z"), ZoneOffset.UTC);
    }
}

// Configuração de segurança para testes
@TestConfiguration
@EnableWebSecurity
public class TestSecurityConfig {
    
    @Bean
    @Primary
    public SecurityFilterChain testSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
            .build();
    }
}
```

### Application Properties para Testes

```yaml
# application-test.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: false
    properties:
      hibernate:
        format_sql: false
        dialect: org.hibernate.dialect.H2Dialect
  
  h2:
    console:
      enabled: false

# Configuração de logging para testes
logging:
  level:
    com.finboostplus: DEBUG
    org.springframework.security: DEBUG
    org.hibernate: WARN
    org.springframework.web: WARN

# JWT para testes
jwt:
  secret: test-secret-key-for-testing-only
  expiration: 3600000
```

## Test Data Factories

### Factory Pattern para Dados de Teste

```java
public class UserTestFactory {
    
    private static final Random RANDOM = new Random();
    
    public static UserCreateDTO createValidUserDTO() {
        return createValidUserDTO("João Silva", "joao" + RANDOM.nextInt(10000) + "@test.com");
    }
    
    public static UserCreateDTO createValidUserDTO(String name, String email) {
        return new UserCreateDTO(name, email, "password123");
    }
    
    public static User createUserEntity() {
        return createUserEntity("joao" + RANDOM.nextInt(10000) + "@test.com");
    }
    
    public static User createUserEntity(String email) {
        return User.builder()
            .name("João Silva")
            .email(email)
            .password("$2a$10$encoded.password.hash")
            .colorTheme("light")
            .createdAt(Instant.now())
            .roles(Set.of(createUserRole()))
            .build();
    }
    
    public static User createUserEntity(UserCreateDTO dto) {
        return User.builder()
            .name(dto.name())
            .email(dto.email())
            .password("$2a$10$encoded.password.hash")
            .colorTheme("light")
            .createdAt(Instant.now())
            .roles(Set.of(createUserRole()))
            .build();
    }
    
    public static UserResponseDTO createUserResponseDTO() {
        return createUserResponseDTO("João Silva", "joao@test.com");
    }
    
    public static UserResponseDTO createUserResponseDTO(String name, String email) {
        return new UserResponseDTO(
            1L, 
            name, 
            email, 
            Instant.now(), 
            Set.of("USER")
        );
    }
    
    private static Role createUserRole() {
        return Role.builder()
            .id(1L)
            .name("USER")
            .description("Usuário padrão")
            .build();
    }
}

public class GroupTestFactory {
    
    public static GroupCreateDTO createValidGroupDTO() {
        return new GroupCreateDTO(
            "Grupo de Teste " + System.currentTimeMillis(),
            "Descrição do grupo de teste"
        );
    }
    
    public static Group createGroupEntity() {
        return Group.builder()
            .name("Grupo de Teste")
            .description("Descrição do grupo")
            .groupCreatorId(1L)
            .createdAt(LocalDateTime.now())
            .build();
    }
    
    public static GroupResponseDTO createGroupResponseDTO() {
        return new GroupResponseDTO(
            1L,
            "Grupo de Teste",
            "Descrição do grupo",
            LocalDateTime.now(),
            1L,
            List.of()
        );
    }
}

public class ExpenseTestFactory {
    
    public static ExpenseCreateDTO createValidExpenseDTO() {
        return new ExpenseCreateDTO(
            "Almoço",
            new BigDecimal("50.00"),
            LocalDateTime.now(),
            1L, // categoryId
            List.of(1L, 2L) // userIds para divisão
        );
    }
    
    public static Expense createExpenseEntity() {
        return Expense.builder()
            .description("Almoço")
            .amount(new BigDecimal("50.00"))
            .expenseDate(LocalDateTime.now())
            .createdAt(LocalDateTime.now())
            .build();
    }
}
```

## Utilitários de Teste

### Test Utils

```java
@Component
public class TestUtils {
    
    public static String asJsonString(Object obj) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper.writeValueAsString(obj);
    }
    
    public static <T> T fromJsonString(String json, Class<T> clazz) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper.readValue(json, clazz);
    }
    
    public static void clearDatabase(JdbcTemplate jdbcTemplate) {
        jdbcTemplate.execute("SET REFERENTIAL_INTEGRITY FALSE");
        jdbcTemplate.execute("TRUNCATE TABLE users_roles");
        jdbcTemplate.execute("TRUNCATE TABLE user_expense_divisions");
        jdbcTemplate.execute("TRUNCATE TABLE group_members");
        jdbcTemplate.execute("TRUNCATE TABLE expenses");
        jdbcTemplate.execute("TRUNCATE TABLE tb_group");
        jdbcTemplate.execute("TRUNCATE TABLE users");
        jdbcTemplate.execute("TRUNCATE TABLE categories");
        jdbcTemplate.execute("TRUNCATE TABLE roles");
        jdbcTemplate.execute("SET REFERENTIAL_INTEGRITY TRUE");
    }
}

@Component
public class DatabaseTestUtils {
    
    @Autowired
    private TestEntityManager entityManager;
    
    public <T> T persistAndFlush(T entity) {
        T persisted = entityManager.persistAndFlush(entity);
        entityManager.clear(); // Limpar cache para forçar busca no banco
        return persisted;
    }
    
    public void flush() {
        entityManager.flush();
    }
    
    public void clear() {
        entityManager.clear();
    }
}
```

## Comandos e Execução

### Comandos Maven

```bash
# Executar todos os testes
./mvnw test

# Executar testes com cobertura
./mvnw test jacoco:report

# Executar testes específicos
./mvnw test -Dtest=UserServiceTest
./mvnw test -Dtest=UserServiceTest#shouldCreateUserWithValidData

# Executar apenas testes unitários
./mvnw test -Dtest="**/*Test"

# Executar apenas testes de integração
./mvnw test -Dtest="**/*IT"

# Executar com perfil de teste específico
./mvnw test -Dspring.profiles.active=test

# Pular testes no build
./mvnw package -DskipTests
```

### Relatórios

```bash
# Gerar relatório de cobertura
./mvnw jacoco:report

# Ver relatório no browser
open target/site/jacoco/index.html

# Relatório de testes em XML (para CI/CD)
./mvnw surefire-report:report
```

## Configuração JaCoCo

### Cobertura de Código

```xml
<!-- pom.xml - Plugin JaCoCo já configurado -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.12</version>
    <configuration>
        <excludes>
            <!-- Excluir classes geradas -->
            <exclude>**/*Application.class</exclude>
            <exclude>**/config/**</exclude>
            <exclude>**/dto/**</exclude>
            <exclude>**/entity/**</exclude>
        </excludes>
    </configuration>
    <executions>
        <execution>
            <id>prepare-agent</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
        <execution>
            <id>check</id>
            <phase>verify</phase>
            <goals>
                <goal>check</goal>
            </goals>
            <configuration>
                <rules>
                    <rule>
                        <element>BUNDLE</element>
                        <limits>
                            <limit>
                                <counter>INSTRUCTION</counter>
                                <value>COVEREDRATIO</value>
                                <minimum>0.70</minimum>
                            </limit>
                        </limits>
                    </rule>
                </rules>
            </configuration>
        </execution>
    </executions>
</plugin>
```

## Boas Práticas

### Naming Conventions

```java
// Padrão AAA (Arrange, Act, Assert)
@Test
@DisplayName("Deve criar usuário quando dados válidos fornecidos")
void shouldCreateUser_WhenValidDataProvided() {
    // Arrange - Preparar dados
    var createDTO = UserTestFactory.createValidUserDTO();
    
    // Act - Executar ação
    var result = userService.create(createDTO);
    
    // Assert - Verificar resultado
    assertThat(result).isNotNull();
    assertThat(result.id()).isNotNull();
}

// Testes de exceção
@Test
@DisplayName("Deve lançar BusinessException quando email duplicado")
void shouldThrowBusinessException_WhenEmailAlreadyExists() {
    // Arrange
    var existingEmail = "existing@test.com";
    when(userRepository.existsByEmail(existingEmail)).thenReturn(true);
    
    // Act & Assert
    assertThatThrownBy(() -> userService.create(createDTO))
        .isInstanceOf(BusinessException.class)
        .hasMessageContaining("Email já está em uso");
}
```

### Test Organization

1. **Um assert principal por teste**
2. **Usar @DisplayName descritivo**
3. **Agrupar testes relacionados com @Nested**
4. **Limpar estado entre testes**
5. **Usar factories para dados de teste**

```java
@Nested
@DisplayName("Criação de Usuário")
class UserCreationTests {
    
    @Test
    @DisplayName("Deve criar usuário com dados válidos")
    void shouldCreateWithValidData() { /* ... */ }
    
    @Test 
    @DisplayName("Deve falhar com email duplicado")
    void shouldFailWithDuplicateEmail() { /* ... */ }
    
    @Test
    @DisplayName("Deve falhar com dados inválidos")
    void shouldFailWithInvalidData() { /* ... */ }
}
```

### Performance dos Testes

1. **Usar @MockitoExtension para testes unitários**
2. **@DataJpaTest apenas para repositories**
3. **@WebMvcTest apenas para controllers**
4. **@SpringBootTest apenas quando necessário**
5. **Reutilizar contexto Spring quando possível**

---

Esta estratégia de testes garante confiabilidade, manutenibilidade e cobertura adequada para o backend do FinBoost+, seguindo as melhores práticas da comunidade Spring Boot e Java.
