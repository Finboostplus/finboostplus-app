package com.finboostplus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finboostplus.DTO.CategoryRegisterDTO;
import com.finboostplus.DTO.ChangePasswordDTO;
import com.finboostplus.DTO.UserCreateDTO;
import com.finboostplus.DTO.UserDataDTO;
import com.finboostplus.DTO.UserExpensesDTO;
import com.finboostplus.DTO.UserMonthlyExpensesDTO;
import com.finboostplus.DTO.UserUpdateDTO;
import com.finboostplus.config.TokenRevocationUtil;
import com.finboostplus.service.ExpenseService;
import com.finboostplus.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@Tag(name = "Usuários", description = "Operações relacionadas ao gerenciamento de usuários e perfis no sistema FinBoost Plus")
public class UserController {
	@Autowired
	UserService userService;

	@Autowired
	ExpenseService expenseService;

	@Autowired
	OAuth2AuthorizationService authorizationService;

	@PostMapping
	@Operation(summary = "Criar novo usuário", description = """
			Cria um novo perfil de usuário no sistema FinBoost Plus.

			Este endpoint permite o cadastro de novos usuários fornecendo informações básicas
			como nome, email, senha e tema de cor preferido.

			**Regras de validação:**
			- Email deve ser único no sistema
			- Senha deve ter pelo menos 8 caracteres
			- Nome é obrigatório e deve ter entre 2-100 caracteres
			""")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Usuário criado com sucesso", content = @Content(mediaType = "text/plain", schema = @Schema(type = "string"), examples = @ExampleObject(value = "Cadastro feito com sucesso!"))),
			@ApiResponse(responseCode = "400", description = "Dados inválidos ou email já existe", content = @Content(mediaType = "text/plain", schema = @Schema(type = "string"), examples = @ExampleObject(value = "Erro de validação"))),
			@ApiResponse(responseCode = "422", description = "Erro de validação dos campos obrigatórios")
	})
	public ResponseEntity<String> saveProfile(
			@Parameter(description = "Dados do usuário para cadastro", required = true, content = @Content(schema = @Schema(implementation = UserCreateDTO.class), examples = @ExampleObject(name = "Exemplo de usuário", value = """
					{
						"name": "João Silva",
						"email": "joao.silva@email.com",
						"password": "minhasenha123",
						"themeColor": "blue"
					}
					"""))) @Valid @RequestBody UserCreateDTO dto) {
		boolean userIsSaved = userService.saveUser(dto);
		if (userIsSaved) {
			return new ResponseEntity<>("Cadastro feito com sucesso!", HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/me")
	public ResponseEntity<UserDataDTO> getUserData() {
		UserDataDTO user = userService.getUserData();
		return ResponseEntity.ok(user);
	}

	@GetMapping("/me/expenses")
	public ResponseEntity<Page<UserExpensesDTO>> getAllUserExpenses(
			@RequestParam(name = "page", defaultValue = "0") Integer page,
			@RequestParam(name = "size", defaultValue = "4") Integer size,
			@RequestParam(name = "order", defaultValue = "DESC") String order) {
		Pageable pageable = PageRequest.of(page, size, "ASC".equalsIgnoreCase(order)
        ? Sort.by("created_at").ascending()
        : Sort.by("created_at").descending());
		Page<UserExpensesDTO> expenses = userService.getAllUserExpenses(pageable);
		return ResponseEntity.ok(expenses);
	}

	@GetMapping("/me/monthly-expenses")
	public ResponseEntity<List<UserMonthlyExpensesDTO>> getUserMonthlyExpenses() {
		List<UserMonthlyExpensesDTO> expenses = userService.getUserMonthlyExpenses();
		return ResponseEntity.ok(expenses);
	}

	@GetMapping("/me/classify-spending-by-category")
	public ResponseEntity<List<CategoryRegisterDTO>> getCategoryRegister() {
		List<CategoryRegisterDTO> category = expenseService.getCategoryRegister();
		return ResponseEntity.ok(category);
	}

	@PreAuthorize("hasRole('USER')")
	@PutMapping
	@Operation(summary = "Atualizar perfil do usuário", description = """
			Atualiza as informações do perfil do usuário autenticado no sistema FinBoost Plus.

			Este endpoint permite que um usuário autenticado atualize suas informações pessoais,
			incluindo nome, email, senha e tema de cor preferido.

			**Importante:** Após a atualização bem-sucedida, todos os tokens JWT do usuário
			serão revogados por segurança, sendo necessário fazer login novamente.

			**Regras de validação:**
			- Email deve ser único no sistema (se alterado)
			- Nova senha deve ter pelo menos 8 caracteres (se fornecida)
			- Nome deve ter entre 2-100 caracteres (se fornecido)
			- Apenas campos fornecidos serão atualizados
			""", security = @SecurityRequirement(name = "bearerAuth"))
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Perfil atualizado com sucesso. Tokens JWT foram revogados.", content = @Content(mediaType = "application/json", schema = @Schema(type = "string"), examples = @ExampleObject(name = "Sucesso", description = "Perfil atualizado com sucesso", value = "\"Perfil atualizado com sucesso. Faça login novamente.\""))),
			@ApiResponse(responseCode = "400", description = "Erro na atualização - dados inválidos ou email já existe", content = @Content(mediaType = "application/json", schema = @Schema(type = "string"), examples = @ExampleObject(name = "Erro de validação", description = "Dados inválidos fornecidos", value = "\"Erro na validação dos dados fornecidos\""))),
			@ApiResponse(responseCode = "401", description = "Token JWT inválido ou expirado", content = @Content(mediaType = "application/json", schema = @Schema(type = "string"), examples = @ExampleObject(name = "Token inválido", description = "Usuário não autenticado", value = "\"Token JWT inválido ou expirado\""))),
			@ApiResponse(responseCode = "403", description = "Acesso negado - Role USER necessária", content = @Content(mediaType = "application/json", schema = @Schema(type = "string"), examples = @ExampleObject(name = "Acesso negado", description = "Usuário sem permissão adequada", value = "\"Acesso negado. Role USER necessária.\""))),
			@ApiResponse(responseCode = "422", description = "Erro de validação dos campos obrigatórios", content = @Content(mediaType = "application/json", schema = @Schema(type = "string"), examples = @ExampleObject(name = "Validação", description = "Campos obrigatórios não fornecidos ou inválidos", value = "\"Erro de validação: campos obrigatórios ausentes ou inválidos\"")))
	})
	public ResponseEntity<String> updateProfile(
			@Parameter(description = "Dados do usuário para atualização. Apenas campos fornecidos serão atualizados.", required = true, content = @Content(schema = @Schema(implementation = UserUpdateDTO.class), examples = {
					@ExampleObject(name = "Atualização completa", description = "Exemplo de atualização de todos os campos", value = """
							{
								"name": "João Silva Santos",
								"email": "joao.santos@novoemail.com",
								"password": "novasenha123",
								"themeColor": "green"
							}
							"""),
					@ExampleObject(name = "Atualização parcial - apenas nome", description = "Exemplo atualizando apenas o nome", value = """
							{
								"name": "João Silva Santos"
							}
							"""),
					@ExampleObject(name = "Atualização de senha", description = "Exemplo atualizando apenas a senha", value = """
							{
								"password": "minhaNovasenha456"
							}
							"""),
					@ExampleObject(name = "Atualização de tema", description = "Exemplo atualizando apenas o tema de cor", value = """
							{
								"themeColor": "purple"
							}
							""")
			})) @Valid @RequestBody UserUpdateDTO dto) {
		boolean userIsSaved = userService.updateUser(dto);
		if (userIsSaved) {
			TokenRevocationUtil.revokeCurrentUserTokens(authorizationService);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PreAuthorize("hasRole('USER')")
	@DeleteMapping
	public ResponseEntity<Void> deleteProfile() {
		userService.deleteCurrentUserProfile();
		TokenRevocationUtil.revokeCurrentUserTokens(authorizationService);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<Void> forgotPassword(@RequestBody String userName) {
        userService.forgotPassword(userName);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasRole('USER')")
	@PatchMapping("change-password")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO passwordChange) {
		userService.changePassword(passwordChange);
		return ResponseEntity.ok("Senha alterada com sucesso!");
	}

	@GetMapping(value = "/userValidate/{uuid}")
	public String validateUser(@PathVariable("uuid") String uuid) {
		return userService.validateUser(uuid);
	}
}
