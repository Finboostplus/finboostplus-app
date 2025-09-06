package com.finboostplus.service;

import com.finboostplus.DTO.ExpenseCreateDTO;
import com.finboostplus.DTO.ExpenseRequestDTO;
import com.finboostplus.DTO.GroupExpenseDTO;
import com.finboostplus.DTO.MembersExpenseDivisionCreateDTO;
import com.finboostplus.enums.Status;
import com.finboostplus.exception.*;
import com.finboostplus.model.*;
import com.finboostplus.projection.ExpenseProjection;
import com.finboostplus.projection.GroupExpenseProjection;
import com.finboostplus.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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


   public Expense addNewExpense(Long idGroup, Long idCategory, ExpenseRequestDTO expDto){

       Expense expense = new Expense();
       String userName = userService.authenticated();
       User user = userService.getUser(userName);
       Group group = groupService.getGroup(idGroup);
       Category category = categoryService.getCategory(idCategory);

       if(user != null){
           if(groupMemberService.getUserOnwerAdmin(user.getId(),idGroup,authLevels)
             && group != null){
               expense = expDto.expDToToExpense();
               expense.setGroup(group);
               expense.setCategory(category);

               return expenseRepository.save(expense);
           }
       }
       return null;
   }

   public List<ExpenseProjection> listExpenseDTOGroupById(Long groupId){

       String userName = userService.authenticated();
       User user = userService.getUser(userName);
       Group group = groupService.getGroup(groupId);
       List<ExpenseProjection> expenseProjections = null;
       if(user != null && group != null){
           /*VERIFICAR AINDA SE O USUASRIO FAZ PARTE DE GRUPO*/
           expenseProjections = expenseRepository.listExpensesGroupById(user.getId(),groupId);
           return expenseProjections;
       }

       return  null;
   }

    @Transactional
    public boolean createNewExpense(ExpenseCreateDTO expenseDTO, Long groupId) {
        // 1. Validação da divisão de valores
        if (!isValuesCompatibles(expenseDTO.expenseValue(), expenseDTO.expenseDivision())) {
            throw new ValuesIncompatiblesException(
                    "O total da divisão da despesa é incompatível com o valor da despesa");
        }

        // 2. Autenticação e verificação de permissões
        String userName = userService.authenticated();
        User user = userRepository.findByEmailIgnoreCase(userName)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        boolean hasAuthority = groupMemberRepository
                .isUserOnwerOrAdmin(user.getId(), groupId, authLevels);

        if (!hasAuthority) {
            throw new ForbiddenResourceException("Usuário não tem permissão para criar despesas no grupo");
        }

        // 3. Busca entidades relacionadas
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException("Grupo não encontrado"));

        Category category = categoryRepository.findById(expenseDTO.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Categoria não encontrada"));

        // 4. Validação da lista de membros
        for (MembersExpenseDivisionCreateDTO member : expenseDTO.expenseDivision()) {
            if (!groupMemberRepository.isUserMemberOfGroup(member.id(), groupId)) {
                throw new ForbiddenResourceException("Membro da despesa não pertence ao grupo");
            }
        }

        Status status = expenseDTO.deadlineDate().isAfter(LocalDate.now()) ? Status.PENDING : Status.UNPAID;

        // 5. Criação da despesa
        Expense expense = new Expense(
                expenseDTO.title(),
                expenseDTO.description(),
                expenseDTO.expenseValue(),
                category,
                group,
                expenseDTO.deadlineDate(),
                status
        );

        expense = expenseRepository.save(expense);

        // 6. Criação da divisão da despesa entre membros
        for (MembersExpenseDivisionCreateDTO member : expenseDTO.expenseDivision()) {
            UserExpenseDivisionId userExpenseDivisionId =
                    new UserExpenseDivisionId(member.id(), expense.getId());

            User userMember = member.UserExpenseDivisionCreateDTOToUser();

            UserExpenseDivision userExpenseDivision = new UserExpenseDivision(
                    userExpenseDivisionId,
                    userMember,
                    expense,
                    member.value(),
                    status
            );

            userExpenseDivisionRepository.save(userExpenseDivision);
        }

        return true;
    }


    private boolean isValuesCompatibles(BigDecimal expenseValue, Set<MembersExpenseDivisionCreateDTO> expenseMembers) {
        if (expenseValue == null || expenseMembers == null || expenseMembers.isEmpty()) {
            return false;
        }

        BigDecimal total = expenseMembers.stream()
                .map(MembersExpenseDivisionCreateDTO::value)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return expenseValue.compareTo(total) == 0;
    }

    public List<GroupExpenseProjection> getAllGroupExpenses (Long groupId, Status status, boolean allMemberExpenses, boolean allGroupMembersExpenses ){
        String userName = userService.authenticated();
        User user = userRepository.findByEmailIgnoreCase(userName)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        if (!groupMemberRepository.isUserMemberOfGroup(user.getId(), groupId)) {
            throw new ForbiddenResourceException("Acesso negado");
        }

        if(allGroupMembersExpenses==true){
            allMemberExpenses=false;
        }

        if(allMemberExpenses==true){
            if(status == null){
                return expenseRepository.getAllGroupExpenses(user.getId(), groupId);
            }else{
                return expenseRepository.getAllGroupExpensesFiltered(user.getId(), groupId, status.name());
            }
        }else if(allGroupMembersExpenses==true && groupMemberRepository.isUserOnwerOrAdmin(user.getId(), groupId,authLevels)){
            if(status == null){
                return expenseRepository.getAllGroupExpensesOfAllMembers(groupId);
            }else{
                return expenseRepository.getAllGroupExpensesOfAllMembersFiltered(user.getId(), groupId, status.name());
            }
        }
        throw new ForbiddenResourceException("Acesso negado");
    }

}
