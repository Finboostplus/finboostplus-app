package com.finboostplus.controller;

import com.finboostplus.DTO.ExpenseCreateDTO;
import com.finboostplus.DTO.ExpenseUpdateDTO;
import com.finboostplus.enums.Status;
import com.finboostplus.model.UserExpenseDivision;
import com.finboostplus.projection.GroupExpenseProjection;
import com.finboostplus.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("groups/{groupId}/expenses")
public class ExpenseController {

        @Autowired
        ExpenseService expenseService;

        @PostMapping
        public ResponseEntity<String> createNewExpense(@Valid @RequestBody ExpenseCreateDTO dto,
                        @PathVariable Long groupId) {
                return expenseService.createNewExpense(dto, groupId)
                                ? new ResponseEntity<String>("Despesa criada com sucesso!", HttpStatus.CREATED)
                                : new ResponseEntity<String>("", HttpStatus.BAD_REQUEST);
        }

        @GetMapping
        public ResponseEntity<Page<GroupExpenseProjection>> getAllGroupExpenses(
                        @PathVariable Long groupId,
                        @RequestParam(required = false) Status status,
                        @RequestParam(defaultValue = "true") boolean allMemberExpenses,
                        @RequestParam(defaultValue = "false") boolean allGroupMembersExpenses,
                        @RequestParam("page") Integer page,
                        @RequestParam("size") Integer size) {

                Pageable pageable = PageRequest.of(page, size);
                Page<GroupExpenseProjection> expenses = expenseService.getAllGroupExpenses(
                                groupId, status, allMemberExpenses, allGroupMembersExpenses, pageable);

                return ResponseEntity.ok(expenses);
        }

        @PutMapping("{expenseId}")
        public ResponseEntity<String> updateExpense(@Valid @RequestBody ExpenseUpdateDTO dto,
                        @PathVariable Long groupId, @PathVariable Long expenseId) {
                return expenseService.updateExpense(dto, groupId, expenseId)
                                ? new ResponseEntity<String>("Despesa atualizada com sucesso!", HttpStatus.OK)
                                : new ResponseEntity<String>("", HttpStatus.BAD_REQUEST);
        }

        @PatchMapping("/{expenseId}/member/{memberId}")
        public ResponseEntity<Object> updateMemberExpenseStatus(
                        @PathVariable Long memberId,
                        @PathVariable Long groupId,
                        @PathVariable Long expenseId,
                        ExpenseUpdateDTO dto) {
                boolean isUpdated = expenseService.updateExpenseStatus(memberId, groupId,
                                expenseId, dto);
                if (isUpdated) {
                        return ResponseEntity.status(HttpStatus.OK).body("Atualizado com sucesso!");
                }
                return ResponseEntity.badRequest().body("Não foi possivel atualizar o status da despesa");
        }
}
