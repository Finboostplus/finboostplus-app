package com.finboostplus.repository;

import com.finboostplus.DTO.ExpenseDTO;
import com.finboostplus.DTO.GroupExpenseDTO;
import com.finboostplus.enums.Status;
import com.finboostplus.model.Expense;
import com.finboostplus.model.Group;
import com.finboostplus.projection.ExpenseProjection;
import com.finboostplus.projection.GroupExpenseProjection;
import com.finboostplus.projection.UserExpenseDivisionProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

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
        List<ExpenseProjection> listExpensesGroupById(Long memberId, Long groupId);

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
                        """, nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions")
        Page<GroupExpenseProjection> getAllGroupExpenses(Long memberId, Long groupId, Pageable pageable);

        @Query(nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions", value = """
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
        Page<GroupExpenseProjection> getAllGroupExpensesFiltered(Long memberId, Long groupId, String status,
                        Pageable pageable);

        @Query(nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions", value = """
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
        Page<GroupExpenseProjection> getAllGroupExpensesOfAllMembers(Long groupId, Pageable pageable);

        @Query(nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions", value = """
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
        Page<GroupExpenseProjection> getAllGroupExpensesOfAllMembersFiltered(Long memberId, Long groupId, String status,
                        Pageable pageable);

        @Modifying
        @Query(value = """
                        UPDATE user_expense_divisions
                        SET status = :status
                        WHERE expense_id = :expenseId
                        AND status != 'PAID'
                        """, nativeQuery = true)
        void updateExpenseStatus(@Param("expenseId") Long expenseId, @Param("status") String status);

        @Modifying
        @Query(value = """
                        UPDATE expenses
                        SET status = :status
                        WHERE id = :expenseId
                        """, nativeQuery = true)
        void setPaidExpense(@Param("expenseId") Long expenseId, @Param("status") String status);

        @Query(value = """
                        SELECT EXISTS(
                           SELECT 1
                           FROM user_expense_divisions ued
                           INNER JOIN expenses e ON ued.expense_id = e.id
                           WHERE e.group_id = :groupId
                             AND ued.user_id = :memberId
                             AND (ued.status = 'PENDING' OR ued.status = 'UNPAID')
                        )
                        """, nativeQuery = true)
        boolean memberHasPendingExpenses(Long memberId, Long groupId);

    @Query(value = """
           SELECT ud.user_id as userId, 
                 u.user_name as UserName ,
           	   ud.partial_value as partialValue,
           	   ud.status
           FROM expenses e
           INNER JOIN user_expense_divisions ud
           ON e.id = ud.expense_id
           INNER JOIN users u
           ON u.id = ud.user_id
           where e.group_id =:groupId and e.id =:expenseId;
           """, nativeQuery = true)
    List<UserExpenseDivisionProjection> listUsersExpenseDivision(Long groupId, Long expenseId);
        @Query(value = """
                        SELECT EXISTS(
                           SELECT 1
                              FROM expenses e WHERE e.group_id = :groupId AND (e.status = 'PENDING' OR e.status = 'UNPAID')
                           )
                        """, nativeQuery = true)
        boolean groupHasPendingExpenses(Long groupId);

        @Query(value = """
                        SELECT EXISTS(
                           SELECT 1
                              FROM user_expense_divisions e WHERE e.expense_id = :expenseId AND (e.status = 'PENDING' OR e.status = 'UNPAID')
                           )
                        """, nativeQuery = true)
        boolean isExpensePaid(Long expenseId);
}
