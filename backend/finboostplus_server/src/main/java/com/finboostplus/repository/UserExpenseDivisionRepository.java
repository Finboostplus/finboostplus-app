package com.finboostplus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finboostplus.model.User;
import com.finboostplus.model.UserExpenseDivision;

@Repository
public interface UserExpenseDivisionRepository extends JpaRepository<UserExpenseDivision, Long> {
        @Query(nativeQuery = true, value = """
                        SELECT EXISTS(
                             SELECT 1 from user_expense_divisions
                             where user_id = :memberId and
                             (status = 'UNPAID' or status = 'PENDING')
                        )
                        """)
        boolean doesUserHasAnyExpense(@Param("memberId") long memberId);

        @Query(nativeQuery = true, value = """
                        SELECT * FROM user_expense_divisions WHERE user_id = :userId AND expense_id = :expenseId
                            """)
        UserExpenseDivision findByMemberIdAndExpenseId(@Param("userId")Long userId, @Param("expenseId") Long expenseId);

        @Query(nativeQuery = true, value = """
                        SELECT EXISTS (
                                SELECT 1 FROM user_expense_divisions u WHERE u.user_id = :userId AND u.expense_id = :expenseId
                        )
                        """)
        boolean existsByUserIdAndExpenseId(@Param("userId") Long userId, @Param("expenseId") Long expenseId);

        @Query(nativeQuery = true, value = """
                        SELECT EXISTS(
                           SELECT 1
                              FROM user_expense_divisions e WHERE e.expense_id = :expenseId AND (e.status = 'PENDING' OR e.status = 'UNPAID')
                           )
                        """)
        boolean isExpensePaid(@Param("expenseId") Long expenseId);

        @Query(nativeQuery = true, value = """
                        SELECT * from users WHERE id in
                                ( SELECT user_id from user_expense_divisions WHERE expense_id = :expenseId AND status != 'PAID' )
                                """)
        List<User> findUserByExpenseId(@Param("expenseId") Long expenseId);

        @Modifying
        @Query(value = """
                        UPDATE user_expense_divisions
                        SET status = 'UNPAID'
                        WHERE expense_id = :expenseId
                          AND status = 'PENDING'
                        """, nativeQuery = true)
        void markDivisionAsUnpaid(@Param("expenseId") Long expenseId);


    @Modifying
        @Query(nativeQuery = true, value = """
                        DELETE FROM user_expense_divisions ued
                        WHERE expense_id = :expenseId
                        """)
        void deleteExpenseById(@Param("expenseId") Long expenseId);

        @Modifying
        @Query(nativeQuery = true, value = """
                        DELETE FROM user_expense_divisions
                        WHERE user_id = :memberId
                        """)
        void deleteExpenseRelationByMemberId(@Param("memberId") Long memberId);
}
