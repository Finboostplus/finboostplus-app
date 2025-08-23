package com.finboostplus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Configuração principal de segurança do sistema.
 * <p>
 * Esta configuração é aplicada a todas as rotas exceto:
 * - H2 Console (gerenciado por H2SecurityConfig em ambiente test)
 * - Rotas públicas definidas aqui
 * <p>
 * Order(2) garante que seja aplicada após configurações específicas como H2.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class ResourceServerConfig {

    /**
     * Filter chain principal da aplicação
     * Aplica OAuth2 Resource Server para rotas protegidas
     */
    @Bean
    @Order(2)
    public SecurityFilterChain mainSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Aplica a TODAS as rotas exceto H2 Console
                .securityMatcher(request ->
                        !request.getRequestURI().startsWith("/h2-console")
                )
                // Desabilita CSRF para APIs REST
                .csrf(csrf -> csrf.disable())
                // Configuração de autorização
                .authorizeHttpRequests(authorize -> authorize
                        // === ROTAS PÚBLICAS ===
                        // Cadastro de usuário (POST /user)
                        .requestMatchers(AntPathRequestMatcher.antMatcher("POST", "/user")).permitAll()

                        // Documentação da API
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/docs/**",
                                "/scalar",
                                "/scalar/**"
                        ).permitAll()

                        // === ROTAS PROTEGIDAS ===
                        // Todas as outras rotas exigem autenticação
                        .anyRequest().authenticated()
                )
                // Configuração OAuth2 Resource Server (JWT)
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(Customizer.withDefaults())
                )
                // Habilita CORS
                .cors(Customizer.withDefaults())
                .build();
    }

    /**
     * Configuração do conversor de JWT para extrair authorities
     */
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthoritiesClaimName("authorities");
        grantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }
}
