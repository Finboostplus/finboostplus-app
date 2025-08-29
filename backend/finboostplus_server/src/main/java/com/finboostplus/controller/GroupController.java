package com.finboostplus.controller;

import com.finboostplus.DTO.*;
import com.finboostplus.model.Expense;
import com.finboostplus.model.Group;
import com.finboostplus.model.User;
import com.finboostplus.projection.GroupProjection;
import com.finboostplus.service.ExpenseService;
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


@RestController
@RequestMapping("/groups")

public class GroupController {

    @Autowired
    GroupService groupService;

    @Autowired
    UserService userService;

    @Autowired
    GroupMemberService groupMemberService;

    @Autowired
    ExpenseService expenseService;

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
    public ResponseEntity<Page<GroupProjection>> listGroupsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        User user = getUser();
       // System.out.println(user.toString());
        Page<GroupProjection> groupsDTO = groupService.listaCreatorGroupPageProjection(user.getId(), pageable);
        return new ResponseEntity<>(groupsDTO, HttpStatus.OK);
    }
//
//    @GetMapping
//    public ResponseEntity<Page<GroupDto>> listGroupsPageExp(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        User user = getUser();
//        System.out.println(user.toString());
//
//        Page<GroupDto> groupsDTO = groupService.listCreatorGroupPageDTO(user.getId(), pageable);
//
//        return new ResponseEntity<>(groupsDTO, HttpStatus.OK);
//    }

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
    @PostMapping("/{groupId}/expenses/category/{catId}")
    public ResponseEntity<Object> addNewExpense(
            @PathVariable Long groupId,
            @PathVariable Long catId,
            @RequestBody ExpenseRequestDTO dto){

        Expense expense =   expenseService.addNewExpense(groupId,catId,dto);

        if(expense != null){
            ExpenseResponseDTO expdto = new ExpenseResponseDTO(
                    expense.getId(),
                    expense.getTitle(),
                    expense.getDescription(),
                    expense.getValue(),
                    expense.getCreatAt(),
                    expense.getDeadlineDate());

            return ResponseEntity.status(HttpStatus.CREATED).body(expdto);
        }
        return ResponseEntity.badRequest().body("Não foi possível a criação da nova Despesa ");
    }

    @GetMapping("/{groupId}/expenses")
    public ResponseEntity<Object> listDetailsGroup(@PathVariable Long groupId){
        GroupDetailsDTO dto = groupService.getExpenseGroupById(groupId);
        if(dto != null){
            return ResponseEntity.ok().body(dto);
        }
        return ResponseEntity.badRequest().body("Não foi possivel obter os detalhes do grupo");
    }
}
