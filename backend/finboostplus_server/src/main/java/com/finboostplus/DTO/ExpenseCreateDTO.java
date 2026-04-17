package com.finboostplus.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public record ExpenseCreateDTO(
        @NotBlank(message = "O título não pode ser vazio")
        @Size(min = 3, max = 100, message = "O título deve ter entre 3 e 100 caracteres")
        String title,

        @Size(max = 255, message = "A descrição deve ter no máximo 255 caracteres")
        String description,

        @NotNull(message = "A data limite é obrigatória")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate deadlineDate,

        @NotEmpty(message = "A divisão da despesa deve conter pelo menos um membro")
        Set<MembersExpenseDivisionCreateDTO> expenseDivision,

        @NotNull(message = "O valor não pode ser nulo")
        @DecimalMin(value = "0.0", inclusive = false, message = "O valor deve ser maior que zero")
        @Digits(integer = 10, fraction = 2, message = "O valor deve ter no máximo 2 casas decimais")
        BigDecimal expenseValue,

        @NotNull(message = "A categoria não pode ser nula")
        @Positive(message = "O ID da categoria deve ser positivo")
        Long categoryId) {
}
