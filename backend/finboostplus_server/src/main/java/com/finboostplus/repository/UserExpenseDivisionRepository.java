package com.finboostplus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.finboostplus.model.UserExpenseDivision;

@Repository
public interface UserExpenseDivisionRepository extends JpaRepository<UserExpenseDivision, Long> {
        @Modifying
        @Query(value = """
                        DELETE FROM user_expense_divisions
                        WHERE user_id = :memberId
                        """, nativeQuery = true)
        void deleteExpenseRelationByMemberId(@Param("memberId") Long groupId);

        @Query(nativeQuery = true, value = """
                           SELECT EXISTS(
                                SELECT 1 from user_expense_divisions
                                where user_id = :memberId and
                                (status = 'UNPAID' or status = 'PENDING')
                           )
                        """)
        boolean hasUserAnyExpense(long memberId);

        @Query(nativeQuery = true, value = """
                        SELECT * FROM user_expense_divisions WHERE user_id = :userId AND expense_id = :expenseId
                            """)
        UserExpenseDivision findByExpenseIdAndGroupId(Long userId, Long expenseId);

        @Query(nativeQuery = true, value = """
                        SELECT EXISTS (
                                SELECT 1 FROM user_expense_divisions u WHERE u.user_id = :userId AND u.expense_id = :expenseId
                        )
                        """)
        boolean existsByUserIdAndExpenseId(Long userId, Long expenseId);
}
