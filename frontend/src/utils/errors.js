// Classe base para erros de aplicação
export class AppError extends Error {
  constructor(
    message,
    status = 500,
    statusText = 'Erro inesperado',
    btn = { label: 'Voltar ao início', path: '/' }
  ) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.statusText = statusText;
    this.btn = btn;
  }

  // 🔁 Método estático para interpretar diferentes tipos de erro
  static from(error) {
    // Caso 1 — Erro já convertido
    if (error instanceof AppError) return error;

    // Caso 2 — Erro do React Router
    if (error?.status) {
      switch (error.status) {
        case 400:
          return new AppError(
            'A solicitação não pôde ser processada. Verifique os dados enviados.',
            400,
            'Requisição inválida'
          );
        case 401:
          return new UnauthorizedError();
        case 403:
          return new ForbiddenError();
        case 404:
          return new NotFoundError();
        case 500:
          return new ServerError();
        default:
          return new AppError(
            error.data?.message ||
              'Algo deu errado. Tente novamente mais tarde.',
            error.status,
            error.statusText || 'Erro inesperado'
          );
      }
    }

    // Caso 3 — Erros com formato Axios-like
    if (error?.response?.data) {
      const { status, title, message, btn } = error.response.data;
      return new AppError(
        message || 'Ocorreu um erro inesperado.',
        status || 500,
        title || 'Erro inesperado',
        btn || { label: 'Voltar ao início', path: '/' }
      );
    }

    // Caso 4 — Erros JS comuns
    if (error instanceof Error) {
      return new AppError(error.message);
    }

    // Fallback total
    return new AppError('Algo deu errado. Tente novamente mais tarde.');
  }
}

// 404 - Não encontrado
export class NotFoundError extends AppError {
  constructor(
    message = 'Recurso não encontrado.',
    status = 404,
    btn = { label: 'Voltar ao início', path: '/' }
  ) {
    super(message, status, 'Página não encontrada', btn);
    this.name = 'NotFoundError';
  }
}

// 403 - Proibido
export class ForbiddenError extends AppError {
  constructor(
    message = 'Você não tem autorização para visualizar esta página.',
    status = 403,
    btn = { label: 'Voltar à página anterior', path: '/' }
  ) {
    super(message, status, 'Acesso negado!', btn);
    this.name = 'ForbiddenError';
  }
}

// 401 - Não autorizado
export class UnauthorizedError extends AppError {
  constructor(
    message = 'Você precisa estar autenticado para acessar esta página.',
    status = 401,
    btn = { label: 'Ir para login', path: '/' }
  ) {
    super(message, status, 'Não autorizado', btn);
    this.name = 'UnauthorizedError';
  }
}

// 500 - Erro interno do servidor
export class ServerError extends AppError {
  constructor(
    message = 'Ocorreu um problema inesperado no servidor. Tente novamente mais tarde.',
    status = 500,
    btn = { label: 'Voltar ao início', path: '/' }
  ) {
    super(message, status, 'Erro interno do servidor', btn);
    this.name = 'ServerError';
  }
}
