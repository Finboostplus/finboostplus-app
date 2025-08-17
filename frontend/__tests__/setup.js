import '@testing-library/jest-dom/vitest';
import { vi, expect } from 'vitest';
import { customMatchers } from './test-utils.jsx';

// Registra matchers customizados definidos em test-utils
expect.extend(customMatchers);

// --- ResizeObserver Mock (idempotente e mais completo) ---
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    constructor(cb) {
      this._cb = cb;
    }
    observe(target) {
      // Simula callback imediato
      const entry = {
        target,
        contentRect: { width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 },
        borderBoxSize: [{ inlineSize: 0, blockSize: 0 }],
        contentBoxSize: [{ inlineSize: 0, blockSize: 0 }],
        devicePixelContentBoxSize: [{ inlineSize: 0, blockSize: 0 }],
      };
      this._cb([entry], this);
    }
    unobserve() {}
    disconnect() {}
  };
}

// --- IntersectionObserver Mock com helper ---
if (!globalThis.IntersectionObserver) {
  const instances = new Set();
  globalThis.__triggerIntersection = (entries = [{ isIntersecting: true, intersectionRatio: 1 }]) => {
    instances.forEach(inst => inst._cb(entries, inst));
  };
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor(cb, options) {
      this._cb = cb;
      this._options = options;
      instances.add(this);
    }
    observe() {}
    unobserve() {}
    disconnect() { instances.delete(this); }
    takeRecords() { return []; }
  };
}

// --- matchMedia Mock (idempotente) ---
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// Reset básico após cada teste para futuros mocks dinâmicos de matchMedia
import { afterEach } from 'vitest';
afterEach(() => {
  if (window.matchMedia?.mockReset) window.matchMedia.mockReset();
});

// Alinha URLSearchParams entre jsdom (window) e Node (undici)
// Corrige erro: "Request constructor: Expected init.body (\"URLSearchParams {}\") to be an instance of URLSearchParams"
if (typeof window !== 'undefined' && window.URLSearchParams) {
  // Use a versão do jsdom para o ambiente global do Node
  // evitando instância de reinos diferentes
  // eslint-disable-next-line no-global-assign
  URLSearchParams = window.URLSearchParams;
  globalThis.URLSearchParams = window.URLSearchParams;
}

// Mock adicional para fetch para evitar erros de Request constructor
const originalFetch = globalThis.fetch;
globalThis.fetch = vi.fn(async (input, init = {}) => {
  // Se o body é um URLSearchParams do jsdom, convertê-lo para string
  if (init.body && init.body.constructor.name === 'URLSearchParams') {
    init.body = init.body.toString();
  }

  // Mock response padrão para testes
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => '',
    headers: new Map(),
  };
});
