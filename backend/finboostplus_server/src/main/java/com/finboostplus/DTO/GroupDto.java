package com.finboostplus.DTO;

import com.finboostplus.model.Group;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record GroupDto(Long id, String name, String description) {

    public Group groupDtoToGroup(){

        Group group = new Group();
        group.setName(name);
        group.setDescription(description);

        return  group;
    }
    public Group groupDtoToGroup( Long id){

        Group group = new Group();
        group.setId(id);
        group.setName(name);
        group.setDescription(description);

        return  group;
    }
}
