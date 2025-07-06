document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });

  // Validação do formulário
  const form = document.getElementById("contactForm");

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("error");
      field.parentElement.querySelector(".error-msg").textContent = "";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    function showError(field, msg) {
      field.classList.add("error");
      field.parentElement.querySelector(".error-msg").textContent = msg;
      isValid = false;
    }

    const nome = form.name.value.trim();
    if (nome.length < 3)
      showError(form.name, "Nome deve ter pelo menos 3 caracteres.");

    const email = form.email.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) showError(form.email, "E-mail inválido.");

    const mensagem = form.message.value.trim();
    if (mensagem.length < 10)
      showError(form.message, "Mensagem deve ter pelo menos 10 caracteres.");

    if (isValid) {
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = "Enviando...";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = "Mensagem Enviada! ✓";
        button.style.background = "#10b981";
        setTimeout(() => {
          alert(
            "Mensagem enviada com sucesso! Em breve entraremos em contato."
          );
          form.reset();
          button.textContent = originalText;
          button.disabled = false;
          button.style.background = "";
        }, 2000);
      }, 1000);
    }
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.querySelectorAll(".feature-card").forEach((el) => {
    observer.observe(el);
  });
});
