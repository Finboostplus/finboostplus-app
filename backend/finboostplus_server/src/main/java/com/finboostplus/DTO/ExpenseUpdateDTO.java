package com.finboostplus.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.time.LocalDate;


public record ExpenseUpdateDTO(
        @NotBlank(message = "O título não pode ser vazio")
        @Size(min = 3, max = 100, message = "O título deve ter entre 3 e 100 caracteres")
        String title,

        @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres")
        String description,

        @NotNull(message = "A data limite é obrigatória")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate deadlineDate,

        @NotNull(message = "A categoria não pode ser nula")
        @Positive(message = "O ID da categoria deve ser positivo")
        Long categoryId) {
}
