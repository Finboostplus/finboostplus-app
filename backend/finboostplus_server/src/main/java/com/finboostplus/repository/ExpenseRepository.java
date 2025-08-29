package com.finboostplus.repository;

import com.finboostplus.DTO.ExpenseDTO;
import com.finboostplus.model.Expense;
import com.finboostplus.model.Group;
import com.finboostplus.projection.ExpenseProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public interface ExpenseRepository extends JpaRepository<Expense,Long> {

    @Query(nativeQuery = true, value = """
            SELECT   expenses.id, expenses.title,	expenses.description,
                       	 categories.name as categoryName,
                         COALESCE(SUM(expenses.value), 0) AS total
                         FROM group_members
                         INNER JOIN groups ON group_members.group_id = groups.id
                         INNER JOIN users ON group_members.user_id = users.id
                         LEFT JOIN expenses ON expenses.group_id = groups.id
                          INNER JOIN categories ON categories.id = expenses.category_id
                         WHERE users.id =:memberId
                         AND groups.id = :groupId
                         GROUP BY expenses.id,categories.name
     """)
   List<ExpenseProjection>  listExpensesGroupById(Long memberId, Long groupId);
}
