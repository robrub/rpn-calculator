# Calcolatrice RPN

Una semplice implementazione di una calcolatrice RPN (Reverse Polish Notation) in TypeScript.

## Installazione

```bash
npm install
```

## Comandi disponibili

- `npm run dev`: Esegue l'applicazione in modalità sviluppo
- `npm run build`: Compila il codice TypeScript
- `npm start`: Esegue l'applicazione compilata in modalità interattiva
- `npm run start:class`: Esegue direttamente il TypeScript usando la versione a classi
- `npm run start:func`: Esegue direttamente il TypeScript usando la versione funzionale
- `npm test`: Esegue i test
- `npm run test:watch`: Esegue i test in modalità watch

## Utilizzo da linea di comando

L'applicazione supporta due modalità:
- `C`: Utilizza l'implementazione a classi (default)
- `F`: Utilizza l'implementazione funzionale

### Opzioni

- `-m, --mode`: Specifica la modalità (`C` o `F`)
- `-e, --expression`: Fornisce un'espressione RPN da calcolare
- `-h, --help`: Mostra le opzioni disponibili

### Esempi

```bash
# Esegue in modalità interattiva con l'implementazione a classi (default)
npm run dev

# Esegue in modalità interattiva con l'implementazione a classi (versione compilata)
npm start

# Esegue in modalità interattiva con l'implementazione a classi (direttamente in TypeScript)
npm run start:class

# Esegue in modalità interattiva con l'implementazione funzionale (direttamente in TypeScript)
npm run start:func

# Calcola un'espressione usando l'implementazione a classi
npm run start:class -- -e "5 3 + 2 *"

# Calcola un'espressione usando l'implementazione funzionale
npm run start:func -- -e "10 5 + 2 *"
```

### Modalità interattiva

In modalità interattiva, puoi inserire numeri e operatori uno per riga. 
Sono disponibili i seguenti comandi speciali:
- `clear`: Resetta lo stack
- `exit` o `quit`: Esce dall'applicazione

## Esempio di utilizzo programmatico

### Versione a classi

```typescript
import { RPNCalculator } from './src/modules/calculator';

const calculator = new RPNCalculator();
calculator.push_operand(5);
calculator.push_operand(3);
calculator.add();
console.log(calculator.getResult()); // Output: 8

// Oppure usando il metodo execute
const calculator = new RPNCalculator();
calculator.execute('5');
calculator.execute('3');
calculator.execute('+');
console.log(calculator.getResult()); // Output: 8
```

### Versione funzionale

```typescript
import * as rpnCalc from './src/modules/calculatorFunctional';

// Utilizzo passo-passo
let state = rpnCalc.createCalculator();
state = rpnCalc.pushOperand(state, 5);
state = rpnCalc.pushOperand(state, 3);
state = rpnCalc.add(state);
console.log(rpnCalc.getResult(state)); // Output: 8

// Utilizzo con execute
let state = rpnCalc.createCalculator();
state = rpnCalc.execute(state, '5');
state = rpnCalc.execute(state, '3');
state = rpnCalc.execute(state, '+');
console.log(rpnCalc.getResult(state)); // Output: 8

// Calcolo di un'espressione completa
const result = rpnCalc.calculateExpression('5 3 + 2 *');
console.log(result); // Output: 16
```

## Operatori supportati

- `+`: Addizione
- `-`: Sottrazione
- `*`: Moltiplicazione
- `/`: Divisione 