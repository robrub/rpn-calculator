"use strict";
/**
 * Calcolatrice RPN (Reverse Polish Notation) - Versione Funzionale
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExpression = exports.getResult = exports.execute = exports.divide = exports.multiply = exports.subtract = exports.add = exports.reset = exports.pushOperand = exports.createCalculator = void 0;
// Crea un nuovo stato della calcolatrice
const createCalculator = () => ({
    stack: []
});
exports.createCalculator = createCalculator;
// Aggiunge un operando allo stack
const pushOperand = (state, operand) => ({
    ...state,
    stack: [...state.stack, operand]
});
exports.pushOperand = pushOperand;
// Reinizializza lo stack
const reset = () => ({
    stack: []
});
exports.reset = reset;
// Controlla se lo stack ha almeno n elementi
const hasEnoughElements = (state, n) => state.stack.length >= n;
// Operazione generica tra due numeri
const applyOperation = (state, operation) => {
    if (!hasEnoughElements(state, 2)) {
        throw new Error('Operazione non valida: stack insufficiente');
    }
    const stackCopy = [...state.stack];
    const b = stackCopy.pop();
    const a = stackCopy.pop();
    return {
        ...state,
        stack: [...stackCopy, operation(a, b)]
    };
};
// Somma i due numeri in cima allo stack
const add = (state) => applyOperation(state, (a, b) => a + b);
exports.add = add;
// Sottrae i due numeri in cima allo stack
const subtract = (state) => applyOperation(state, (a, b) => a - b);
exports.subtract = subtract;
// Moltiplica i due numeri in cima allo stack
const multiply = (state) => applyOperation(state, (a, b) => a * b);
exports.multiply = multiply;
// Divide i due numeri in cima allo stack
const divide = (state) => {
    if (!hasEnoughElements(state, 2)) {
        throw new Error('Operazione non valida: stack insufficiente');
    }
    const stackCopy = [...state.stack];
    const b = stackCopy.pop();
    const a = stackCopy.pop();
    if (b === 0) {
        throw new Error('Divisione per zero');
    }
    return {
        ...state,
        stack: [...stackCopy, a / b]
    };
};
exports.divide = divide;
// Esegue un'operazione in base all'input
const execute = (state, input) => {
    const trimmedInput = input.trim();
    // Se è un numero, lo aggiungiamo allo stack
    if (!isNaN(Number(trimmedInput))) {
        return (0, exports.pushOperand)(state, Number(trimmedInput));
    }
    // Altrimenti, è un operatore
    switch (trimmedInput) {
        case '+':
            return (0, exports.add)(state);
        case '-':
            return (0, exports.subtract)(state);
        case '*':
            return (0, exports.multiply)(state);
        case '/':
            return (0, exports.divide)(state);
        default:
            throw new Error(`Operatore non supportato: ${trimmedInput}`);
    }
};
exports.execute = execute;
// Restituisce il risultato attuale
const getResult = (state) => {
    return state.stack.length > 0 ? state.stack[state.stack.length - 1] : undefined;
};
exports.getResult = getResult;
// Esempio di utilizzo come pipeline
const calculateExpression = (expression) => {
    const tokens = expression.split(/\s+/);
    const finalState = tokens.reduce((state, token) => {
        return (0, exports.execute)(state, token);
    }, (0, exports.createCalculator)());
    return (0, exports.getResult)(finalState);
};
exports.calculateExpression = calculateExpression;
//# sourceMappingURL=calculatorFunctional.js.map