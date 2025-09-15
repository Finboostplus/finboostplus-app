package com.finboostplus.service;

import com.finboostplus.enums.Status;
import com.finboostplus.exception.*;
import com.finboostplus.model.*;
import com.finboostplus.projection.ExpenseProjection;
import com.finboostplus.projection.GroupExpenseProjection;
import com.finboostplus.repository.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.finboostplus.DTO.*;

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

        private List<String> authLevels = List.of("OWNER", "ADMIN");

        // public Expense addNewExpense(Long idGroup, Long idCategory, ExpenseRequestDTO
        // expDto) {
        //
        // Expense expense = new Expense();
        // String userName = userService.authenticated();
        // User user = userService.getUser(userName);
        // Group group = groupService.getGroup(idGroup);
        // Category category = categoryService.getCategory(idCategory);
        //
        // if (user != null) {
        // if (groupMemberService.getUserOnwerAdmin(user.getId(), idGroup, authLevels)
        // && group != null) {
        // expense = expDto.expDToToExpense();
        // expense.setGroup(group);
        // expense.setCategory(category);
        //
        // return expenseRepository.save(expense);
        // }
        // }
        // return null;
        // }

        public List<ExpenseProjection> listExpenseDTOGroupById(Long groupId) {

                String userName = userService.authenticated();
                User user = userService.getUser(userName);
                Group group = groupService.getGroup(groupId);
                List<ExpenseProjection> expenseProjections = null;
                if (user != null && group != null) {
                        /* VERIFICAR AINDA SE O USUASRIO FAZ PARTE DE GRUPO */
                        expenseProjections = expenseRepository.listExpensesGroupById(user.getId(), groupId);
                        return expenseProjections;
                }

                return null;
        }

        @Transactional
        public boolean createNewExpense(ExpenseCreateDTO expenseDTO, Long groupId) {
                // Validação da divisão de valores
                if (!isValuesCompatibles(expenseDTO.expenseValue(), expenseDTO.expenseDivision())) {
                        throw new ValuesIncompatiblesException(
                                        "O total da divisão da despesa é incompatível com o valor da despesa");
                }
                isExpenseCreationorUpdateAllowed(groupId);

                // Busca entidades relacionadas
                Group group = groupRepository.findById(groupId)
                                .orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));

                Category category = categoryRepository.findById(expenseDTO.categoryId())
                                .orElseThrow(() -> new CategoryNotFoundException("Categoria não encontrada"));

                // Validação da lista de membros
                for (MembersExpenseDivisionCreateDTO member : expenseDTO.expenseDivision()) {
                        if (!groupMemberRepository.isUserMemberOfGroup(member.id(), groupId)) {
                                throw new ForbiddenResourceException("Membro da despesa não pertence ao grupo");
                        }
                }

                Status status = expenseDTO.deadlineDate().isAfter(LocalDate.now()) ? Status.PENDING : Status.UNPAID;

                // Criação da despesa
                Expense expense = new Expense(
                                expenseDTO.title(),
                                expenseDTO.description(),
                                expenseDTO.expenseValue(),
                                category,
                                group,
                                expenseDTO.deadlineDate(),
                                status);

                expense = expenseRepository.save(expense);

                // Criação da divisão da despesa entre membros
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

        @Transactional
        public boolean updateExpense(ExpenseUpdateDTO expenseDTO, Long groupId, Long expenseId) {
                isExpenseCreationorUpdateAllowed(groupId);

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

        private void isExpenseCreationorUpdateAllowed(Long groupId) {
                // Autenticação e verificação de permissões
                String userName = userService.authenticated();
                User user = userRepository.findByEmailIgnoreCase(userName)
                                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

                boolean hasAuthority = groupMemberRepository
                                .isUserOnwerOrAdmin(user.getId(), groupId, authLevels);

                if (!hasAuthority) {
                        throw new ForbiddenResourceException(
                                        "Usuário não tem permissão para atualizar dados de despesas no grupo");
                }
        }

        public Page<GroupExpenseProjection> getAllGroupExpenses(Long groupId, Status status, boolean allMemberExpenses,
                        boolean allGroupMembersExpenses, Pageable pageable) {
                String userName = userService.authenticated();
                User user = userRepository.findByEmailIgnoreCase(userName)
                                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
                if (!groupMemberRepository.isUserMemberOfGroup(user.getId(), groupId)) {
                        throw new ForbiddenResourceException("Acesso negado");
                }

                if (allGroupMembersExpenses == true) {
                        allMemberExpenses = false;
                }

                if (allMemberExpenses == true) {
                        if (status == null) {
                                return expenseRepository.getAllGroupExpenses(user.getId(), groupId, pageable);
                        } else {
                                return expenseRepository.getAllGroupExpensesFiltered(user.getId(), groupId,
                                                status.name(), pageable);
                        }
                } else if (allGroupMembersExpenses == true
                                && groupMemberRepository.isUserOnwerOrAdmin(user.getId(), groupId, authLevels)) {
                        if (status == null) {
                                return expenseRepository.getAllGroupExpensesOfAllMembers(groupId, pageable);
                        } else {
                                return expenseRepository.getAllGroupExpensesOfAllMembersFiltered(user.getId(), groupId,
                                                status.name(), pageable);
                        }
                }
                throw new ForbiddenResourceException("Acesso negado");
        }

        @Transactional
        public boolean updateExpenseStatus(Long memberId, Long groupId, Long expenseId, ExpenseUpdateDTO expenseDTO) {
                String username = userService.authenticated();
                Optional<User> onwerUser = userRepository.findByEmailIgnoreCase(username);
                if (onwerUser.isEmpty()) {
                        throw new UserNotFoundException("Usuário não encontrado");
                }

                Group group = groupService.getGroup(groupId);
                Long onwerUserId = onwerUser.get().getId();

                boolean isOwner = groupMemberRepository.isUserAndGroupAndAuthorityValidToUpdateOrDeleteGroup(
                                onwerUserId, groupId);
                if (isOwner == false)
                        throw new ForbiddenResourceException(
                                        "Usuário não possui autoridade para alterar o status da despesa");

                boolean isMember = groupMemberRepository.isUserMemberOfGroup(memberId, groupId);
                if (isMember == false) {
                        throw new ForbiddenResourceException("Membro não pertence ao grupo");
                }

                boolean memberHasExpense = userExpenseDivisionRepository.existsByUserIdAndExpenseId(memberId,
                                expenseId);
                if (memberHasExpense == false) {
                        throw new ForbiddenResourceException("Usuário não está associado a essa despesa");
                }

                Expense expense = expenseRepository.findById(expenseId)
                                .orElseThrow(() -> new ExpenseNotFoundException("Despesa não encontrada"));

                UserExpenseDivision userExpenseDivision = userExpenseDivisionRepository
                                .findByExpenseIdAndGroupId(memberId, expenseId);
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
}
