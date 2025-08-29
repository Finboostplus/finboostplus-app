package com.finboostplus.controller;

import com.finboostplus.DTO.GroupUpdateDTO;
import com.finboostplus.model.Group;
import com.finboostplus.model.User;
import com.finboostplus.service.GroupService;
import com.finboostplus.service.GroupMemberService;
import com.finboostplus.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import com.finboostplus.DTO.GroupCreateDTO;
import com.finboostplus.DTO.GroupMemberDTO;


@RestController
@RequestMapping("/groups")

public class GroupController {

    @Autowired
    GroupService groupService;

    @Autowired
    UserService userService;

    @Autowired
    GroupMemberService groupMemberService;

    @PostMapping
    public ResponseEntity<String> createGroup(@Valid @RequestBody GroupCreateDTO dto){
        boolean groupIsCreated = groupService.createNewGroup(dto);
        if (groupIsCreated) {
            return new ResponseEntity<>("Grupo criado com sucesso!", HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{groupId}/members")
    public ResponseEntity<String> addGroupMember(@PathVariable Long groupId, @RequestBody GroupMemberDTO groupMemberDTO){
        groupMemberService.addGroupMember(groupId, groupMemberDTO);
        return new ResponseEntity<>("Membro adicionado com sucesso!", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Group>> listGroupsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        User user = getUser();
        System.out.println(user.toString());

        Page<Group> groups = groupService.listCreatorGroupPage(user.getId(), pageable);

        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    private User getUser() {
        String userName = userService.authenticated();
        User user = userService.getUser(userName);
        System.out.println("DENTRO DO GETUSER" + user.toString());
        return user;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable Long id, @RequestBody GroupUpdateDTO groupUpdateDTO) {
        Optional<Group> group = groupService.updateGroup(id, groupUpdateDTO);
        if (group.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(group.get(), HttpStatus.OK);
    }
}
