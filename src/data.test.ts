import { describe, expect, it } from 'vitest';
import { allQuestions, modules, totalLessons } from './data';
import { modulePercent } from './progress';
import { emptyProgress } from './progress';

describe('expanded learning curriculum', () => {
  it('provides 20 complete lessons per lab and 160 total', () => {
    expect(modules).toHaveLength(8);
    expect(totalLessons).toBe(160);
    for (const module of modules) {
      expect(module.lessons).toHaveLength(20);
      expect(new Set(module.lessons.map(l => l.title)).size).toBe(20);
      for (const lesson of module.lessons) {
        for (const field of ['title','concept','example','challenge','explanation'] as const) expect(lesson[field].trim().length).toBeGreaterThan(5);
        expect(lesson.choices).toHaveLength(3);
        expect(new Set(lesson.choices).size).toBe(3);
        expect(lesson.choices.filter(c => c === lesson.answer)).toHaveLength(1);
      }
    }
  });
  it('keeps IDs unique and retains original completion credit', () => {
    const ids = modules.flatMap(m => m.lessons.map(l => l.id));
    expect(new Set(ids).size).toBe(160);
    expect(ids).toContain('computer-ipo');
    expect(ids).toContain('flow-shapes');
    for (const module of modules) {
      const lessonIds = module.lessons.map(l => l.id);
      expect(modulePercent({...emptyProgress, completedLessons:lessonIds.slice(0,4)},lessonIds)).toBe(20);
      expect(modulePercent({...emptyProgress, completedLessons:lessonIds},lessonIds)).toBe(100);
    }
  });
});

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
