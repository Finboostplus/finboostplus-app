package com.finboostplus.DTO;

import com.finboostplus.model.User;

import java.util.Base64;

public record UserDataDTO(
		String name,

		String email,

		String themeColor,

        String imageBase64

     ) {
    public UserDataDTO(User user) {
        this(
                user.getName(),
                user.getUsername(),
                user.getThemeColor(),
                (user.getImagem() != null)? Base64.getEncoder().encodeToString(user.getImagem()):null);
    }
}
