#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./modules/calculator");
const rpnCalcFunctional = __importStar(require("./modules/calculatorFunctional"));
const readline = __importStar(require("readline"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
// Parsing degli argomenti da riga di comando
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
    .argv;
/**
 * Esegue la calcolatrice in modalità interattiva utilizzando la versione a classi
 */
function runClassCalculatorInteractive() {
    const calculator = new calculator_1.RPNCalculator();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('Calcolatrice RPN - Modalità Classe (C)');
    console.log('Inserisci numeri e operatori (+, -, *, /) uno per riga');
    console.log('Digita "exit" o "quit" per uscire, "clear" per resettare lo stack');
    function promptUser() {
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
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Errore:', error.message);
                }
                else {
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
function runFunctionalCalculatorInteractive() {
    let state = rpnCalcFunctional.createCalculator();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('Calcolatrice RPN - Modalità Funzionale (F)');
    console.log('Inserisci numeri e operatori (+, -, *, /) uno per riga');
    console.log('Digita "exit" o "quit" per uscire, "clear" per resettare lo stack');
    function promptUser() {
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
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Errore:', error.message);
                }
                else {
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
function runClassCalculatorExpression(expression) {
    console.log('Calcolatrice RPN - Modalità Classe (C)');
    console.log(`Espressione: ${expression}`);
    const calculator = new calculator_1.RPNCalculator();
    const tokens = expression.split(/\s+/);
    try {
        // Esegui ogni token dell'espressione
        for (const token of tokens) {
            calculator.execute(token);
        }
        console.log('Risultato:', calculator.getResult());
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Errore:', error.message);
        }
        else {
            console.error('Errore sconosciuto');
        }
    }
}
/**
 * Esegue un'espressione RPN utilizzando la versione funzionale
 */
function runFunctionalCalculatorExpression(expression) {
    console.log('Calcolatrice RPN - Modalità Funzionale (F)');
    console.log(`Espressione: ${expression}`);
    try {
        const result = rpnCalcFunctional.calculateExpression(expression);
        console.log('Risultato:', result);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Errore:', error.message);
        }
        else {
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
        }
        else {
            runFunctionalCalculatorExpression(expression);
        }
    }
    else {
        // Modalità interattiva
        if (mode === 'C') {
            runClassCalculatorInteractive();
        }
        else {
            runFunctionalCalculatorInteractive();
        }
    }
}
//# sourceMappingURL=main.js.map