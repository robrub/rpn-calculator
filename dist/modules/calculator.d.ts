/**
 * Calcolatrice RPN (Reverse Polish Notation)
 */
export declare class RPNCalculator {
    private stack;
    /**
     * Aggiunge un operando allo stack
     * @param operand - Il numero da aggiungere allo stack
     */
    push_operand(operand: number): void;
    /**
     * Reinizializza lo stack per una nuova operazione
     */
    reset(): void;
    /**
     * Somma i due numeri in cima allo stack
     * @returns Il risultato della somma o undefined se non ci sono abbastanza elementi
     * @throws Error se non ci sono abbastanza elementi nello stack
     */
    add(): number | undefined;
    /**
     * Esegue un'operazione sulla calcolatrice
     * @param input - L'input da processare (numero o operatore)
     * @returns Il risultato dell'operazione o undefined
     */
    execute(input: string): number | undefined;
    /**
     * Restituisce il risultato attuale
     * @returns L'ultimo valore nello stack o undefined se lo stack è vuoto
     */
    getResult(): number | undefined;
    /**
     * Pulisce lo stack
     */
    clear(): void;
}
