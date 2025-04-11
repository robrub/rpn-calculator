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
  console.log('Pushing operand:', operand, 'Current stack:', state.stack);
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
    console.error('Stack insufficiente:', state.stack);
    throw new Error('Operazione non valida: stack insufficiente');
  }
  
  const stackCopy = [...state.stack];
  const b = stackCopy.pop()!;
  const a = stackCopy.pop()!;
  const result = operation(a, b);
  console.log('Operazione:', 'a =', a, 'b =', b, 'risultato =', result, 'Stack prima:', state.stack, 'Stack dopo:', [...stackCopy, result]);
  
  return {
    ...state,
    stack: [...stackCopy, result]
  };
};

// Somma i due numeri in cima allo stack
export const add = (state: CalculatorState): CalculatorState => {
  console.log('Eseguo addizione. Stack:', state.stack);
  const result = applyOperation(state, (a, b) => a + b);
  return result;
};

// Sottrae i due numeri in cima allo stack
export const subtract = (state: CalculatorState): CalculatorState => {
  console.log('Eseguo sottrazione. Stack:', state.stack);
  const result = applyOperation(state, (a, b) => a - b);
  return result;
};

// Moltiplica i due numeri in cima allo stack
export const multiply = (state: CalculatorState): CalculatorState => {
  console.log('Eseguo moltiplicazione. Stack:', state.stack);
  const result = applyOperation(state, (a, b) => a * b);
  return result;
};

// Divide i due numeri in cima allo stack
export const divide = (state: CalculatorState): CalculatorState => {
  console.log('Eseguo divisione. Stack:', state.stack);
  if (!hasEnoughElements(state, 2)) {
    console.error('Stack insufficiente:', state.stack);
    throw new Error('Operazione non valida: stack insufficiente');
  }
  
  const stackCopy = [...state.stack];
  const b = stackCopy.pop()!;
  const a = stackCopy.pop()!;
  
  if (b === 0) {
    console.error('Tentativo di divisione per zero:', 'a =', a, 'b =', b);
    throw new Error('Divisione per zero');
  }
  
  const result = {
    ...state,
    stack: [...stackCopy, a / b]
  };
  
  console.log('Divisione:', 'a =', a, 'b =', b, 'risultato =', a / b, 'Stack prima:', state.stack, 'Stack dopo:', result.stack);
  return result;
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