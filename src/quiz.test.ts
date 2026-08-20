import { describe, expect, it } from 'vitest';
import { addFirstTryPoint, quizPercent } from './quiz';

describe('kid-friendly quiz scoring', () => {
  it('awards a point when the answer is correct on the first try', () => {
    expect(addFirstTryPoint(2, false)).toBe(3);
  });

  it('does not award a first-try point after a retry', () => {
    expect(addFirstTryPoint(2, true)).toBe(2);
  });

  it('reports four first-try answers out of five as 80%', () => {
    expect(quizPercent(4, 5)).toBe(80);
  });

  it('handles an empty quiz safely', () => {
    expect(quizPercent(0, 0)).toBe(0);
  });
});
