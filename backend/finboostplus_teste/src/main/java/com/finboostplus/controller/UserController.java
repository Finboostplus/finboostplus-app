package com.finboostplus.controller;

import com.finboostplus.DTO.UserRequestDTO;
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
				schema = @Schema(implementation = UserRequestDTO.class),
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
		@Valid @RequestBody UserRequestDTO dto
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
			String email = jwtPrincipal.getClaim("username");
			return "O usuário logado possui o e-mail: "+email;
		}catch(Exception e){
			throw new UsernameNotFoundException("Não foi encontrado o usuário");
		}

	}

}