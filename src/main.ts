#!/usr/bin/env node
import { RPNCalculator } from './modules/calculator';
import * as rpnCalcFunctional from './modules/calculatorFunctional';
import * as readline from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Tipo che definisce la struttura degli argomenti da riga di comando
 * 
 * @property {string} m - La modalità della calcolatrice ('C' per classe, 'F' per funzionale)
 * @property {string} [e] - L'espressione RPN da calcolare (opzionale)
 */
type CliArgs = {
  m: string;
  e?: string;
  [key: string]: unknown;
};

/**
 * Tipo che definisce l'adapter per le diverse implementazioni della calcolatrice
 * Questo tipo permette di usare un'interfaccia uniforme per entrambe le implementazioni
 * 
 * @property {Function} getResult - Funzione che restituisce il risultato attuale
 * @property {Function} execute - Funzione che esegue un'operazione
 * @property {Function} reset - Funzione che reimposta lo stack
 * @property {string} modeName - Nome della modalità
 */
type CalculatorAdapter = {
  getResult: () => number | undefined;
  execute: (input: string) => void;
  reset: () => void;
  modeName: string;
};

/**
 * Parsing degli argomenti da riga di comando tramite yargs
 * Configura le opzioni disponibili e i loro valori predefiniti
 * 
 * @param {string[]} hideBin(process.argv) - Array di argomenti senza il percorso binario di Node
 * @returns {CliArgs} Oggetto contenente gli argomenti parsati nella struttura richiesta
 */
