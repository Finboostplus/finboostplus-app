package com.finboostplus.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("FinBoost Plus API")
                        .description("""
                            # API para Gerenciamento Financeiro Pessoal
                            
                            A **FinBoost Plus API** oferece funcionalidades completas para controle financeiro pessoal, 
                            incluindo gerenciamento de gastos, grupos colaborativos e análises financeiras avançadas.
                            
                            ## Funcionalidades Principais
                            
                            - **Gestão de Usuários**: Cadastro, autenticação e perfis personalizados
                            - **Controle de Gastos**: Registro e categorização de despesas
                            - **Grupos Colaborativos**: Compartilhamento de gastos em grupo
                            - **Análises Financeiras**: Relatórios e insights sobre seus gastos
                            - **Personalização**: Temas de cores e preferências do usuário
                            
                            ## Autenticação
                            
                            Esta API utiliza **JWT (JSON Web Tokens)** para autenticação segura. 
                            Para usar endpoints protegidos:
                            
                            1. Faça login para obter seu token JWT
                            2. Clique no botão "Authorize" acima
                            3. Insira: `Bearer seu_token_aqui`
                            4. Teste os endpoints protegidos!
                            
                            ## Como Usar
                            
                            1. **Cadastre-se** usando o endpoint `POST /user`
                            2. **Autentique-se** para obter seu token JWT
                            3. **Explore** os endpoints disponíveis
                            4. **Teste** diretamente nesta interface!
                            """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("FinBoost Plus Team")
                                .email("contato@finboostplus.com")
                                .url("https://finboostplus.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor de Desenvolvimento"),
                        new Server()
                                .url("https://api.finboostplus.com")
                                .description("Servidor de Produção")
                ))
                .externalDocs(new ExternalDocumentation()
                        .description("Documentação Completa do Projeto")
                        .url("https://github.com/finboostplus/docs"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Token JWT para autenticação. Formato: Bearer {token}")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
