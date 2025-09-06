package com.finboostplus.controller;


import com.finboostplus.DTO.ExpenseCreateDTO;
import com.finboostplus.DTO.GroupExpenseDTO;
import com.finboostplus.enums.Status;
import com.finboostplus.projection.GroupExpenseProjection;
import com.finboostplus.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("groups/{groupId}/expenses")
public class ExpenseController {

    @Autowired
    ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<String> createNewExpense(@Valid @RequestBody ExpenseCreateDTO dto, @PathVariable Long groupId){
        return expenseService.createNewExpense(dto, groupId)?
            new ResponseEntity<String>("Despesa criada com sucesso!", HttpStatus.CREATED):
            new ResponseEntity<String>("",HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public ResponseEntity<List<GroupExpenseProjection>> getAllGroupExpenses(
            @PathVariable Long groupId,
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "true") boolean allMemberExpenses,
            @RequestParam(defaultValue = "false") boolean allGroupMembersExpenses) {

        List<GroupExpenseProjection> expenses = expenseService.getAllGroupExpenses(
                groupId, status, allMemberExpenses, allGroupMembersExpenses);

        return ResponseEntity.ok(expenses);
    }


}
