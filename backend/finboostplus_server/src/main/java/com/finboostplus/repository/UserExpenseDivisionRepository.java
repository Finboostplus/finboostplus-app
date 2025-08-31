package com.finboostplus.repository;
import com.finboostplus.model.UserExpenseDivision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExpenseDivisionRepository extends JpaRepository<UserExpenseDivision,Long> {
}
