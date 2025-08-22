# Estrutura e Padrões - Backend FinBoost+

## Visão Geral da Arquitetura

O backend do FinBoost+ é construído com **Spring Boot 3.5+** e **Java 21**, seguindo uma arquitetura limpa em camadas baseada nos padrões **Domain Driven Design (DDD)** e **Clean Architecture**. A API REST fornece endpoints seguros para gestão financeira colaborativa.

### Princípios Arquiteturais

- **Separation of Concerns**: Cada camada tem responsabilidade específica
- **Domain-First**: Domínio no centro, independente de frameworks
- **RESTful Design**: APIs seguem princípios REST
- **Security by Design**: Autenticação JWT e autorização por roles
- **Database-Agnostic**: JPA permite trocar banco facilmente
- **Test-Driven**: Cobertura > 70% com testes automatizados

## Stack Tecnológica

### Core Framework
- **Java 21**: Linguagem com recursos modernos (Records, Pattern Matching, Virtual Threads)
- **Spring Boot 3.5**: Framework principal com auto-configuração
- **Spring Data JPA**: Abstração de persistência sobre Hibernate
- **Spring Security**: Autenticação JWT e controle de acesso
- **Spring Web MVC**: Controllers REST com Jackson para JSON

### Banco de Dados
- **PostgreSQL 15+**: Banco relacional principal
- **H2**: Banco em memória para testes e desenvolvimento
- **JPA/Hibernate**: ORM com suporte a migrations
- **Flyway/Liquibase**: Versionamento de schema (futuro)

### Segurança e Autenticação
- **Spring Security OAuth2**: Resource Server para JWT
- **OAuth2 Authorization Server**: Servidor de autorização próprio
- **BCrypt**: Hash de senhas
- **CORS**: Configuração para frontend

### Documentação e APIs
- **SpringDoc OpenAPI 3**: Documentação automática da API
- **Swagger UI**: Interface interativa para testes
- **Scalar**: UI moderna alternativa ao Swagger

### Qualidade e Testes
- **JUnit 5**: Framework de testes unitários
- **Mockito**: Mocks para isolamento de testes
- **Spring Boot Test**: Testes de integração
- **JaCoCo**: Cobertura de código
- **Checkstyle**: Análise estática de código

### Build e Deploy
- **Maven 3.8+**: Gerenciamento de dependências
- **Spring Boot DevTools**: Hot reload em desenvolvimento
- **Docker**: Containerização da aplicação
- **Docker Compose**: Orquestração local

## Estrutura de Pastas

