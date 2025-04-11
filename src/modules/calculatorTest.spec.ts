import { executeTenOperations } from './calculatorTest';

// Mock del modulo calculatorFunctional
jest.mock('./calculatorFunctional', () => ({
  createCalculator: jest.fn().mockReturnValue({ stack: [] }),
  pushOperand: jest.fn().mockImplementation((state, operand) => ({
    ...state,
    stack: [...state.stack, operand]
  })),
  add: jest.fn().mockImplementation((state) => ({
    ...state,
    stack: [state.stack[0] + state.stack[1]]
  })),
  subtract: jest.fn().mockImplementation((state) => ({
    ...state,
    stack: [state.stack[0] - state.stack[1]]
  })),
  multiply: jest.fn().mockImplementation((state) => ({
    ...state,
    stack: [state.stack[0] * state.stack[1]]
  })),
  divide: jest.fn().mockImplementation((state) => ({
    ...state,
    stack: [state.stack[0] / state.stack[1]]
  })),
  getResult: jest.fn().mockImplementation((state) => state.stack[0])
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
    expect(results).toEqual([8, 6, 42, 4, 20, 10, 32, 7, 13, 50]);

    // Verifica che createCalculator sia stato chiamato 10 volte
    const { createCalculator } = require('./calculatorFunctional');
    expect(createCalculator).toHaveBeenCalledTimes(10);

    // Verifica che pushOperand sia stato chiamato il numero corretto di volte
    const { pushOperand } = require('./calculatorFunctional');
    expect(pushOperand).toHaveBeenCalledTimes(30); // 3 chiamate per ogni operazione base
  });

  it('dovrebbe gestire correttamente le operazioni complesse', () => {
    const results = executeTenOperations();
    
    // Verifica alcune operazioni complesse
    // Operazione 5: (2 + 3) * 4 = 20
    expect(results[4]).toBe(20);
    
    // Operazione 7: (10 - 2) * (3 + 1) = 32
    expect(results[6]).toBe(32);
    
    // Operazione 10: (4 + 6) * (10 - 5) = 50
    expect(results[9]).toBe(50);
  });

  it('dovrebbe mantenere l\'ordine corretto delle operazioni', () => {
    const results = executeTenOperations();
    
    // Verifica che i risultati siano nell'ordine corretto
    const expectedOrder = [8, 6, 42, 4, 20, 10, 32, 7, 13, 50];
    results.forEach((result, index) => {
      expect(result).toBe(expectedOrder[index]);
    });
  });
}); 