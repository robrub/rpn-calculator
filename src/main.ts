#!/usr/bin/env node
import { RPNCalculator } from './modules/calculator';
import * as rpnCalcFunctional from './modules/calculatorFunctional';
import * as readline from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Definisco un'interfaccia per gli argomenti
interface CliArgs {
  m: string;
  e?: string;
  [key: string]: unknown;
}

// Parsing degli argomenti da riga di comando
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
 * Esegue la calcolatrice in modalità interattiva utilizzando la versione a classi
 */
function runClassCalculatorInteractive(): void {
  const calculator = new RPNCalculator();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Calcolatrice RPN - Modalità Classe (C)');
  console.log('Inserisci numeri e operatori (+, -, *, /) uno per riga');
  console.log('Digita "exit" o "quit" per uscire, "clear" per resettare lo stack');
  
  function promptUser(): void {
    const currentResult = calculator.getResult();
    const prompt = currentResult !== undefined ? `[${currentResult}] > ` : '> ';
    
    rl.question(prompt, (input) => {
      const trimmedInput = input.trim().toLowerCase();
      
      if (trimmedInput === 'exit' || trimmedInput === 'quit') {
        console.log('Arrivederci!');
        rl.close();
        return;
      }
      
      if (trimmedInput === 'clear') {
        calculator.reset();
        console.log('Stack resettato');
        promptUser();
        return;
      }
      
      try {
        calculator.execute(trimmedInput);
        promptUser();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Errore:', error.message);
        } else {
          console.error('Errore sconosciuto');
        }
        promptUser();
      }
    });
  }
  
  promptUser();
}

/**
 * Esegue la calcolatrice in modalità interattiva utilizzando la versione funzionale
 */
function runFunctionalCalculatorInteractive(): void {
  let state = rpnCalcFunctional.createCalculator();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Calcolatrice RPN - Modalità Funzionale (F)');
  console.log('Inserisci numeri e operatori (+, -, *, /) uno per riga');
  console.log('Digita "exit" o "quit" per uscire, "clear" per resettare lo stack');
  
  function promptUser(): void {
    const currentResult = rpnCalcFunctional.getResult(state);
    const prompt = currentResult !== undefined ? `[${currentResult}] > ` : '> ';
    
    rl.question(prompt, (input) => {
      const trimmedInput = input.trim().toLowerCase();
      
      if (trimmedInput === 'exit' || trimmedInput === 'quit') {
        console.log('Arrivederci!');
        rl.close();
        return;
      }
      
      if (trimmedInput === 'clear') {
        state = rpnCalcFunctional.reset();
        console.log('Stack resettato');
        promptUser();
        return;
      }
      
      try {
        state = rpnCalcFunctional.execute(state, trimmedInput);
        promptUser();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Errore:', error.message);
        } else {
          console.error('Errore sconosciuto');
        }
        promptUser();
      }
    });
  }
  
  promptUser();
}

/**
 * Esegue un'espressione RPN utilizzando la versione a classi
 */
function runClassCalculatorExpression(expression: string): void {
  console.log('Calcolatrice RPN - Modalità Classe (C)');
  console.log(`Espressione: ${expression}`);
  
  const calculator = new RPNCalculator();
  const tokens = expression.split(/\s+/);
  
  try {
    // Esegui ogni token dell'espressione
    for (const token of tokens) {
      calculator.execute(token);
    }
    
    console.log('Risultato:', calculator.getResult());
  } catch (error) {
    if (error instanceof Error) {
      console.error('Errore:', error.message);
    } else {
      console.error('Errore sconosciuto');
    }
  }
}

/**
 * Esegue un'espressione RPN utilizzando la versione funzionale
 */
function runFunctionalCalculatorExpression(expression: string): void {
  console.log('Calcolatrice RPN - Modalità Funzionale (F)');
  console.log(`Espressione: ${expression}`);
  
  try {
    const result = rpnCalcFunctional.calculateExpression(expression);
    console.log('Risultato:', result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Errore:', error.message);
    } else {
      console.error('Errore sconosciuto');
    }
  }
}

// Punto di ingresso principale
if (require.main === module) {
  const mode = argv.m;
  const expression = argv.e;
  
  if (expression) {
    // Modalità non interattiva: calcola l'espressione fornita
    if (mode === 'C') {
      runClassCalculatorExpression(expression);
    } else {
      runFunctionalCalculatorExpression(expression);
    }
  } else {
    // Modalità interattiva
    if (mode === 'C') {
      runClassCalculatorInteractive();
    } else {
      runFunctionalCalculatorInteractive();
    }
  }
}