```
src/main/java/com/finboostplus/
├── FinboostplusApplication.java    # Classe principal Spring Boot
├── 
├── config/                         # Configurações do Spring
│   ├── SecurityConfig.java         # Configuração de segurança
│   ├── CorsConfig.java             # Configuração CORS
│   ├── OpenApiConfig.java          # Configuração Swagger/OpenAPI
│   └── DatabaseConfig.java         # Configuração JPA/DataSource
│
├── controller/                     # Camada de Apresentação (REST)
│   ├── ApiDocsController.java      # Documentação da API
│   ├── UserController.java         # Endpoints de usuários
│   ├── GroupController.java        # Endpoints de grupos
│   ├── ExpenseController.java      # Endpoints de despesas
│   └── AuthController.java         # Autenticação e registro
│
├── service/                        # Camada de Negócio
│   ├── UserService.java            # Lógica de usuários
│   ├── GroupService.java           # Lógica de grupos
│   ├── ExpenseService.java         # Lógica de despesas
│   ├── AuthService.java            # Autenticação
│   └── impl/                       # Implementações dos serviços
│
├── repository/                     # Camada de Dados (JPA)
│   ├── UserRepository.java         # Acesso a dados de usuários
│   ├── GroupRepository.java        # Acesso a dados de grupos
│   ├── ExpenseRepository.java      # Acesso a dados de despesas
│   └── CategoryRepository.java     # Acesso a dados de categorias
│
├── model/                          # Entidades do Domínio
│   ├── User.java                   # Entidade Usuário
│   ├── Group.java                  # Entidade Grupo
│   ├── Expense.java                # Entidade Despesa
│   ├── Category.java               # Entidade Categoria
│   ├── GroupMember.java            # Relacionamento Grupo-Usuário
│   ├── UserExpenseDivision.java    # Divisão de despesas
│   └── Role.java                   # Roles de autorização
│
├── DTO/                           # Data Transfer Objects
│   ├── request/                   # DTOs de entrada
│   │   ├── UserCreateDTO.java     # Criação de usuário
│   │   ├── LoginRequestDTO.java   # Dados de login
│   │   └── ExpenseCreateDTO.java  # Criação de despesa
│   └── response/                  # DTOs de saída
│       ├── UserResponseDTO.java   # Resposta de usuário
│       ├── TokenResponseDTO.java  # Token JWT
│       └── GroupSummaryDTO.java   # Resumo de grupo
│
├── projection/                    # Projeções JPA
│   ├── UserProjection.java       # Projeção de dados de usuário
│   ├── GroupSummaryProjection.java # Resumo de grupos
│   └── ExpenseSummaryProjection.java # Resumo de despesas
│
├── exception/                     # Tratamento de Exceções
│   ├── GlobalExceptionHandler.java # Handler global
│   ├── BusinessException.java     # Exceções de negócio
│   ├── ResourceNotFoundException.java
│   └── ValidationException.java  # Validações customizadas
│
└── util/                         # Utilitários
    ├── Constants.java            # Constantes da aplicação
    ├── DateUtils.java           # Utilidades de data
    └── SecurityUtils.java       # Utilidades de segurança
```

### Estrutura de Recursos

```
src/main/resources/
├── application.yml              # Configurações principais
├── application-dev.yml          # Perfil de desenvolvimento
├── application-prod.yml         # Perfil de produção
├── application-test.yml         # Perfil de testes
├── 
├── db/migration/               # Scripts Flyway (futuro)
│   ├── V1__create_users.sql
│   ├── V2__create_groups.sql
│   └── V3__create_expenses.sql
├── 
├── static/                     # Recursos estáticos
│   └── api-docs/              # Documentação adicional
└── templates/                  # Templates (se necessário)
```

### Estrutura de Testes

```
src/test/java/com/finboostplus/
├── config/                    # Configurações de teste
│   └── TestConfig.java       # Beans para testes
├── 
├── controller/               # Testes de Controller (@WebMvcTest)
│   ├── UserControllerTest.java
│   ├── GroupControllerTest.java
│   └── AuthControllerTest.java
├── 
├── service/                  # Testes Unitários (@ExtendWith(MockitoExtension))
│   ├── UserServiceTest.java
│   ├── GroupServiceTest.java
│   └── ExpenseServiceTest.java
├── 
├── repository/               # Testes de Repository (@DataJpaTest)
│   ├── UserRepositoryTest.java
│   ├── GroupRepositoryTest.java
│   └── ExpenseRepositoryTest.java
├── 
├── integration/              # Testes de Integração (@SpringBootTest)
│   ├── AuthIntegrationTest.java
│   ├── GroupFlowIntegrationTest.java
│   └── ExpenseFlowIntegrationTest.java
├── 
└── util/                     # Utilitários de teste
    ├── TestDataFactory.java  # Factory de dados de teste
    └── MockUtils.java        # Utilitários para mocks
```

## Padrões de Desenvolvimento

### Arquitetura em Camadas

