package com.finboostplus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.model.User;
import com.finboostplus.service.UserService;



@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService service;
	
	@PostMapping()
	public ResponseEntity salvar(@RequestBody UserRequestDTO user) {
		
		User userEntity = new User();
		userEntity  = user.toUser();
		
		var userControle = service.salvar(userEntity);
		
		if(userControle != null) {
		
		 return new ResponseEntity(HttpStatus.OK);
			
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);	 
		
		
	}
}