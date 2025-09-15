package com.finboostplus.DTO;

import com.finboostplus.model.Group;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record GroupCreateDTO(
        @NotBlank(message = "O nome de grupo é obrigatório") @Size(max = 100, message = "O nome do grupo deve ter no máximo 100 caracteres") String name,

        @NotBlank(message = "A descrição é obrigatória") @Size(max = 100, message = "A descrição do grupo deve ter no máximo 100 caracteres") String description) {
    public Group groupDtoToGroup(long userId) {

        Group group = new Group();
        group.setName(name);
        group.setDescription(description);
        group.setCreatedAt(Instant.now());
        return group;
    }

}
