package com.finboostplus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finboostplus.model.User;
import com.finboostplus.repository.UserRepository;




@Service
public class UserService {

	@Autowired
	UserRepository repository;
	
	public User salvar(User user) {
		
		return repository.save(user);
	}
}