```java
// Controller Layer - REST Endpoints
@RestController
@RequestMapping("/api/users")
@Tag(name = "Usuários", description = "Gestão de usuários")
public class UserController {
    
    private final UserService userService;
    
    @PostMapping
    @Operation(summary = "Criar usuário")
    public ResponseEntity<UserResponseDTO> create(
        @Valid @RequestBody UserCreateDTO request) {
        
        var user = userService.create(request);
        return ResponseEntity.status(201).body(user);
    }
}

// Service Layer - Business Logic
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserResponseDTO create(UserCreateDTO dto) {
        validateEmailNotExists(dto.getEmail());
        
        var user = User.builder()
            .name(dto.getName())
            .email(dto.getEmail())
            .password(passwordEncoder.encode(dto.getPassword()))
            .build();
            
        var saved = userRepository.save(user);
        return UserResponseDTO.from(saved);
    }
}

// Repository Layer - Data Access
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(String email);
    
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email")
    boolean existsByEmail(String email);
}
```

### Padrão DTO e Mappers

```java
// Request DTO
public record UserCreateDTO(
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    String name,
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    String email,
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    String password
) {}

// Response DTO
public record UserResponseDTO(
    Long id,
    String name,
    String email,
    Instant createdAt,
    Set<String> roles
) {
    public static UserResponseDTO from(User user) {
        return new UserResponseDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getCreatedAt(),
            user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet())
        );
    }
}
```

### Entidades JPA com Lombok

```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(name = "seq_user", sequenceName = "seq_user", 
                   allocationSize = 1, initialValue = 1)
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_name", nullable = false)
    private String name;
    
    @Column(name = "e_mail", nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
    
    @Column(name = "color_theme", nullable = false)
    @Builder.Default
    private String colorTheme = "light";
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
               joinColumns = @JoinColumn(name = "user_id"),
               inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();
    
    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
            .collect(Collectors.toSet());
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public boolean isAccountNonExpired() { return true; }
    
    @Override
    public boolean isAccountNonLocked() { return true; }
    
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    
    @Override
    public boolean isEnabled() { return true; }
}
```

## Configurações e Segurança

### Security Configuration

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/docs/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtDecoder(jwtDecoder())));
                
        return http.build();
    }
    
    @Bean
    public JwtDecoder jwtDecoder() {
        return JwtDecoders.fromIssuerLocation("http://localhost:8080");
    }
}
```

### Database Configuration

```java
@Configuration
@EnableJpaRepositories(basePackages = "com.finboostplus.repository")
@EnableJpaAuditing
public class DatabaseConfig {
    
    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        var factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource());
        factory.setPackagesToScan("com.finboostplus.model");
        factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        
        var props = new Properties();
        props.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        props.setProperty("hibernate.hbm2ddl.auto", "validate");
        props.setProperty("hibernate.show_sql", "true");
        props.setProperty("hibernate.format_sql", "true");
        factory.setJpaProperties(props);
        
        return factory;
    }
}
```

## Tratamento de Erros

### Global Exception Handler

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(
        BusinessException e) {
        
        log.warn("Business exception: {}", e.getMessage());
        
        var error = ErrorResponse.builder()
            .message(e.getMessage())
            .code("BUSINESS_ERROR")
            .timestamp(Instant.now())
            .build();
            
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationException(
        MethodArgumentNotValidException e) {
        
        var errors = e.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                FieldError::getDefaultMessage));
                
        var response = ValidationErrorResponse.builder()
            .message("Dados inválidos")
            .errors(errors)
            .timestamp(Instant.now())
            .build();
            
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
        DataIntegrityViolationException e) {
        
        log.error("Data integrity violation", e);
        
        String message = "Erro de integridade dos dados";
        if (e.getMessage().contains("email")) {
            message = "Email já está em uso";
        }
        
        var error = ErrorResponse.builder()
            .message(message)
            .code("DATA_INTEGRITY_ERROR")
            .timestamp(Instant.now())
            .build();
            
        return ResponseEntity.status(409).body(error);
    }
}
```

## Padrões de API REST

### Convenções de URL

- **GET /api/users** - Listar usuários
- **GET /api/users/{id}** - Buscar usuário por ID
- **POST /api/users** - Criar usuário
- **PUT /api/users/{id}** - Atualizar usuário completo
- **PATCH /api/users/{id}** - Atualização parcial
- **DELETE /api/users/{id}** - Excluir usuário

