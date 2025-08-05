package com.finboostplus.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
		@NotBlank(message = "O nome de usuário é obrigatório")
		@Size(max = 100, message = "O nome de usuário deve ter no máximo 100 caracteres")
		String name,

		@NotBlank(message = "O e-mail é obrigatório")
		@Email(message = "E-mail inválido")
		@Size(max = 100, message = "O e-mail deve ter no máximo 100 caracteres")
		String email,

		@NotBlank(message = "A senha é obrigatória")
		@Size(max = 100, message = "A senha deve ter no máximo 100 caracteres")
		String password,

		String colorTheme
) {}
