import { describe, expect, it } from 'vitest';
import { allQuestions, modules } from './data';

describe('objective quiz content', () => {
  it('provides exactly 20 questions for every module', () => {
    for (const module of modules) expect(module.questions).toHaveLength(20);
  });

  it('keeps every question id unique', () => {
    const ids = allQuestions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes each correct answer in its choices', () => {
    for (const question of allQuestions) {
      expect(question.choices).toContain(question.answer);
      expect(question.choices).toHaveLength(3);
    }
  });
});
