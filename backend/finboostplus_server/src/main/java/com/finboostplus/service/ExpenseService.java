package com.finboostplus.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finboostplus.DTO.ExpenseCreateDTO;
import com.finboostplus.DTO.ExpenseUpdateDTO;
import com.finboostplus.DTO.MembersExpenseDivisionCreateDTO;
import com.finboostplus.DTO.UserExpenseDivisionDTO;
import com.finboostplus.enums.Status;
import com.finboostplus.exception.CategoryNotFoundException;
import com.finboostplus.exception.ExpenseNotFoundException;
import com.finboostplus.exception.ForbiddenResourceException;
import com.finboostplus.exception.GroupNotFoundException;
import com.finboostplus.exception.UserNotFoundException;
import com.finboostplus.exception.ValuesIncompatiblesException;
import com.finboostplus.model.Category;
import com.finboostplus.model.Expense;
import com.finboostplus.model.Group;
import com.finboostplus.model.User;
import com.finboostplus.model.UserExpenseDivision;
import com.finboostplus.model.UserExpenseDivisionId;
import com.finboostplus.projection.ExpenseProjection;
import com.finboostplus.projection.GroupExpenseProjection;
import com.finboostplus.projection.UserExpenseDivisionProjection;
import com.finboostplus.repository.CategoryRepository;
import com.finboostplus.repository.ExpenseRepository;
import com.finboostplus.repository.GroupMemberRepository;
import com.finboostplus.repository.GroupRepository;
import com.finboostplus.repository.UserExpenseDivisionRepository;
import com.finboostplus.repository.UserRepository;

@Service
public class ExpenseService {
	@Autowired
	GroupMemberService groupMemberService;

	@Autowired
	ExpenseRepository expenseRepository;

	@Autowired
	GroupService groupService;

	@Autowired
	UserExpenseDivisionRepository userExpenseDivisionRepository;

	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	GroupMemberRepository groupMemberRepository;

	@Autowired
	CategoryService categoryService;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	GroupRepository groupRepository;

	private final List<String> AUTHLEVELS = List.of("OWNER", "ADMIN");

