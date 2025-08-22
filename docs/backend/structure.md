# Estrutura e Padrões - Backend FinBoost+

## Visão Geral da Arquitetura

O backend do FinBoost+ é construído com **Spring Boot 3.5+** e **Java 21**, seguindo uma arquitetura limpa em camadas baseada nos padrões **Domain Driven Design (DDD)** e **Clean Architecture**. A API REST fornece endpoints seguros para gestão financeira colaborativa.

!!! info "Princípios Arquiteturais"
- **Separation of Concerns**: Cada camada tem responsabilidade específica
- **Domain-First**: Domínio no centro, independente de frameworks
- **RESTful Design**: APIs seguem princípios REST
- **Security by Design**: Autenticação JWT e autorização por roles
- **Database-Agnostic**: JPA permite trocar banco facilmente
- **Test-Driven**: Cobertura > 70% com testes automatizados

## Stack Tecnológica

### Core Framework
- **Java 21**: Records, Pattern Matching, Virtual Threads
- **Spring Boot 3.5**: Framework principal com auto-configuração
- **Spring Data JPA**: Abstração de persistência sobre Hibernate
- **Spring Security**: Autenticação JWT e controle de acesso
- **Spring Web MVC**: Controllers REST com Jackson

### Banco de Dados & Segurança
- **PostgreSQL 15+**: Banco relacional principal
- **H2**: Banco em memória para testes
- **OAuth2 + JWT**: Servidor de autorização próprio
- **BCrypt**: Hash de senhas

### Documentação & Qualidade
- **SpringDoc OpenAPI 3**: Documentação automática
- **Swagger UI / Scalar**: Interface interativa para testes
- **JUnit 5 + Mockito**: Testes unitários e integração
- **JaCoCo**: Cobertura de código

## Estrutura de Pastas

```
src/main/java/com/finboostplus/
├── FinboostplusApplication.java    # Classe principal
├── 
├── config/                         # Configurações do Spring
│   ├── SecurityConfig.java         # Configuração de segurança
│   ├── CorsConfig.java             # Configuração CORS
│   ├── OpenApiConfig.java          # Configuração Swagger/OpenAPI
│   └── DatabaseConfig.java         # Configuração JPA/DataSource
│
├── controller/                     # Camada de Apresentação (REST)
│   ├── UserController.java         # Endpoints de usuários
│   ├── GroupController.java        # Endpoints de grupos
│   ├── ExpenseController.java      # Endpoints de despesas
│   └── AuthController.java         # Autenticação e registro
│
├── service/                        # Camada de Negócio
│   ├── UserService.java            # Lógica de usuários
│   ├── GroupService.java           # Lógica de grupos
│   ├── ExpenseService.java         # Lógica de despesas
│   └── impl/                       # Implementações dos serviços
│
├── repository/                     # Camada de Dados (JPA)
│   ├── UserRepository.java         # Acesso a dados de usuários
│   ├── GroupRepository.java        # Acesso a dados de grupos
│   └── ExpenseRepository.java      # Acesso a dados de despesas
│
├── model/                          # Entidades do Domínio
│   ├── User.java                   # Entidade Usuário
│   ├── Group.java                  # Entidade Grupo
│   ├── Expense.java                # Entidade Despesa
│   ├── Category.java               # Entidade Categoria
│   └── GroupMember.java            # Relacionamento Grupo-Usuário
│
├── dto/                           # Data Transfer Objects
│   ├── request/                   # DTOs de entrada
│   └── response/                  # DTOs de saída
│
├── exception/                     # Tratamento de Exceções
│   ├── GlobalExceptionHandler.java # Handler global
│   └── BusinessException.java     # Exceções de negócio
│
└── util/                         # Utilitários
    ├── Constants.java            # Constantes da aplicação
    └── SecurityUtils.java       # Utilidades de segurança
```

## Padrões de Desenvolvimento

### Arquitetura em Camadas

=== "Controller"
    ```java
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
    ```

=== "Service"
    ```java
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
    ```

=== "Repository"
    ```java
    @Repository
    public interface UserRepository extends JpaRepository<User, Long> {
    
            Optional<User> findByEmail(String email);
            
            boolean existsByEmail(String email);
        }
    ```

