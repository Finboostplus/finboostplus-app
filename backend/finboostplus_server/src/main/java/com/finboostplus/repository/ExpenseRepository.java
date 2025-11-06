package com.finboostplus.repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finboostplus.DTO.CategoryRegisterDTO;
import com.finboostplus.DTO.UserExpensesDTO;
import com.finboostplus.model.Expense;
import com.finboostplus.projection.GroupAuthorityExpenseProjection;
import com.finboostplus.projection.GroupMemberExpenseProjection;
import com.finboostplus.projection.UserExpenseDivisionProjection;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	@Query(nativeQuery = true, value = """
			SELECT
				E.ID AS EXPENSE_ID,
				E.TITLE,
				E.CREATED_AT,
				E.DEADLINE_DATE,
				C.NAME AS CATEGORY,
				E.DESCRIPTION,
				E.STATUS,
				UED.PARTIAL_VALUE,
				G.ID AS GROUP_ID,
				G.NAME AS GROUP_NAME
			FROM
				EXPENSES AS E
				INNER JOIN GROUPS G ON G.ID = E.GROUP_ID
				INNER JOIN USER_EXPENSE_DIVISIONS UED ON UED.EXPENSE_ID = E.ID
				INNER JOIN CATEGORIES C ON C.ID = E.CATEGORY_ID
			WHERE
				UED.USER_ID = :userId
			""")
	Page<UserExpensesDTO> getAllUserExpenses(Long userId, Pageable pageable);

	// @Query(nativeQuery = true, value = """
	// SELECT expenses.id, expenses.title, expenses.description,
	// categories.name as categoryName,
	// COALESCE(SUM(expenses.value), 0) AS total
	// FROM group_members
	// INNER JOIN groups ON group_members.group_id = groups.id
	// INNER JOIN users ON group_members.user_id = users.id
	// LEFT JOIN expenses ON expenses.group_id = groups.id
	// INNER JOIN categories ON categories.id = expenses.category_id
	// WHERE users.id =:memberId
	// AND groups.id = :groupId
	// GROUP BY expenses.id,categories.name
	// """)
	// List<ExpenseProjection> listExpensesGroupById(Long memberId, Long groupId);

	@Query(nativeQuery = true, value = """
			SELECT
				COUNT(C.ID) AS QUANTITY,
				C.NAME AS CATEGORY
			FROM
				CATEGORIES C
				INNER JOIN EXPENSES E ON E.CATEGORY_ID = C.ID
				INNER JOIN USER_EXPENSE_DIVISIONS UED ON UED.EXPENSE_ID = E.ID
			WHERE
				UED.USER_ID = :userId
			GROUP BY
				C.ID,
				C.NAME
			ORDER BY
				QUANTITY DESC
			""")
	List<CategoryRegisterDTO> getExpensesByCategory(Long userId);

	@Query(nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions", value = """
			SELECT
				E.ID AS EXPENSE_ID,
				E.TITLE AS TITLE,
				G.ID AS GROUP_ID,
				G.NAME AS GROUP_NAME,
				UED.PARTIAL_VALUE AS PARTIAL_VALUE,
				C.ID AS CATEGORY_ID,
				C.Name AS CATEGORY_NAME,
				E.STATUS AS STATUS,
				E.DEADLINE_DATE AS DEADLINE_DATE,
				G.ICON
			FROM
				EXPENSES E
				INNER JOIN USER_EXPENSE_DIVISIONS UED ON UED.EXPENSE_ID = E.ID
				INNER JOIN GROUPS G ON G.ID = E.GROUP_ID
				INNER JOIN CATEGORIES C ON C.ID = E.CATEGORY_ID
			WHERE
				G.ID = :groupId
				AND UED.USER_ID = :memberId
			ORDER BY
			    CASE
					WHEN E.DEADLINE_DATE < NOW() THEN 1
					WHEN DATE(E.DEADLINE_DATE) = DATE(NOW()) THEN 2
					WHEN E.DEADLINE_DATE > NOW() THEN 3
					ELSE 4
			    END,
			    E.DEADLINE_DATE ASC
			""")
	Page<GroupMemberExpenseProjection> getAllGroupExpenses(Long memberId, Long groupId, Pageable pageable);

	@Query(nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions", value = """
			SELECT
				E.ID AS EXPENSE_ID,
				E.TITLE AS TITLE,
				G.ID AS GROUP_ID,
				G.NAME AS GROUP_NAME,
				UED.PARTIAL_VALUE AS PARTIAL_VALUE,
				C.ID AS CATEGORY_ID,
				C.Name AS CATEGORY_NAME,
				E.STATUS AS STATUS,
				E.DEADLINE_DATE AS DEADLINE_DATE,
				G.ICON
			FROM
				EXPENSES E
				INNER JOIN USER_EXPENSE_DIVISIONS UED ON UED.EXPENSE_ID = E.ID
				INNER JOIN GROUPS G ON G.ID = E.GROUP_ID
				INNER JOIN CATEGORIES C ON C.ID = E.CATEGORY_ID
			WHERE
				G.ID = :groupId
				AND UED.USER_ID = :memberId
				AND UED.STATUS = :status
			ORDER BY
			    CASE
			        WHEN E.DEADLINE_DATE < NOW() THEN 1
			        WHEN DATE(E.DEADLINE_DATE) = DATE(NOW()) THEN 2
			        WHEN E.DEADLINE_DATE > NOW() THEN 3
			        ELSE 4
			    END,
			    E.DEADLINE_DATE ASC
						""")
	Page<GroupMemberExpenseProjection> getAllGroupExpensesFiltered(Long memberId, Long groupId, String status,
			Pageable pageable);

	@Query(nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions", value = """
			SELECT
				E.ID AS EXPENSE_ID,
				E.TITLE AS TITLE,
				G.ID AS GROUP_ID,
				G.NAME AS GROUP_NAME,
				COALESCE(UED_USER.PARTIAL_VALUE, 0) AS PARTIAL_VALUE,
				C.ID AS CATEGORY_ID,
				C.Name AS CATEGORY_NAME,
				COALESCE(E.VALUE, 0) AS TOTAL,
				COALESCE(E.VALUE, 0) - COALESCE(UED_PAID.TOTAL_PAID, 0) AS REMAINING_VALUE,
				E.DEADLINE_DATE AS DEADLINE_DATE,
				G.ICON,
				E.STATUS AS STATUS
			FROM EXPENSES E
			INNER JOIN GROUPS G ON G.ID = E.GROUP_ID
			INNER JOIN CATEGORIES C ON C.ID = E.CATEGORY_ID

			LEFT JOIN (
				SELECT EXPENSE_ID, PARTIAL_VALUE, STATUS, USER_ID
				FROM USER_EXPENSE_DIVISIONS
				WHERE USER_ID = :userId
			) UED_USER ON UED_USER.EXPENSE_ID = E.ID

			LEFT JOIN (
				SELECT EXPENSE_ID, SUM(PARTIAL_VALUE) AS TOTAL_PAID
				FROM USER_EXPENSE_DIVISIONS
				WHERE STATUS = 'PAID'
				GROUP BY EXPENSE_ID
			) UED_PAID ON UED_PAID.EXPENSE_ID = E.ID

			WHERE G.ID = :groupId

			ORDER BY
			    CASE
			        WHEN E.DEADLINE_DATE < NOW() THEN 1
			        WHEN DATE(E.DEADLINE_DATE) = DATE(NOW()) THEN 2
			        WHEN E.DEADLINE_DATE > NOW() THEN 3
			        ELSE 4
			    END,
			    E.DEADLINE_DATE ASC
									""")
	Page<GroupAuthorityExpenseProjection> getAllGroupExpensesOfAllMembers(Long userId, Long groupId,
			Pageable pageable);

	@Query(nativeQuery = true, countQuery = "Select count(*) from user_expense_divisions", value = """
			SELECT
				E.ID AS EXPENSE_ID,
				E.TITLE AS TITLE,
				G.ID AS GROUP_ID,
				G.NAME AS GROUP_NAME,
				COALESCE(UED_USER.PARTIAL_VALUE, 0) AS PARTIAL_VALUE,
				C.ID AS CATEGORY_ID,
				C.Name AS CATEGORY_NAME,
				COALESCE(E.VALUE, 0) AS TOTAL,
				COALESCE(E.VALUE, 0) - COALESCE(UED_PAID.TOTAL_PAID, 0) AS REMAINING_VALUE,
				E.DEADLINE_DATE AS DEADLINE_DATE,
				G.ICON,
				E.STATUS AS STATUS
			FROM EXPENSES E
			INNER JOIN GROUPS G ON G.ID = E.GROUP_ID
			INNER JOIN CATEGORIES C ON C.ID = E.CATEGORY_ID

			LEFT JOIN (
				SELECT EXPENSE_ID, PARTIAL_VALUE, STATUS, USER_ID
				FROM USER_EXPENSE_DIVISIONS
				WHERE USER_ID = :memberId
			) UED_USER ON UED_USER.EXPENSE_ID = E.ID

			LEFT JOIN (
				SELECT EXPENSE_ID, SUM(PARTIAL_VALUE) AS TOTAL_PAID
				FROM USER_EXPENSE_DIVISIONS
				WHERE STATUS = 'PAID'
				GROUP BY EXPENSE_ID
			) UED_PAID ON UED_PAID.EXPENSE_ID = E.ID

			WHERE G.ID = :groupId
			AND (UED_USER.STATUS = :status
			OR UED_USER.STATUS IS NULL)

			ORDER BY
			    CASE
			        WHEN E.DEADLINE_DATE < NOW() THEN 1
			        WHEN DATE(E.DEADLINE_DATE) = DATE(NOW()) THEN 2
			        WHEN E.DEADLINE_DATE > NOW() THEN 3
			        ELSE 4
			    END,
			    E.DEADLINE_DATE ASC
			""")
	Page<GroupAuthorityExpenseProjection> getAllGroupExpensesOfAllMembersFiltered(Long memberId, Long groupId,
			String status,
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
	boolean doesMemberHasPendingExpenses(Long memberId, Long groupId);

	@Query(nativeQuery = true, value = """
			SELECT  UD.USER_ID AS USERID,
				U.USER_NAME AS USERNAME,
				UD.PARTIAL_VALUE AS PARTIALVALUE,
				UD.STATUS
			FROM EXPENSES E
			INNER JOIN USER_EXPENSE_DIVISIONS UD ON E.ID = UD.EXPENSE_ID
			INNER JOIN USERS U ON U.ID = UD.USER_ID
			WHERE E.GROUP_ID = :groupId AND e.id = :expenseId
			""")
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

	@Modifying
	@Query(value = """
			DELETE FROM expenses
			WHERE id = :expenseId
			""", nativeQuery = true)
	void deleteExpenseById(@Param("expenseId") Long expenseId);

	@Query(value = """
			SELECT * FROM expenses
			WHERE deadline_date BETWEEN :creatAt AND :deadlineDate
			AND status != 'PAID'
			""", nativeQuery = true)
	List<Expense> findByExpirationDateBetween(
			@Param("creatAt") Instant creatAt,
			@Param("deadlineDate") LocalDate deadlineDate);
}
