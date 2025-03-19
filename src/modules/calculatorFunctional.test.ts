import * as rpnCalc from './calculatorFunctional';

describe('RPNCalculator Funzionale', () => {
  describe('Operazioni di base', () => {
    test('dovrebbe creare una calcolatrice con uno stack vuoto', () => {
      const calc = rpnCalc.createCalculator();
      expect(rpnCalc.getResult(calc)).toBeUndefined();
    });

    test('dovrebbe aggiungere un numero allo stack', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      expect(rpnCalc.getResult(calc)).toBe(5);
    });

    test('dovrebbe aggiungere più numeri allo stack', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.pushOperand(calc, 3);
      expect(rpnCalc.getResult(calc)).toBe(3);
    });

    test('dovrebbe resettare lo stack', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.reset();
      expect(rpnCalc.getResult(calc)).toBeUndefined();
    });
  });

  describe('Operazione di addizione', () => {
    test('dovrebbe lanciare un errore quando si chiama add() su uno stack vuoto', () => {
      const calc = rpnCalc.createCalculator();
      expect(() => rpnCalc.add(calc)).toThrow('Operazione non valida: stack insufficiente');
    });

    test('dovrebbe lanciare un errore quando si chiama add() con un solo elemento nello stack', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      expect(() => rpnCalc.add(calc)).toThrow('Operazione non valida: stack insufficiente');
    });

    test('dovrebbe sommare un numero dopo averne aggiunto uno', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.pushOperand(calc, 3);
      calc = rpnCalc.add(calc);
      expect(rpnCalc.getResult(calc)).toBe(8);
    });

    test('dovrebbe eseguire due addizioni in sequenza', () => {
      let calc = rpnCalc.createCalculator();
      // Prima addizione: 5 + 3 = 8
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.pushOperand(calc, 3);
      calc = rpnCalc.add(calc);
      
      // Seconda addizione: 8 + 7 = 15
      calc = rpnCalc.pushOperand(calc, 7);
      calc = rpnCalc.add(calc);
      
      expect(rpnCalc.getResult(calc)).toBe(15);
    });
  });

  describe('Altre operazioni', () => {
    test('dovrebbe eseguire la sottrazione', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 10);
      calc = rpnCalc.pushOperand(calc, 4);
      calc = rpnCalc.subtract(calc);
      expect(rpnCalc.getResult(calc)).toBe(6);
    });

    test('dovrebbe eseguire la moltiplicazione', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.pushOperand(calc, 3);
      calc = rpnCalc.multiply(calc);
      expect(rpnCalc.getResult(calc)).toBe(15);
    });

    test('dovrebbe eseguire la divisione', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 10);
      calc = rpnCalc.pushOperand(calc, 2);
      calc = rpnCalc.divide(calc);
      expect(rpnCalc.getResult(calc)).toBe(5);
    });

    test('dovrebbe lanciare un errore per divisione per zero', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.pushOperand(calc, 0);
      expect(() => rpnCalc.divide(calc)).toThrow('Divisione per zero');
    });
  });

  describe('Funzione execute', () => {
    test('dovrebbe eseguire operazioni tramite execute', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.execute(calc, '5');
      calc = rpnCalc.execute(calc, '3');
      calc = rpnCalc.execute(calc, '+');
      expect(rpnCalc.getResult(calc)).toBe(8);
    });

    test('dovrebbe lanciare un errore per operatore non supportato', () => {
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.pushOperand(calc, 3);
      expect(() => rpnCalc.execute(calc, '%')).toThrow('Operatore non supportato: %');
    });
  });

  describe('Calcolo di espressioni complete', () => {
    test('dovrebbe calcolare correttamente un\'espressione RPN', () => {
      const result = rpnCalc.calculateExpression('5 3 + 2 *');
      expect(result).toBe(16);
    });

    test('dovrebbe calcolare correttamente espressioni complesse', () => {
      const result = rpnCalc.calculateExpression('10 5 + 2 * 8 4 / -');
      // (10 + 5) * 2 - (8 / 4) = 30 - 2 = 28
      expect(result).toBe(28);
    });
  });
}); 