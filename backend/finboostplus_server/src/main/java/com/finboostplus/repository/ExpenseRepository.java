package com.finboostplus.repository;

import com.finboostplus.DTO.ExpenseDTO;
import com.finboostplus.DTO.GroupExpenseDTO;
import com.finboostplus.enums.Status;
import com.finboostplus.model.Expense;
import com.finboostplus.model.Group;
import com.finboostplus.projection.ExpenseProjection;
import com.finboostplus.projection.GroupExpenseProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public interface ExpenseRepository extends JpaRepository<Expense,Long> {

    @Query(nativeQuery = true, value = """
        SELECT expenses.id, expenses.title,	expenses.description,
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
   @Query(value = """
       SELECT
           e.id AS id,
           e.title AS title,
           ued.partial_value AS value,
           ued.status AS status,
           e.deadline_date AS deadline_date
       FROM expenses e
       INNER JOIN user_expense_divisions ued ON ued.expense_id = e.id
       INNER JOIN groups g ON g.id = e.group_id
       INNER JOIN users u ON u.id = ued.user_id
       WHERE g.id = :groupId
         AND u.id = :memberId
       ORDER BY
           CASE
               WHEN e.deadline_date < NOW() THEN 3
               WHEN e.deadline_date >= NOW() THEN 2
               ELSE 1
           END,
           e.deadline_date ASC
       """, nativeQuery = true)
   List<GroupExpenseProjection> getAllGroupExpenses(Long memberId, Long groupId);


   @Query(nativeQuery = true, value = """
           SELECT 
               e.id AS id,
               e.title AS title,
               ued.partial_value AS value,
               ued.status AS status,
               e.deadline_date AS deadline_date
           FROM expenses e
           INNER JOIN user_expense_divisions ued ON ued.expense_id = e.id
           INNER JOIN groups g ON g.id = e.group_id
           INNER JOIN users u ON u.id = ued.user_id
           WHERE g.id = :groupId 
             AND u.id = :memberId 
             AND ued.status = :status
           ORDER BY 
               CASE 
                   WHEN e.deadline_date < NOW() THEN 3  
                   WHEN e.deadline_date >= NOW() THEN 2 
                   ELSE 1                               
               END,
               e.deadline_date ASC
           """)
   List<GroupExpenseProjection> getAllGroupExpensesFiltered(Long memberId, Long groupId, String status);


   @Query(nativeQuery = true, value = """
         SELECT
            e.id AS id,
            e.title AS title,
            e.value AS value,
            e.status AS status,
            e.deadline_date AS deadline_date
         FROM expenses e
         INNER JOIN user_expense_divisions ued ON ued.expense_id = e.id
         INNER JOIN groups g ON g.id = e.group_id
         INNER JOIN users u ON u.id = ued.user_id
         WHERE g.id = :groupId
            GROUP BY e.id, e.title, e.value, e.status, e.deadline_date
               ORDER BY
               CASE
               WHEN e.deadline_date < NOW() THEN 3
               WHEN e.deadline_date >= NOW() THEN 2
               ELSE 1
               END,
            e.deadline_date ASC;
           """)
   List<GroupExpenseProjection> getAllGroupExpensesOfAllMembers(Long groupId);

   @Query(nativeQuery = true, value = """
         SELECT
            e.id AS id,
            e.title AS title,
            e.value AS value,
            e.status AS status,
            e.deadline_date AS deadline_date
         FROM expenses e
         INNER JOIN user_expense_divisions ued ON ued.expense_id = e.id
         INNER JOIN groups g ON g.id = e.group_id
         INNER JOIN users u ON u.id = ued.user_id
         WHERE g.id = :groupId
         AND ued.status = :status
            GROUP BY e.id, e.title, e.value, e.status, e.deadline_date
            ORDER BY
               CASE
                  WHEN e.deadline_date < NOW() THEN 3
                  WHEN e.deadline_date >= NOW() THEN 2
                  ELSE 1
               END,
            e.deadline_date ASC;
         """)
   List<GroupExpenseProjection> getAllGroupExpensesOfAllMembersFiltered(Long memberId, Long groupId, String status);
}
