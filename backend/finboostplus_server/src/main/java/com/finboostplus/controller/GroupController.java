package com.finboostplus.controller;

import com.finboostplus.DTO.GroupDto;
import com.finboostplus.model.Group;
import com.finboostplus.model.User;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.service.GroupService;
import com.finboostplus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    GroupService groupService;

    @Autowired
    UserService userService;

    @Autowired
    GroupRepository groupRepository;

    @PostMapping()
public ResponseEntity<Object>createNewGroup(@RequestBody GroupDto dto){


            String userName = userService.authenticated();

            User user = userService.getUser(userName);

            if(user==null){

                return  ResponseEntity.badRequest().body("Usuário Não Encontrado ");

            }else{
                Group newGroup = groupService.createNewGroup(dto,user);
                if(newGroup != null){
                    return  ResponseEntity.status(201).body(newGroup);
                }
            }

        return  ResponseEntity.badRequest().body("Não foi possível a criação do Grupo, ");
 }


    @GetMapping()
    public ResponseEntity<Page<Group>> listGroupsPage(
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10")int size) {
        Pageable pageable = PageRequest.of(page, size);
        User  user = getUser();
        System.out.println(user.toString());

        Page<Group> groups = groupService.listCreatorGroupPage(user.getId(), pageable);

        return ResponseEntity.ok(groups);
    }

    private User getUser(){
        String userName = userService.authenticated();
        User user = userService.getUser(userName);
        System.out.println("DENTRO DO GETUSER" + user.toString());
        return  user;
    }
}
