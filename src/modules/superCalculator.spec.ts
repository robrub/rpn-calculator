import { executeTenOperations } from './superCalculator';

// Mock del modulo calculatorFunctional
jest.mock('./calculatorFunctional', () => ({
  createCalculator: jest.fn().mockReturnValue({ stack: [] }),
  pushOperand: jest.fn().mockImplementation((state, operand) => ({
    ...state,
    stack: [...state.stack, operand]
  })),
  add: jest.fn().mockImplementation((state) => {
    const a = state.stack[state.stack.length - 2];
    const b = state.stack[state.stack.length - 1];
    return {
      ...state,
      stack: [...state.stack.slice(0, -2), a + b]
    };
  }),
  subtract: jest.fn().mockImplementation((state) => {
    const a = state.stack[state.stack.length - 2];
    const b = state.stack[state.stack.length - 1];
    return {
      ...state,
      stack: [...state.stack.slice(0, -2), a - b]
    };
  }),
  multiply: jest.fn().mockImplementation((state) => {
    const a = state.stack[state.stack.length - 2];
    const b = state.stack[state.stack.length - 1];
    return {
      ...state,
      stack: [...state.stack.slice(0, -2), a * b]
    };
  }),
  divide: jest.fn().mockImplementation((state) => {
    const a = state.stack[state.stack.length - 2];
    const b = state.stack[state.stack.length - 1];
    return {
      ...state,
      stack: [...state.stack.slice(0, -2), a / b]
    };
  }),
  getResult: jest.fn().mockImplementation((state) => state.stack[state.stack.length - 1])
}));

describe('executeTenOperations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dovrebbe eseguire 10 operazioni e restituire i risultati corretti', () => {
    const results = executeTenOperations();

    // Verifica che ci siano esattamente 10 risultati
    expect(results).toHaveLength(10);

    // Verifica i risultati attesi
    const expectedResults = [8, 6, 42, 4, 20, 10, 32, 7, 13, 50];
    expect(results).toEqual(expectedResults);

    // Verifica che createCalculator sia stato chiamato
    const { createCalculator } = require('./calculatorFunctional');
    expect(createCalculator).toHaveBeenCalled();

    // Verifica che pushOperand sia stato chiamato
    const { pushOperand } = require('./calculatorFunctional');
    expect(pushOperand).toHaveBeenCalled();
  });

  it('dovrebbe gestire correttamente le operazioni complesse', () => {
    const results = executeTenOperations();
    
    // Verifica alcune operazioni complesse specifiche
    expect(results[4]).toBe(20);  // (2 + 3) * 4 = 20
    expect(results[5]).toBe(10);  // 100 / (5 + 5) = 10
    expect(results[6]).toBe(32);  // (10 - 2) * (3 + 1) = 32
    expect(results[9]).toBe(50);  // (4 + 6) * (10 - 5) = 50
  });

  it('dovrebbe mantenere l\'ordine corretto delle operazioni', () => {
    const results = executeTenOperations();
    
    // Verifica l'ordine dei risultati
    const expectedOrder = [8, 6, 42, 4, 20, 10, 32, 7, 13, 50];
    results.forEach((result, index) => {
      expect(result).toBe(expectedOrder[index]);
    });
  });
}); 