/**
 * Calcolatrice RPN (Reverse Polish Notation) - Versione Funzionale
 */
type CalculatorState = {
    stack: number[];
};
export declare const createCalculator: () => CalculatorState;
export declare const pushOperand: (state: CalculatorState, operand: number) => CalculatorState;
export declare const reset: () => CalculatorState;
export declare const add: (state: CalculatorState) => CalculatorState;
export declare const subtract: (state: CalculatorState) => CalculatorState;
export declare const multiply: (state: CalculatorState) => CalculatorState;
export declare const divide: (state: CalculatorState) => CalculatorState;
export declare const execute: (state: CalculatorState, input: string) => CalculatorState;
export declare const getResult: (state: CalculatorState) => number | undefined;
export declare const calculateExpression: (expression: string) => number | undefined;
export {};
