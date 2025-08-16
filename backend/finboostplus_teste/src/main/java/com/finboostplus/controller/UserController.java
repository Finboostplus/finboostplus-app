package com.finboostplus.controller;

import com.finboostplus.DTO.UserCreateDTO;
import com.finboostplus.DTO.UserUpdateDTO;
import com.finboostplus.config.TokenRevocationUtil;
import com.finboostplus.config.AuthorizationServerConfig;
import com.finboostplus.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.ExampleObject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/user")
@Tag(name = "Usuários", description = "Operações relacionadas ao gerenciamento de usuários e perfis no sistema FinBoost Plus")
public class UserController {

	@Autowired
	UserService service;

	@Autowired
	OAuth2AuthorizationService authorizationService;

	@PostMapping
	@Operation(
		summary = "Criar novo usuário",
		description = """
			Cria um novo perfil de usuário no sistema FinBoost Plus.
			
			Este endpoint permite o cadastro de novos usuários fornecendo informações básicas 
			como nome, email, senha e tema de cor preferido.
			
			**Regras de validação:**
			- Email deve ser único no sistema
			- Senha deve ter pelo menos 8 caracteres
			- Nome é obrigatório e deve ter entre 2-100 caracteres
			"""
	)
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "201",
			description = "Usuário criado com sucesso",
			content = @Content(
				mediaType = "text/plain",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(value = "Cadastro feito com sucesso!")
			)
		),
		@ApiResponse(
			responseCode = "400",
			description = "Dados inválidos ou email já existe",
			content = @Content(
				mediaType = "text/plain",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(value = "Erro de validação")
			)
		),
		@ApiResponse(
			responseCode = "422",
			description = "Erro de validação dos campos obrigatórios"
		)
	})
	public ResponseEntity<String> saveProfile(
		@Parameter(
			description = "Dados do usuário para cadastro",
			required = true,
			content = @Content(
				schema = @Schema(implementation = UserCreateDTO.class),
				examples = @ExampleObject(
					name = "Exemplo de usuário",
					value = """
						{
							"name": "João Silva",
							"email": "joao.silva@email.com",
							"password": "minhasenha123",
							"colorTheme": "blue"
						}
						"""
				)
			)
		)
		@Valid @RequestBody UserCreateDTO dto
	){
		boolean userIsSaved = service.saveUser(dto);
		if(userIsSaved){
			return new ResponseEntity<>("Cadastro feito com sucesso!", HttpStatus.CREATED);
		}return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/whoareyou")
	@Operation(
		summary = "Verificar usuário logado",
		description = """
			Retorna informações do usuário atualmente autenticado no sistema.
			
			Este endpoint é protegido e requer autenticação JWT válida.
			Útil para verificar se o token está válido e obter dados do usuário logado.
			""",
		security = @SecurityRequirement(name = "bearerAuth")
	)
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "Informações do usuário logado",
			content = @Content(
				mediaType = "text/plain",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(value = "O usuário logado possui o e-mail: joao.silva@email.com")
			)
		),
		@ApiResponse(
			responseCode = "401",
			description = "Token JWT inválido ou expirado"
		),
		@ApiResponse(
			responseCode = "403",
			description = "Acesso negado - Role USER necessária"
		)
	})
	public String getReturnAuthorized(){
		return authenticated();
	}


	@PreAuthorize("hasRole('OWNER')")
	@GetMapping("/no")
	@Operation(
		summary = "Endpoint restrito (Demo)",
		description = """
			Endpoint de demonstração que requer role OWNER.
			
			Este endpoint serve como exemplo de controle de acesso granular,
			onde apenas usuários com role 'OWNER' podem acessar.
			""",
		security = @SecurityRequirement(name = "bearerAuth")
	)
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "Acesso autorizado para OWNER",
			content = @Content(
				mediaType = "text/plain",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(value = "Acesso autorizado!")
			)
		),
		@ApiResponse(
			responseCode = "401",
			description = "Token JWT inválido ou expirado"
		),
		@ApiResponse(
			responseCode = "403",
			description = "Acesso negado - Role OWNER necessária"
		)
	})
	public String getReturnNotAuthorized(){
		return "Aqui não está autorizado!";
	}


	private String authenticated(){
		try{
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Jwt jwtPrincipal = (Jwt) authentication.getPrincipal();
			return jwtPrincipal.getClaim("username");
		}catch(Exception e){
			throw new UsernameNotFoundException("Não foi encontrado o usuário");
		}

	}

	@PreAuthorize("hasRole('USER')")
	@PutMapping
	@Operation(
		summary = "Atualizar perfil do usuário",
		description = """
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
			""",
		security = @SecurityRequirement(name = "bearerAuth")
	)
	@ApiResponses(value = {
		@ApiResponse(
			responseCode = "200",
			description = "Perfil atualizado com sucesso. Tokens JWT foram revogados.",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(
					name = "Sucesso",
					description = "Perfil atualizado com sucesso",
					value = "\"Perfil atualizado com sucesso. Faça login novamente.\""
				)
			)
		),
		@ApiResponse(
			responseCode = "400",
			description = "Erro na atualização - dados inválidos ou email já existe",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(
					name = "Erro de validação",
					description = "Dados inválidos fornecidos",
					value = "\"Erro na validação dos dados fornecidos\""
				)
			)
		),
		@ApiResponse(
			responseCode = "401",
			description = "Token JWT inválido ou expirado",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(
					name = "Token inválido",
					description = "Usuário não autenticado",
					value = "\"Token JWT inválido ou expirado\""
				)
			)
		),
		@ApiResponse(
			responseCode = "403",
			description = "Acesso negado - Role USER necessária",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(
					name = "Acesso negado",
					description = "Usuário sem permissão adequada",
					value = "\"Acesso negado. Role USER necessária.\""
				)
			)
		),
		@ApiResponse(
			responseCode = "422",
			description = "Erro de validação dos campos obrigatórios",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(type = "string"),
				examples = @ExampleObject(
					name = "Validação",
					description = "Campos obrigatórios não fornecidos ou inválidos",
					value = "\"Erro de validação: campos obrigatórios ausentes ou inválidos\""
				)
			)
		)
	})
	public ResponseEntity<String> updateProfile(
		@Parameter(
			description = "Dados do usuário para atualização. Apenas campos fornecidos serão atualizados.",
			required = true,
			content = @Content(
				schema = @Schema(implementation = UserUpdateDTO.class),
				examples = {
					@ExampleObject(
						name = "Atualização completa",
						description = "Exemplo de atualização de todos os campos",
						value = """
							{
								"name": "João Silva Santos",
								"email": "joao.santos@novoemail.com",
								"password": "novasenha123",
								"colorTheme": "green"
							}
							"""
					),
					@ExampleObject(
						name = "Atualização parcial - apenas nome",
						description = "Exemplo atualizando apenas o nome",
						value = """
							{
								"name": "João Silva Santos"
							}
							"""
					),
					@ExampleObject(
						name = "Atualização de senha",
						description = "Exemplo atualizando apenas a senha",
						value = """
							{
								"password": "minhaNovasenha456"
							}
							"""
					),
					@ExampleObject(
						name = "Atualização de tema",
						description = "Exemplo atualizando apenas o tema de cor",
						value = """
							{
								"colorTheme": "purple"
							}
							"""
					)
				}
			)
		)
		@Valid @RequestBody UserUpdateDTO dto){
		boolean userIsSaved = service.updateUser(authenticated(), dto);
		if(userIsSaved){
			TokenRevocationUtil.revokeCurrentUserTokens(authorizationService);
			return new ResponseEntity<>(HttpStatus.OK);
		}return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

}