### Códigos de Status HTTP

- **200 OK** - Operação bem-sucedida
- **201 Created** - Recurso criado com sucesso
- **204 No Content** - Operação bem-sucedida sem retorno
- **400 Bad Request** - Dados inválidos
- **401 Unauthorized** - Não autenticado
- **403 Forbidden** - Não autorizado
- **404 Not Found** - Recurso não encontrado
- **409 Conflict** - Conflito (email duplicado)
- **500 Internal Server Error** - Erro interno

### Paginação e Filtros

```java
@GetMapping
public ResponseEntity<Page<UserResponseDTO>> findAll(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "name") String sort,
    @RequestParam(defaultValue = "asc") String direction,
    @RequestParam(required = false) String search) {
    
    var pageable = PageRequest.of(page, size, 
        Sort.by(Sort.Direction.fromString(direction), sort));
    
    var users = userService.findAll(pageable, search);
    return ResponseEntity.ok(users);
}
```

## Performance e Otimizações

### Queries Otimizadas

```java
@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    
    @Query("SELECT g FROM Group g JOIN FETCH g.members m WHERE m.user.id = :userId")
    List<Group> findByUserIdWithMembers(Long userId);
    
    @Query(value = """
        SELECT g.id, g.name, COUNT(gm.user_id) as member_count,
               COALESCE(SUM(e.amount), 0) as total_expenses
        FROM groups g
        LEFT JOIN group_members gm ON g.id = gm.group_id
        LEFT JOIN expenses e ON g.id = e.group_id
        WHERE gm.user_id = :userId
        GROUP BY g.id, g.name
        """, nativeQuery = true)
    List<GroupSummaryProjection> findGroupSummaryByUserId(Long userId);
}
```

### Cache Configuration

```java
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "groups", "categories");
    }
}

// Uso em Service
@Cacheable(value = "users", key = "#id")
public UserResponseDTO findById(Long id) {
    return userRepository.findById(id)
        .map(UserResponseDTO::from)
        .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
}
```

## Documentação da API

### OpenAPI Configuration

```java
@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("FinBoost+ API")
                .version("1.0")
                .description("API REST para gestão financeira colaborativa")
                .contact(new Contact()
                    .name("FinBoost+ Team")
                    .email("finboostplus@gmail.com")
                    .url("https://github.com/Finboostplus/finboostplus-app")))
            .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
            .components(new Components()
                .addSecuritySchemes("Bearer Authentication", 
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

### Controller Documentation

```java
@Tag(name = "Grupos", description = "Gestão de grupos financeiros")
@RestController
@RequestMapping("/api/groups")
public class GroupController {
    
    @Operation(
        summary = "Criar grupo",
        description = "Cria um novo grupo financeiro e adiciona o usuário como administrador"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Grupo criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "401", description = "Usuário não autenticado")
    })
    @PostMapping
    public ResponseEntity<GroupResponseDTO> create(
        @Valid @RequestBody GroupCreateDTO request,
        @Parameter(hidden = true) @AuthenticationPrincipal UserDetails currentUser) {
        
        var group = groupService.create(request, currentUser.getUsername());
        return ResponseEntity.status(201).body(group);
    }
}
```

## Deployment e Ambiente

### Profiles

```yaml
# application.yml
spring:
  profiles:
    active: dev
  application:
    name: finboostplus-server

# application-dev.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/finboost_dev
    username: finboost
    password: dev123
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true

# application-prod.yml
spring:
  datasource:
    url: ${DATABASE_URL:jdbc:postgresql://localhost:5432/finboost}
    username: ${DATABASE_USERNAME:finboost}
    password: ${DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/finboostplus-server-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

Esta estrutura garante escalabilidade, manutenibilidade e performance para o backend do FinBoost+, seguindo as melhores práticas de desenvolvimento Spring Boot e arquitetura de microsserviços.
