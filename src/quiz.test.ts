import { describe, expect, it } from 'vitest';
import { addFirstTryPoint, quizPercent, createQuiz } from './quiz';

describe('random quiz selection', () => {
  const pool = Array.from({length:100}, (_,index) => ({id:`q${index}`,moduleId:'test',prompt:`Question ${index}`,choices:['Correct','Wrong 1','Wrong 2'],answer:'Correct',explanation:'Why'}));
  it('selects 20 distinct questions from a bank of 100 without changing it', () => {
    const before = JSON.stringify(pool);
    const quiz = createQuiz(pool,20,()=>0.25);
    expect(quiz).toHaveLength(20);
    expect(new Set(quiz.map(q=>q.id)).size).toBe(20);
    expect(JSON.stringify(pool)).toBe(before);
    for(const question of quiz) {
      expect(question.choices).toContain(question.answer);
      expect(new Set(question.choices).size).toBe(3);
      expect(question.choices).not.toEqual(pool[0].choices);
    }
  });
  it('can place the correct answer in every position', () => {
    const positions = [[0,0],[0.99,0],[0.99,0.99]].map(values => {
      let index=0;
      return createQuiz(pool.slice(0,1),1,()=>values[index++])[0].choices.indexOf('Correct');
    });
    expect(new Set(positions).size).toBe(3);
  });
  it('changes the sample for different random sequences', () => {
    expect(createQuiz(pool,20,()=>0).map(q=>q.id)).not.toEqual(createQuiz(pool,20,()=>0.9).map(q=>q.id));
  });
});

describe('kid-friendly quiz scoring', () => {
  it('awards a point when the answer is correct on the first try', () => {
    expect(addFirstTryPoint(2, false)).toBe(3);
  });

  it('does not award a first-try point after a retry', () => {
    expect(addFirstTryPoint(2, true)).toBe(2);
  });

  it('reports sixteen first-try answers out of twenty as 80%', () => {
    expect(quizPercent(16, 20)).toBe(80);
  });

  it('handles an empty quiz safely', () => {
    expect(quizPercent(0, 0)).toBe(0);
  });
});
