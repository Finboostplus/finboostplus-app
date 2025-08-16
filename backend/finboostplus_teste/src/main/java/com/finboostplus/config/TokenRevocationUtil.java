package com.finboostplus.config;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;

public class TokenRevocationUtil {
    public static void revokeCurrentUserTokens(
            OAuth2AuthorizationService authorizationService) {

        // 1. Recuperar token do SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new IllegalStateException("Usuário não autenticado");
        }

        String tokenValue = null;
        if (authentication.getCredentials() instanceof Jwt) {
            // Caso o Spring Security tenha colocado o Jwt como credentials
            tokenValue = ((Jwt) authentication.getCredentials()).getTokenValue();
        } else if (authentication.getCredentials() instanceof String) {
            // Caso tenha só a string do token
            tokenValue = (String) authentication.getCredentials();
        }

        if (tokenValue == null) {
            throw new IllegalStateException("Token JWT não encontrado");
        }

        // 2. Buscar autorização
        OAuth2Authorization authorization = authorizationService.findByToken(
                tokenValue,
                OAuth2TokenType.ACCESS_TOKEN
        );

        if (authorization != null) {
            // 3. Revogar (remove também o refresh token associado)
            authorizationService.remove(authorization);
        }
    }
}
