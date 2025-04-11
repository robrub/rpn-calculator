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

  describe('Test con mock', () => {
    test('dovrebbe utilizzare un logger mockato per registrare le operazioni', () => {
      // Creo un mock per una funzione di logging
      const mockLogger = jest.fn();
      
      // Sovrascrive temporaneamente la funzione originale con il mock
      const originalConsoleLog = console.log;
      console.log = mockLogger;
      
      // Eseguo le operazioni della calcolatrice
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 10);
      calc = rpnCalc.pushOperand(calc, 5);
      calc = rpnCalc.add(calc);
      
      // Verifico che il logger sia stato chiamato il numero corretto di volte
      expect(mockLogger).toHaveBeenCalledTimes(4);
      // Verifico che il logger sia stato chiamato con argomenti specifici
      expect(mockLogger).toHaveBeenCalledWith('Pushing operand:', 10, 'Current stack:', []);
      expect(mockLogger).toHaveBeenCalledWith('Pushing operand:', 5, 'Current stack:', [10]);
      expect(mockLogger).toHaveBeenCalledWith('Eseguo addizione. Stack:', [10, 5]);
      expect(mockLogger).toHaveBeenCalledWith('Operazione:', 'a =', 10, 'b =', 5, 'risultato =', 15, 'Stack prima:', [10, 5], 'Stack dopo:', [15]);
      
      // Ripristino la funzione originale
      console.log = originalConsoleLog;
    });
    
    test('dovrebbe mockare una funzione di notifica esterna', () => {
      // Creo un mock per un servizio di notifica esterno
      const mockNotifyService = {
        sendNotification: jest.fn()
      };
      
      // Svolgo le operazioni sulla calcolatrice
      let calc = rpnCalc.createCalculator();
      calc = rpnCalc.pushOperand(calc, 7);
      calc = rpnCalc.pushOperand(calc, 3);
      calc = rpnCalc.subtract(calc);
      
      // Simulo l'invio di una notifica con il risultato
      mockNotifyService.sendNotification(`Risultato operazione: ${rpnCalc.getResult(calc)}`);
      
      // Verifico che la funzione di notifica sia stata chiamata correttamente
      expect(mockNotifyService.sendNotification).toHaveBeenCalledTimes(1);
      expect(mockNotifyService.sendNotification).toHaveBeenCalledWith('Risultato operazione: 4');
    });
  });
}); 