package com.finboostplus.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Configuração de segurança específica para permitir acesso ao H2 Console
 * em ambiente de teste.
 */
@Configuration
@EnableWebSecurity
@Profile("test")
public class H2SecurityConfig {

    /**
     * Configuração de segurança para o H2 Console.
     * Esta configuração tem prioridade alta (@Order(1)) para ser aplicada
     * antes das configurações gerais de segurança.
     */
    @Bean
    @Order(1)
    public SecurityFilterChain h2ConsoleSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Aplica apenas para rotas do H2 Console
                .securityMatcher(
                        AntPathRequestMatcher.antMatcher("/h2-console/**")
                )
                // Permite acesso livre ao H2 Console
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers(
                                AntPathRequestMatcher.antMatcher("/h2-console/**")
                        ).permitAll()
                )
                // Desabilita CSRF para H2 Console (necessário para funcionar)
                .csrf(csrf ->
                        csrf.ignoringRequestMatchers(
                                AntPathRequestMatcher.antMatcher("/h2-console/**")
                        )
                )
                // Permite frames para H2 Console (interface web usa frames)
                .headers(headers ->
                        headers.frameOptions().sameOrigin()
                )
                .build();
    }

    /**
     * Configuração de segurança geral para outras rotas no perfil de teste.
     * Esta configuração tem prioridade menor (@Order(2)) e será aplicada
     * após a configuração do H2 Console.
     */
    @Bean
    @Order(2)
    public SecurityFilterChain testSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Aplica para todas as outras rotas
                .securityMatcher("/**")
                .authorizeHttpRequests(auth -> auth
                        // Permite acesso aos endpoints de documentação
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        // Permite acesso aos recursos estáticos
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        // Outras rotas requerem autenticação
                        .anyRequest().authenticated()
                )
                // Configuração OAuth2 Resource Server (se necessário)
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> {
                }))
                .build();
    }
}