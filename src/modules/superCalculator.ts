import {
  createCalculator,
  pushOperand,
  add,
  subtract,
  multiply,
  divide,
  getResult
} from './calculatorFunctional';

export const executeTenOperations = (): number[] => {
  const results: number[] = [];
  
  // Operazione 1: 5 + 3
  let state = createCalculator();
  state = pushOperand(state, 5);
  state = pushOperand(state, 3);
  state = add(state);
  results.push(getResult(state)!);

  // Operazione 2: 10 - 4
  state = createCalculator();
  state = pushOperand(state, 10);
  state = pushOperand(state, 4);
  state = subtract(state);
  results.push(getResult(state)!);

  // Operazione 3: 6 * 7
  state = createCalculator();
  state = pushOperand(state, 6);
  state = pushOperand(state, 7);
  state = multiply(state);
  results.push(getResult(state)!);

  // Operazione 4: 20 / 5
  state = createCalculator();
  state = pushOperand(state, 20);
  state = pushOperand(state, 5);
  state = divide(state);
  results.push(getResult(state)!);

  // Operazione 5: (2 + 3) * 4
  state = createCalculator();
  state = pushOperand(state, 2);
  state = pushOperand(state, 3);
  state = add(state);
  state = pushOperand(state, 4);
  state = multiply(state);
  results.push(getResult(state)!);

  // Operazione 6: 100 / (5 + 5)
  state = createCalculator();
  state = pushOperand(state, 100);
  state = pushOperand(state, 5);
  state = pushOperand(state, 5);
  state = add(state);
  state = divide(state);
  results.push(getResult(state)!);

  // Operazione 7: (10 - 2) * (3 + 1)
  state = createCalculator();
  state = pushOperand(state, 10);
  state = pushOperand(state, 2);
  state = subtract(state);
  let temp = getResult(state)!;
  state = createCalculator();
  state = pushOperand(state, 3);
  state = pushOperand(state, 1);
  state = add(state);
  let temp2 = getResult(state)!;
  state = createCalculator();
  state = pushOperand(state, temp);
  state = pushOperand(state, temp2);
  state = multiply(state);
  results.push(getResult(state)!);

  // Operazione 8: 15 / 3 + 2
  state = createCalculator();
  state = pushOperand(state, 15);
  state = pushOperand(state, 3);
  state = divide(state);
  let temp3 = getResult(state)!;
  state = createCalculator();
  state = pushOperand(state, temp3);
  state = pushOperand(state, 2);
  state = add(state);
  results.push(getResult(state)!);

  // Operazione 9: (8 * 2) - (6 / 2)
  state = createCalculator();
  state = pushOperand(state, 8);
  state = pushOperand(state, 2);
  state = multiply(state);
  let temp4 = getResult(state)!;
  state = createCalculator();
  state = pushOperand(state, 6);
  state = pushOperand(state, 2);
  state = divide(state);
  let temp5 = getResult(state)!;
  state = createCalculator();
  state = pushOperand(state, temp4);
  state = pushOperand(state, temp5);
  state = subtract(state);
  results.push(getResult(state)!);

  // Operazione 10: (4 + 6) * (10 - 5)
  state = createCalculator();
  state = pushOperand(state, 4);
  state = pushOperand(state, 6);
  state = add(state);
  let temp6 = getResult(state)!;
  state = createCalculator();
  state = pushOperand(state, 10);
  state = pushOperand(state, 5);
  state = subtract(state);
  let temp7 = getResult(state)!;
  state = createCalculator();
  state = pushOperand(state, temp6);
  state = pushOperand(state, temp7);
  state = multiply(state);
  results.push(getResult(state)!);

  return results;
}; 