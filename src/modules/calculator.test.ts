import { RPNCalculator } from './calculator';

describe('RPNCalculator', () => {
  let calculator: RPNCalculator;

  beforeEach(() => {
    calculator = new RPNCalculator();
  });

  describe('Operazioni di base', () => {
    test('dovrebbe aggiungere un numero allo stack', () => {
      calculator.push_operand(5);
      expect(calculator.getResult()).toBe(5);
    });

    test('dovrebbe aggiungere più numeri allo stack', () => {
      calculator.push_operand(5);
      calculator.push_operand(3);
      expect(calculator.getResult()).toBe(3);
    });

    test('dovrebbe resettare lo stack', () => {
      calculator.push_operand(5);
      calculator.reset();
      expect(calculator.getResult()).toBeUndefined();
    });

    test('dovrebbe restituire undefined per uno stack vuoto', () => {
      expect(calculator.getResult()).toBeUndefined();
    });
  });

  describe('Operazione di addizione', () => {
    test('dovrebbe lanciare un errore quando si chiama add() su uno stack vuoto', () => {
      expect(() => calculator.add()).toThrow('Operazione non valida: stack insufficiente');
    });

    test('dovrebbe lanciare un errore quando si chiama add() con un solo elemento nello stack', () => {
      calculator.push_operand(5);
      expect(() => calculator.add()).toThrow('Operazione non valida: stack insufficiente');
    });

    test('dovrebbe sommare un numero dopo averne aggiunto uno', () => {
      calculator.push_operand(5);
      calculator.push_operand(3);
      calculator.add();
      expect(calculator.getResult()).toBe(8);
    });

    test('dovrebbe sommare due numeri dopo averli aggiunti', () => {
      calculator.push_operand(5);
      calculator.push_operand(3);
      calculator.add();
      expect(calculator.getResult()).toBe(8);
    });

    test('dovrebbe eseguire due addizioni in sequenza', () => {
      // Prima addizione: 5 + 3 = 8
      calculator.push_operand(5);
      calculator.push_operand(3);
      calculator.add();
      
      // Seconda addizione: 8 + 7 = 15
      calculator.push_operand(7);
      calculator.add();
      
      expect(calculator.getResult()).toBe(15);
    });

    test('dovrebbe mantenere il risultato dell\'addizione come unico elemento nello stack', () => {
      calculator.push_operand(5);
      calculator.push_operand(3);
      calculator.add();
      
      // Dopo l'addizione, lo stack dovrebbe contenere solo il risultato (8)
      calculator.push_operand(2);
      calculator.add();
      
      // Se lo stack contenesse più di un elemento dopo la prima addizione, 
      // questo test fallirebbe
      expect(calculator.getResult()).toBe(10);
    });
  });

  describe('Operazioni complesse', () => {
    test('dovrebbe gestire sequenze di operazioni miste', () => {
      calculator.push_operand(10);
      calculator.push_operand(5);
      calculator.add(); // 10 + 5 = 15
      calculator.push_operand(3);
      calculator.execute('-'); // 15 - 3 = 12
      calculator.push_operand(2);
      calculator.execute('*'); // 12 * 2 = 24
      
      expect(calculator.getResult()).toBe(24);
    });
    
    test('dovrebbe mantenere lo stato dopo un\'operazione', () => {
      calculator.push_operand(10);
      calculator.push_operand(5);
      calculator.add(); // 10 + 5 = 15
      
      // Verifica che il risultato sia corretto
      expect(calculator.getResult()).toBe(15);
      
      // Aggiungi un'altra operazione e verifica che funzioni correttamente
      calculator.push_operand(5);
      calculator.execute('/'); // 15 / 5 = 3
      
      expect(calculator.getResult()).toBe(3);
    });
  });
});