	private void isUserAllowed(Long groupId) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		boolean hasAuthority = groupMemberRepository
				.doesUserHasAnyAuthority(user.getId(), groupId, AUTHLEVELS);
		if (!hasAuthority) {
			throw new ForbiddenResourceException(
					"Usuário não tem permissão para atualizar dados de despesas no grupo");
		}
	}

	private boolean isValuesCompatibles(BigDecimal expenseValue,
			Set<MembersExpenseDivisionCreateDTO> expenseMembers) {
		if (expenseValue == null || expenseMembers == null || expenseMembers.isEmpty()) {
			return false;
		}
		BigDecimal total = expenseMembers.stream()
				.map(MembersExpenseDivisionCreateDTO::value)
				.reduce(BigDecimal.ZERO, BigDecimal::add);
		return expenseValue.compareTo(total) == 0;
	}

	@Transactional
	public boolean createNewExpense(ExpenseCreateDTO expenseDTO, Long groupId) {
		if (!isValuesCompatibles(expenseDTO.expenseValue(), expenseDTO.expenseDivision())) {
			throw new ValuesIncompatiblesException(
					"O total da divisão da despesa é incompatível com o valor da despesa");
		}
		User user = userRepository
				.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
		Group group = groupRepository.findById(groupId)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		boolean userHasAnyAuthority = groupMemberRepository.doesUserHasAnyAuthority(user.getId(), group.getId(),
				AUTHLEVELS);
		if (!userHasAnyAuthority) {
			throw new ForbiddenResourceException("Usuário não autorizado");
		}
		Category category = categoryRepository.findById(expenseDTO.categoryId())
				.orElseThrow(() -> new CategoryNotFoundException("Categoria não encontrada"));
		for (MembersExpenseDivisionCreateDTO member : expenseDTO.expenseDivision()) {
			if (!groupMemberRepository.isUserMemberOfGroup(member.id(), groupId)) {
				throw new ForbiddenResourceException("Membro da despesa não pertence ao grupo");
			}
		}
		Status status = expenseDTO.deadlineDate().isAfter(LocalDate.now()) ? Status.PENDING : Status.UNPAID;
		Expense expense = new Expense(
				expenseDTO.title(),
				expenseDTO.description(),
				expenseDTO.expenseValue(),
				category,
				group,
				expenseDTO.deadlineDate(),
				status);
		expense = expenseRepository.save(expense);
		for (MembersExpenseDivisionCreateDTO member : expenseDTO.expenseDivision()) {
			UserExpenseDivisionId userExpenseDivisionId = new UserExpenseDivisionId(member.id(),
					expense.getId());
			User userMember = member.userExpenseDivisionCreateDTOToUser();
			UserExpenseDivision userExpenseDivision = new UserExpenseDivision(
					userExpenseDivisionId,
					userMember,
					expense,
					member.value(),
					status);
			userExpenseDivisionRepository.save(userExpenseDivision);
		}
		return true;
	}

	@Transactional(readOnly = true)
	public UserExpenseDivisionDTO getExpenseInfoDetails(Long groupId, Long expenseId) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		boolean hasAuthority = groupMemberRepository
				.doesUserHasAnyAuthority(user.getId(), groupId, AUTHLEVELS);
		if (!hasAuthority) {
			throw new ForbiddenResourceException(
					"Usuário não tem permissão para visualizar detelhes da despesa");
		}
		Group group = groupRepository.findById(groupId)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		Expense expense = expenseRepository.findById(expenseId).orElseThrow(
				() -> new ForbiddenResourceException("Despesa nao encontrada"));
		List<UserExpenseDivisionProjection> memberList = getExpenseDivisionDetails(group.getId(), expenseId);
		return new UserExpenseDivisionDTO(expense.getId(), expense.getTitle(),
				expense.getDescription(), groupId, group.getName(), expense.getStatus(),
				expense.getValue(), expense.getCreatedAt(), memberList);
	}

	private List<UserExpenseDivisionProjection> getExpenseDivisionDetails(Long groupId, Long expenseId) {
		return expenseRepository.listUsersExpenseDivision(groupId, expenseId);
	}

	@Transactional(readOnly = true)
	public Page<GroupExpenseProjection> getAllGroupExpenses(Long groupId, Status status, boolean allMemberExpenses,
			boolean allGroupMembersExpenses, Pageable pageable) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		if (!groupMemberRepository.isUserMemberOfGroup(user.getId(), groupId)) {
			throw new ForbiddenResourceException("Acesso negado");
		}
		if (allGroupMembersExpenses == true) {
			allMemberExpenses = false;
			if (groupMemberRepository.doesUserHasAnyAuthority(user.getId(), groupId, AUTHLEVELS)
					&& status == null) {
				return expenseRepository.getAllGroupExpensesOfAllMembers(groupId, pageable);
			}
			return expenseRepository.getAllGroupExpensesOfAllMembersFiltered(user.getId(), groupId,
					status.name(), pageable);
		}
		if (allMemberExpenses == true && status == null) {
			return expenseRepository.getAllGroupExpenses(user.getId(), groupId, pageable);
		}
		return expenseRepository.getAllGroupExpensesFiltered(user.getId(), groupId,
				status.name(), pageable);
	}
	//
	// @Transactional(readOnly = true)
	// public List<ExpenseProjection> listExpenseGroupById(Long groupId) {
	// User user = userRepository
	// .findByEmailIgnoreCase(userService.authenticated())
	// .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
	// Group group = groupService.getGroup(groupId);
	// List<ExpenseProjection> expenseProjections = null;
	// boolean isUserMemberOfGroup =
	// groupMemberRepository.isUserMemberOfGroup(user.getId(), group.getId());
	// if (user != null && group != null && isUserMemberOfGroup) {
	// expenseProjections = expenseRepository.listExpensesGroupById(user.getId(),
	// groupId);
	// return expenseProjections;
	// }
	// return null;
	// }

	@Transactional
	public boolean updateExpense(ExpenseUpdateDTO expenseDTO, Long groupId, Long expenseId) {
		isUserAllowed(groupId);
		Category category = categoryRepository.findById(expenseDTO.categoryId())
				.orElseThrow(() -> new CategoryNotFoundException("Categoria não encontrada"));
		Expense expense = expenseRepository.findById(expenseId)
				.orElseThrow(() -> new ExpenseNotFoundException("Despesa não encontrada"));
		expense.setTitle(expenseDTO.title());
		expense.setDescription(expenseDTO.description());
		expense.setDeadlineDate(expenseDTO.deadlineDate());
		expense.setCategory(category);
		if (expense.getStatus() != Status.PAID) {
			String status = expenseDTO.deadlineDate().isAfter(LocalDate.now()) ? Status.PENDING.name()
					: Status.UNPAID.name();
			expense.setStatus(Status.valueOf(status));
			expenseRepository.updateExpenseStatus(expenseId, status);
		}
		return true;
	}

	@Transactional
	public boolean updateExpenseStatus(Long memberId, Long groupId, Long expenseId, ExpenseUpdateDTO expenseDTO) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		boolean isMember = groupMemberRepository.isUserMemberOfGroup(memberId, groupId);
		if (!isMember) {
			throw new ForbiddenResourceException("Membro não pertence ao grupo");
		}
		boolean isOwner = groupMemberRepository.isUserGroupOwner(
				user.getId(), groupId);
		if (!isOwner)
			throw new ForbiddenResourceException(
					"Usuário não possui autoridade para alterar o status da despesa");
		Expense expense = expenseRepository.findById(expenseId)
				.orElseThrow(() -> new ExpenseNotFoundException("Despesa não encontrada"));
		if (expense.getGroup().getId() != groupId) {
			throw new ExpenseNotFoundException("Despesa não encontrada");
		}
		UserExpenseDivision userExpenseDivision = userExpenseDivisionRepository
				.findByMemberIdAndExpenseId(memberId, expenseId);
		if (userExpenseDivision != null && userExpenseDivision.getStatus() != Status.PAID) {
			userExpenseDivision.setStatus(Status.PAID);
		} else if (userExpenseDivision != null && userExpenseDivision.getStatus() == Status.PAID
				&& expense.getDeadlineDate().isBefore(LocalDate.now())) {
			userExpenseDivision.setStatus(Status.PENDING);
			expenseRepository.setPaidExpense(expenseId, "PENDING");
		} else {
			userExpenseDivision.setStatus(Status.UNPAID);
			expenseRepository.setPaidExpense(expenseId, "UNPAID");
		}
		boolean isExpensePaid = expenseRepository.isExpensePaid(expenseId);
		if (isExpensePaid == false) {
			expenseRepository.setPaidExpense(expenseId, "PAID");
		}
		return (userExpenseDivisionRepository.save(userExpenseDivision) != null ? true : false);
	}

	@Transactional
	public void deleteExpense(Long expenseId, Long groupId) {
		User user = userRepository.findByEmailIgnoreCase(userService.authenticated())
				.orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
		groupRepository.findById(groupId)
				.orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));
		boolean isOwner = groupMemberRepository.isUserGroupOwner(
				user.getId(), groupId);
		if (!isOwner) {
			throw new ForbiddenResourceException("Usuário não tem permissão");
		}
		expenseRepository.findById(expenseId)
				.orElseThrow(() -> new ExpenseNotFoundException("Despesa não encontrada"));
		userExpenseDivisionRepository.deleteExpenseById(expenseId);
		expenseRepository.deleteExpenseById(expenseId);
	}
}
