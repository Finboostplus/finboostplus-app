package com.finboostplus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finboostplus.model.*;

@Repository
public interface UserRepository  extends JpaRepository<User, Long>  {

}
