package com.finboostplus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finboostplus.DTO.CategoryDTO;
import com.finboostplus.DTO.ExpenseCreateDTO;
import com.finboostplus.DTO.ExpenseUpdateDTO;
import com.finboostplus.DTO.UserExpenseDivisionDTO;
import com.finboostplus.enums.Status;
import com.finboostplus.projection.GroupMemberExpenseProjection;
import com.finboostplus.service.CategoryService;
import com.finboostplus.service.ExpenseService;

import jakarta.validation.Valid;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("groups/{groupId}/expenses")
public class ExpenseController {

	@Autowired
	ExpenseService expenseService;

	@Autowired
	CategoryService categoryService;

	@PostMapping
	public ResponseEntity<String> createNewExpense(@Valid @RequestBody ExpenseCreateDTO dto,
			@PathVariable Long groupId) {
		return expenseService.createNewExpense(dto, groupId)
				? new ResponseEntity<String>("Despesa criada com sucesso!", HttpStatus.CREATED)
				: new ResponseEntity<String>("", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/categories")
	public ResponseEntity<List<CategoryDTO>> getCategory(){
		return ResponseEntity.ok(categoryService.findAllCategories());
	}

	@GetMapping("{expenseId}")
	public ResponseEntity<Object> getExpenseDetails(@PathVariable Long groupId,
			@PathVariable Long expenseId) {
		UserExpenseDivisionDTO expenseDivDTO = expenseService.getExpenseInfoDetails(groupId, expenseId);
		if (expenseDivDTO != null) {
			return ResponseEntity.ok(expenseDivDTO);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Despesa não encontrada");
	}

	@GetMapping
	public ResponseEntity<Page<GroupMemberExpenseProjection>> getAllGroupExpenses(
			@PathVariable Long groupId,
			@RequestParam(required = false) Status status,
			@RequestParam(defaultValue = "true") boolean allMemberExpenses,
			@RequestParam(defaultValue = "false") boolean allGroupMembersExpenses,
			@RequestParam(name = "page", defaultValue = "0") Integer page,
			@RequestParam(name = "size", defaultValue = "4") Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<GroupMemberExpenseProjection> expenses = expenseService.getAllGroupExpenses(
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

	@DeleteMapping("{expenseId}")
	public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId, @PathVariable Long groupId) {
		expenseService.deleteExpense(expenseId, groupId);
		return ResponseEntity.noContent().build();
	}
}
