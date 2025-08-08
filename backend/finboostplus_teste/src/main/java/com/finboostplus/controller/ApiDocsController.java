package com.finboostplus.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ApiDocsController {

    @GetMapping(value = "/docs/scalar", produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public String scalarDocs() {
        return """
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>FinBoost Plus API - Documentação</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background-color: #f8f9fa;
                    }
                    .loading {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-size: 18px;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="loading" id="loading">Carregando documentação da API...</div>
                <div id="scalar-container"></div>
                
                <script>
                    // Fallback caso o CDN principal falhe
                    function loadScalar() {
                        const script = document.createElement('script');
                        script.id = 'api-reference';
                        script.setAttribute('data-url', '/v3/api-docs');
                        script.setAttribute('data-configuration', JSON.stringify({
                            theme: 'kepler',
                            layout: 'modern',
                            showSidebar: true,
                            hideDownloadButton: false,
                            searchHotKey: 'k',
                            authentication: {
                                preferredSecurityScheme: 'bearerAuth'
                            }
                        }));
                        
                        const container = document.getElementById('scalar-container');
                        container.appendChild(script);
                        
                        const scalarScript = document.createElement('script');
                        scalarScript.src = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest';
                        scalarScript.onload = function() {
                            document.getElementById('loading').style.display = 'none';
                        };
                        scalarScript.onerror = function() {
                            document.getElementById('loading').innerHTML = 
                                'Erro ao carregar Scalar. <a href="/swagger-ui.html">Usar Swagger UI</a>';
                        };
                        document.head.appendChild(scalarScript);
                    }
                    
                    // Carrega após DOM estar pronto
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', loadScalar);
                    } else {
                        loadScalar();
                    }
                </script>
            </body>
            </html>
            """;
    }
}
