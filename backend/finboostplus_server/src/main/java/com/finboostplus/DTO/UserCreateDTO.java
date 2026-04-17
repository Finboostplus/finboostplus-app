package com.finboostplus.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserCreateDTO(
		@NotBlank(message = "O nome de usuário é obrigatório")
		@Size(min = 3, max = 50, message = "O nome de usuário deve ter entre 3 e 50 caracteres")
		String name,

		@NotBlank(message = "O e-mail é obrigatório")
		@Email(message = "E-mail inválido")
		@Size(min = 10, max = 50, message = "O e-mail deve ter no máximo 50 caracteres")
		String email,

		@NotBlank(message = "A senha é obrigatória")
		@Size(min = 6, max = 50, message = "A senha deve ter no máximo 50 caracteres")
		String password,

		String themeColor
) {}
