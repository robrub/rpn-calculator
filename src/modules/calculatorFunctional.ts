/**
 * Calcolatrice RPN (Reverse Polish Notation) - Versione Funzionale
 */

// Definizione del tipo per lo stato della calcolatrice
type CalculatorState = {
  stack: number[];
};

// Crea un nuovo stato della calcolatrice
export const createCalculator = (): CalculatorState => ({
  stack: []
});

// Aggiunge un operando allo stack
export const pushOperand = (state: CalculatorState, operand: number): CalculatorState => {
  console.log('Operando inserito:', operand);
  return {
    ...state,
    stack: [...state.stack, operand]
  };
};

// Reinizializza lo stack
export const reset = (): CalculatorState => ({
  stack: []
});

// Controlla se lo stack ha almeno n elementi
const hasEnoughElements = (state: CalculatorState, n: number): boolean => 
  state.stack.length >= n;

// Operazione generica tra due numeri
const applyOperation = (
  state: CalculatorState, 
  operation: (a: number, b: number) => number
): CalculatorState => {
  if (!hasEnoughElements(state, 2)) {
    throw new Error('Operazione non valida: stack insufficiente');
  }
  
  const stackCopy = [...state.stack];
  const b = stackCopy.pop()!;
  const a = stackCopy.pop()!;
  
  return {
    ...state,
    stack: [...stackCopy, operation(a, b)]
  };
};

// Somma i due numeri in cima allo stack
export const add = (state: CalculatorState): CalculatorState => {
  const result = applyOperation(state, (a, b) => a + b);
  console.log('Risultato addizione:', getResult(result));
  return result;
};

// Sottrae i due numeri in cima allo stack
export const subtract = (state: CalculatorState): CalculatorState => 
  applyOperation(state, (a, b) => a - b);

// Moltiplica i due numeri in cima allo stack
export const multiply = (state: CalculatorState): CalculatorState => 
  applyOperation(state, (a, b) => a * b);

// Divide i due numeri in cima allo stack
export const divide = (state: CalculatorState): CalculatorState => {
  if (!hasEnoughElements(state, 2)) {
    throw new Error('Operazione non valida: stack insufficiente');
  }
  
  const stackCopy = [...state.stack];
  const b = stackCopy.pop()!;
  const a = stackCopy.pop()!;
  
  if (b === 0) {
    throw new Error('Divisione per zero');
  }
  
  return {
    ...state,
    stack: [...stackCopy, a / b]
  };
};

// Esegue un'operazione in base all'input
export const execute = (state: CalculatorState, input: string): CalculatorState => {
  const trimmedInput = input.trim();
  
  // Se è un numero, lo aggiungiamo allo stack
  if (!isNaN(Number(trimmedInput))) {
    return pushOperand(state, Number(trimmedInput));
  }
  
  // Altrimenti, è un operatore
  switch (trimmedInput) {
    case '+':
      return add(state);
    case '-':
      return subtract(state);
    case '*':
      return multiply(state);
    case '/':
      return divide(state);
    default:
      throw new Error(`Operatore non supportato: ${trimmedInput}`);
  }
};

// Restituisce il risultato attuale
export const getResult = (state: CalculatorState): number | undefined => {
  return state.stack.length > 0 ? state.stack[state.stack.length - 1] : undefined;
};

// Esempio di utilizzo come pipeline
export const calculateExpression = (expression: string): number | undefined => {
  const tokens = expression.split(/\s+/);
  
  const finalState = tokens.reduce((state, token) => {
    return execute(state, token);
  }, createCalculator());
  
  return getResult(finalState);
}; 