### DTOs com Records

```java
// Request DTO
public record UserCreateDTO(
    @NotBlank @Size(min = 2, max = 100) String name,
    @NotBlank @Email String email,
    @NotBlank @Size(min = 6) String password
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

### Entidades JPA

```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
               joinColumns = @JoinColumn(name = "user_id"),
               inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();
    
    // UserDetails implementation methods...
}
```

## Configurações Principais

### Spring Security

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/docs/**", "/swagger-ui/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtDecoder(jwtDecoder())))
            .build();
    }
}
```

### Tratamento Global de Erros

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        var error = ErrorResponse.builder()
            .message(e.getMessage())
            .code("BUSINESS_ERROR")
            .timestamp(Instant.now())
            .build();
        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(
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
}
```

## API REST - Convenções

### Endpoints Padrão

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/users` | Listar usuários | 200 |
| GET | `/api/users/{id}` | Buscar por ID | 200, 404 |
| POST | `/api/users` | Criar usuário | 201, 400 |
| PUT | `/api/users/{id}` | Atualizar completo | 200, 404 |
| PATCH | `/api/users/{id}` | Atualização parcial | 200, 404 |
| DELETE | `/api/users/{id}` | Excluir usuário | 204, 404 |

### Códigos de Status HTTP

!!! tip "Status Codes Principais"
- **200 OK** - Operação bem-sucedida
- **201 Created** - Recurso criado
- **204 No Content** - Operação sem retorno
- **400 Bad Request** - Dados inválidos
- **401 Unauthorized** - Não autenticado
- **403 Forbidden** - Não autorizado
- **404 Not Found** - Recurso não encontrado
- **409 Conflict** - Conflito (email duplicado)

### Paginação

```java
@GetMapping
public ResponseEntity<Page<UserResponseDTO>> findAll(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "name") String sort,
    @RequestParam(required = false) String search) {
    
    var pageable = PageRequest.of(page, size, 
        Sort.by(Sort.Direction.ASC, sort));
    
    var users = userService.findAll(pageable, search);
    return ResponseEntity.ok(users);
}
```

## Performance & Otimizações

### Queries Otimizadas

```java
@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    
    // Query com JOIN FETCH para evitar N+1
    @Query("SELECT g FROM Group g JOIN FETCH g.members m WHERE m.user.id = :userId")
    List<Group> findByUserIdWithMembers(Long userId);
    
    // Query nativa para agregações complexas
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

## Configurações de Ambiente

### Application Properties

=== "Development"
    ```yaml
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
    
        logging:
          level:
            com.finboostplus: DEBUG
    ```

=== "Production"
    ```yaml
    # application-prod.yml
    spring:
    datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
    jpa:
    hibernate:
    ddl-auto: validate
    show-sql: false
    
        logging:
          level:
            com.finboostplus: INFO
    ```

=== "Test"
    ```yaml
    # application-test.yml
    spring:
      datasource:
        url: jdbc:h2:mem:testdb
        driver-class-name: org.h2.Driver
      jpa:
        hibernate:
          ddl-auto: create-drop
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
                .description("API REST para gestão financeira colaborativa"))
            .addSecurityItem(new SecurityRequirement()
                .addList("Bearer Authentication"))
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
        @AuthenticationPrincipal UserDetails currentUser) {
        
        var group = groupService.create(request, currentUser.getUsername());
        return ResponseEntity.status(201).body(group);
    }
}
```

## Deploy com Docker

### Dockerfile

```dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/finboostplus-server-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DATABASE_URL=jdbc:postgresql://db:5432/finboost
      - DATABASE_USERNAME=finboost
      - DATABASE_PASSWORD=prod123
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=finboost
      - POSTGRES_USER=finboost
      - POSTGRES_PASSWORD=prod123
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

!!! success "Resumo"
Esta estrutura garante **escalabilidade**, **manutenibilidade** e **performance** para o backend do FinBoost+, seguindo as melhores práticas de desenvolvimento Spring Boot e arquitetura em camadas.