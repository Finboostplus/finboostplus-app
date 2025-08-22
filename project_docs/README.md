# 🗂️ Project Docs - FinBoost+

<div align="center">
  <img src="https://img.shields.io/badge/Planejamento-MVP,_Personas,_Roadmap-6A1B9A" alt="Planejamento">
  <img src="https://img.shields.io/badge/Arquitetura-Diagramas-1565C0" alt="Arquitetura">
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow" alt="Status">
</div>

Repositório de artefatos de planejamento e apoio ao desenvolvimento: MVP, personas, user stories; diagramas (arquitetura, ER, casos de uso, etc.) e wireframes. Serve como fonte dos documentos de alto nível que embasam a documentação técnica em `docs/`.

---

## 📚 Sumário

<details>
<summary><strong>Clique para expandir</strong></summary>

- [🗂️ Project Docs - FinBoost+](#️-project-docs---finboost)
    - [📚 Sumário](#-sumário)
    - [🚀 Visão Geral](#-visão-geral)
    - [📁 Estrutura](#-estrutura)
    - [🧩 Conteúdos](#-conteúdos)
    - [📝 Boas práticas de versionamento](#-boas-práticas-de-versionamento)
    - [🔄 Fluxo entre project\_docs → docs](#-fluxo-entre-project_docs--docs)
    - [🤝 Contribuindo](#-contribuindo)
    - [📎 Créditos \& Licenças](#-créditos--licenças)
    - [📞 Suporte](#-suporte)
</details>

---

## 🚀 Visão Geral

- Consolidar documentos de produto/planejamento e artefatos visuais
- Servir de base única para conteúdos consumidos e publicados em `docs/`
- Manter histórico e versões editáveis (originais) dos diagramas

---

## 📁 Estrutura

```
project_docs/
├── documentos/                   # Conteúdo de planejamento (texto)
│   ├── mvp.md
│   ├── personas.md
│   ├── user_stories.md
│   ├── documento_requisitos.md
│   └── api_contract.md           # (espelho/rascunho do contrato)
├── diagramas/                    # Imagens exportadas (PNG/SVG)
│   ├── diagrama_classes.png
│   ├── diagrama_ER.png
│   └── diagrama_uses_cases.png
├── testes_api/                   # orientações para testes com Postman 
└── prototipos/                   # Wireframes/mockups
    ├── finboostplus-wireframe_01.jpg
    └── ...
```

---

## 🧩 Conteúdos

- MVP: escopo mínimo funcional e critérios de aceitação
- Personas: perfis de usuários e principais necessidades
- User Stories: histórias priorizadas (pode incluir Gherkin)
- Requisitos: funcionais e não-funcionais
- Contrato de API: rascunhos e decisões
- Diagramas: visão de arquitetura, ER, casos de uso e classes
- Prototipação: wireframes e fluxos principais
- Testes API: coleção Postman para endpoints documentados

---

## 📝 Boas práticas de versionamento

- Prefira arquivos de texto (Markdown) quando possível
- Diagramas: mantenha o arquivo editável + PNG/SVG exportado
- Nomeie arquivos em `kebab-case` e com sufixos de versão quando relevante
- Evite binários grandes em PRs sem necessidade; compacte se possível

---

## 🔄 Fluxo entre project_docs → docs

1) Crie/atualize o artefato fonte em `project_docs/`
2) Exporte imagens otimizadas (PNG/SVG) para `docs/assets/images/` quando forem usadas na documentação
3) Atualize as páginas em `docs/` que referenciam o material (ex.: `docs/project/diagrams.md`)
4) Ajuste a navegação em `mkdocs.yml` se adicionar novas páginas

Dica: use nomes consistentes para facilitar a referência (ex.: `diagrama-er.png`).

---

## 🤝 Contribuindo

- Siga as convenções do repositório (`CONTRIBUTING.md`)
- Garanta que alterações em artefatos aqui refletirão em `docs/` quando apropriado
- Adicione contexto nas PRs (print dos diagramas, link para páginas afetadas)

---

## 📎 Créditos & Licenças

- Verifique `LICENSE` do repositório para termos de uso
- Ao utilizar imagens/recursos de terceiros, inclua referência e licença

---

## 📞 Suporte

- Issues: https://github.com/Finboostplus/finboostplus-app/issues
- Docs publicadas: https://finboostplus.github.io/finboostplus-app/
- Email: finboostplus@gmail.com

---

<div align="center">
  <strong>🗂️ Documentos do Projeto - FinBoost+</strong><br/>
  <em>Desenvolvido pelo Grupo 7 - +Prati & Codifica</em>
</div>
