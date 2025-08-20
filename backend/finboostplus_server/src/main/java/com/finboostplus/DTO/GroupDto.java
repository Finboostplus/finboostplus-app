package com.finboostplus.DTO;

import com.finboostplus.model.Group;

public record GroupDto(Long id, String name, String description) {

    public Group groupDtoToGroup() {

        Group group = new Group();
        group.setName(name);
        group.setDescription(description);
        return group;
    }
}
