package com.finboostplus.DTO;
import com.finboostplus.model.User;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record MembersExpenseDivisionCreateDTO(
        @NotNull(message = "O ID não pode ser nulo")
        @Positive(message = "O ID deve ser positivo")
        Long id,

        @NotNull(message = "O valor não pode ser nulo")
        @DecimalMin(value = "0.0", inclusive = false, message = "O valor deve ser maior que zero")
        @Digits(integer = 10, fraction = 2) // até 10 dígitos antes da vírgula e 2 depois
        BigDecimal value
) {

        public User UserExpenseDivisionCreateDTOToUser(){
                User user = new User();
                user.setId(id);
                return user;
        }
}
