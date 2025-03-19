"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPNCalculator = void 0;
/**
 * Calcolatrice RPN (Reverse Polish Notation)
 */
class RPNCalculator {
    constructor() {
        this.stack = [];
    }
    /**
     * Aggiunge un operando allo stack
     * @param operand - Il numero da aggiungere allo stack
     */
    push_operand(operand) {
        this.stack.push(operand);
    }
    /**
     * Reinizializza lo stack per una nuova operazione
     */
    reset() {
        this.stack = [];
    }
    /**
     * Somma i due numeri in cima allo stack
     * @returns Il risultato della somma o undefined se non ci sono abbastanza elementi
     * @throws Error se non ci sono abbastanza elementi nello stack
     */
    add() {
        if (this.stack.length < 2) {
            throw new Error('Operazione non valida: stack insufficiente');
        }
        const b = this.stack.pop();
        const a = this.stack.pop();
        this.stack.push(a + b);
        return this.getResult();
    }
    /**
     * Esegue un'operazione sulla calcolatrice
     * @param input - L'input da processare (numero o operatore)
     * @returns Il risultato dell'operazione o undefined
     */
    execute(input) {
        const trimmedInput = input.trim();
        // Se è un numero, lo aggiungiamo allo stack
        if (!isNaN(Number(trimmedInput))) {
            this.push_operand(Number(trimmedInput));
            return;
        }
        // Altrimenti, è un operatore
        if (this.stack.length < 2) {
            throw new Error('Operazione non valida: stack insufficiente');
        }
        const b = this.stack.pop();
        const a = this.stack.pop();
        switch (trimmedInput) {
            case '+':
                this.stack.push(a + b);
                break;
            case '-':
                this.stack.push(a - b);
                break;
            case '*':
                this.stack.push(a * b);
                break;
            case '/':
                if (b === 0) {
                    throw new Error('Divisione per zero');
                }
                this.stack.push(a / b);
                break;
            default:
                throw new Error(`Operatore non supportato: ${trimmedInput}`);
        }
        return this.getResult();
    }
    /**
     * Restituisce il risultato attuale
     * @returns L'ultimo valore nello stack o undefined se lo stack è vuoto
     */
    getResult() {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : undefined;
    }
    /**
     * Pulisce lo stack
     */
    clear() {
        this.reset();
    }
}
exports.RPNCalculator = RPNCalculator;
//# sourceMappingURL=calculator.js.map