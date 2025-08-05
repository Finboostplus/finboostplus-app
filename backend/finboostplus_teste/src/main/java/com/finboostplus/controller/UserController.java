package com.finboostplus.controller;

import com.finboostplus.DTO.UserRequestDTO;
import com.finboostplus.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService service;

	@PostMapping
	public ResponseEntity<String> saveProfile(@Valid @RequestBody UserRequestDTO dto){
		boolean userIsSaved = service.saveUser(dto);
		if(userIsSaved){
			return new ResponseEntity<>("Cadastro feito com sucesso!", HttpStatus.CREATED);
		}return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/whoareyou")
	public String getReturnAuthorized(){
		return authenticated();
	}


	@PreAuthorize("hasRole('OWNER')")
	@GetMapping("/no")
	public String getReturnNotAuthorized(){
		return "Aqui não está autorizado!";
	}


	private String authenticated(){
		try{
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Jwt jwtPrincipal = (Jwt) authentication.getPrincipal();
			String email = jwtPrincipal.getClaim("username");
			return "O usuário logado possui o e-mail: "+email;
		}catch(Exception e){
			throw new UsernameNotFoundException("Não foi encontrado o usuário");
		}
	}

}