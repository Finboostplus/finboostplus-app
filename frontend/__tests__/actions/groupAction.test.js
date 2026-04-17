import { describe, it, expect, vi } from 'vitest';
import { groupAction } from '../../src/actions/groupAction';

const makeRequest = data => ({
  formData: async () => new Map(Object.entries(data)),
});

describe('groupAction', () => {
  it('retorna erros de validação quando nome é inválido', async () => {
    const res = await groupAction({ request: makeRequest({ name: 'ab' }) });
    expect(res.success).toBe(false);
    expect(res.errors.name.title).toMatch(/nome do grupo/i);
    expect(res.errors.name.message).toMatch(/pelo menos 3 caracteres/i);
  });

  it('aceita payload válido (name >= 3) e não retorna erros', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const res = await groupAction({
      request: makeRequest({ name: 'Familia', description: 'teste' }),
    });
    expect(res).toBeUndefined(); // ação não retorna erro
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
