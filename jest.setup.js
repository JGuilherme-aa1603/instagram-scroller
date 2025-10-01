// Jest setup file para testes com requisições REAIS

console.log('🚀 Jest configurado para fazer requisições REAIS à API');

// Configurações opcionais para requisições reais
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  // Silenciar alguns warnings desnecessários durante os testes
  console.warn = jest.fn((message) => {
    if (!message.includes('deprecated') && !message.includes('warning')) {
      originalWarn(message);
    }
  });
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