const argv = yargs(hideBin(process.argv))
  .option('m', {
    alias: 'mode',
    describe: 'Modalità della calcolatrice (C per classe, F per funzionale)',
    type: 'string',
    choices: ['C', 'F'],
    default: 'C'
  })
  .option('e', {
    alias: 'expression',
    describe: 'Espressione RPN da calcolare',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .argv as CliArgs;

/**
 * Crea un adapter per la calcolatrice basata su classi
 * Incapsula un'istanza di RPNCalculator e la espone tramite l'interfaccia CalculatorAdapter
 * 
 * @returns {CalculatorAdapter} Un adapter per l'implementazione a classi
 */
const createClassCalculatorAdapter = (): CalculatorAdapter => {
  const calculator = new RPNCalculator();
  
  return {
    getResult: () => calculator.getResult(),
    execute: (input: string) => { calculator.execute(input); },
    reset: () => calculator.reset(),
    modeName: 'Classe (C)'
  };
};

/**
 * Crea un adapter per la calcolatrice funzionale
 * Mantiene lo stato della calcolatrice funzionale e lo espone tramite l'interfaccia CalculatorAdapter
 * 
 * @returns {CalculatorAdapter} Un adapter per l'implementazione funzionale
 */
const createFunctionalCalculatorAdapter = (): CalculatorAdapter => {
  let state = rpnCalcFunctional.createCalculator();
  
  return {
    getResult: () => rpnCalcFunctional.getResult(state),
    execute: (input: string) => { state = rpnCalcFunctional.execute(state, input); },
    reset: () => { state = rpnCalcFunctional.reset(); },
    modeName: 'Funzionale (F)'
  };
};

/**
 * Crea un'interfaccia readline per l'input/output interattivo
 * 
 * @returns {readline.Interface} L'interfaccia readline configurata per stdin/stdout
 */
const createReadlineInterface = (): readline.Interface => readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Mostra un messaggio di benvenuto per la modalità interattiva
 * 
 * @param {string} modeName - Il nome della modalità da visualizzare
 */
const printWelcomeMessage = (modeName: string): void => {
  console.log(`Calcolatrice RPN - Modalità ${modeName}`);
  console.log('Inserisci numeri e operatori (+, -, *, /) uno per riga');
  console.log('Digita "exit" o "quit" per uscire, "clear" per resettare lo stack');
};

/**
 * Gestisce l'input dell'utente nella modalità interattiva
 * Processa comandi speciali come 'exit', 'quit', 'clear' o esegue operazioni della calcolatrice
 * 
 * @param {readline.Interface} rl - L'interfaccia readline per l'I/O
 * @param {CalculatorAdapter} adapter - L'adapter della calcolatrice da utilizzare
 * @param {string} input - L'input dell'utente da processare
 * @param {Function} promptFn - Funzione di callback per continuare il ciclo di prompt
 */
const handleUserInput = (
  rl: readline.Interface, 
  adapter: CalculatorAdapter, 
  input: string, 
  promptFn: () => void
): void => {
  const trimmedInput = input.trim().toLowerCase();
  
  // Gestione del comando di uscita
  if (trimmedInput === 'exit' || trimmedInput === 'quit') {
    console.log('Arrivederci!');
    rl.close();
    return;
  }
  
  // Gestione del comando di reset
  if (trimmedInput === 'clear') {
    adapter.reset();
    console.log('Stack resettato');
    promptFn();
    return;
  }
  
  // Esecuzione dell'operazione
  try {
    adapter.execute(trimmedInput);
    promptFn();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Errore:', error.message);
    } else {
      console.error('Errore sconosciuto');
    }
    promptFn();
  }
};

/**
 * Esegue la calcolatrice in modalità interattiva
 * Crea l'adapter appropriato in base alla modalità e gestisce l'input dell'utente
 * 
 * @param {string} mode - La modalità da utilizzare ('C' per classe, 'F' per funzionale)
 */
const runCalculatorInteractive = (mode: string): void => {
  // Crea l'adapter in base alla modalità
  const adapter = mode === 'C' 
    ? createClassCalculatorAdapter() 
    : createFunctionalCalculatorAdapter();
    
  const rl = createReadlineInterface();
  printWelcomeMessage(adapter.modeName);
  
  /**
   * Funzione ricorsiva che mostra il prompt all'utente e gestisce l'input
   */
  const promptUser = (): void => {
    const currentResult = adapter.getResult();
    const prompt = currentResult !== undefined ? `[${currentResult}] > ` : '> ';
    
    rl.question(prompt, (input) => handleUserInput(rl, adapter, input, promptUser));
  };
  
  // Avvia il ciclo interattivo
  promptUser();
};

/**
 * Gestisce gli errori in modo uniforme
 * 
 * @param {unknown} error - L'errore da gestire
 */
const handleError = (error: unknown): void => {
  if (error instanceof Error) {
    console.error('Errore:', error.message);
  } else {
    console.error('Errore sconosciuto');
  }
};

/**
 * Elabora un'espressione tokenizzandola ed eseguendo ogni token
 * 
 * @param {RPNCalculator} calculator - L'istanza della calcolatrice da utilizzare
 * @param {string} expression - L'espressione RPN da elaborare
 * @returns {number | undefined} Il risultato dell'espressione o undefined in caso di errore
 */
const processExpression = (calculator: RPNCalculator, expression: string): number | undefined => {
  // Divide l'espressione in token
  const tokens = expression.split(/\s+/);
  
  try {
    // Esegue ogni token sull'istanza della calcolatrice
    for (const token of tokens) {
      calculator.execute(token);
    }
    
    return calculator.getResult();
  } catch (error) {
    handleError(error);
    return undefined;
  }
};

/**
 * Esegue un'espressione RPN utilizzando la versione a classi
 * 
 * @param {string} expression - L'espressione RPN da calcolare
 */
const runClassCalculatorExpression = (expression: string): void => {
  console.log('Calcolatrice RPN - Modalità Classe (C)');
  console.log(`Espressione: ${expression}`);
  
  const calculator = new RPNCalculator();
  const result = processExpression(calculator, expression);
  
  if (result !== undefined) {
    console.log('Risultato:', result);
  }
};

/**
 * Esegue un'espressione RPN utilizzando la versione funzionale
 * 
 * @param {string} expression - L'espressione RPN da calcolare
 */
const runFunctionalCalculatorExpression = (expression: string): void => {
  console.log('Calcolatrice RPN - Modalità Funzionale (F)');
  console.log(`Espressione: ${expression}`);
  
  try {
    // Utilizza direttamente la funzione calculateExpression dal modulo funzionale
    const result = rpnCalcFunctional.calculateExpression(expression);
    console.log('Risultato:', result);
  } catch (error) {
    handleError(error);
  }
};

// Punto di ingresso principale
if (require.main === module) {
  // Estrae gli argomenti con destructuring
  const { m: mode, e: expression } = argv;
  
  if (expression) {
    // Modalità non interattiva: calcola l'espressione fornita
    mode === 'C'
      ? runClassCalculatorExpression(expression)
      : runFunctionalCalculatorExpression(expression);
  } else {
    // Modalità interattiva
    runCalculatorInteractive(mode);
  }
}