package com.finboostplus.DTO;

import com.finboostplus.model.User;

public record UserRequestDTO(String name,
		String email,
		String password) {

public User toUser() {

User user = new User();

user.setName(this.name);
user.setEmail(this.email);
user.setPassword(this.password);

return user;

}
}
