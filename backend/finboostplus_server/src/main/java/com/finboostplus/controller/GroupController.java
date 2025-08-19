package com.finboostplus.controller;

import com.finboostplus.DTO.GroupUpdateDTO;
import com.finboostplus.model.Group;
import com.finboostplus.service.GroupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable Long id, @RequestBody GroupUpdateDTO groupUpdateDTO) {
        return groupService.updateGroup(id, groupUpdateDTO)
                .map(updatedGroup -> new ResponseEntity<>(updatedGroup, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
