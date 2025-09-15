package com.finboostplus.DTO;

import com.finboostplus.model.Expense;
import com.finboostplus.model.Group;

import java.time.Instant;
import java.util.Set;

public record GroupDto(Long id, String name, String description, Set<ExpenseDTO> expense) {

//    public Group groupDtoToGroup(){
//
//        Expense e = new Expense();
//        Group group = new Group();
//        group.setId(id);
//        group.setName(name);
//        group.setDescription(description);
//        group.setExpenses(expense);
//
//        return  group;
//    }

}
