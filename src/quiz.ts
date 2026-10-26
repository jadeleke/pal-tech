import type { Question } from './types';

/** Fisher–Yates shuffle; never changes the source question bank. */
export function shuffled<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

export function createQuiz(pool: readonly Question[], count = 20, random: () => number = Math.random): Question[] {
  return shuffled(pool, random).slice(0, Math.max(0, count)).map(question => ({
    ...question,
    choices: shuffled(question.choices, random),
  }));
}

export function addFirstTryPoint(score: number, hadMistake: boolean) {
  return score + (hadMistake ? 0 : 1);
}

export function quizPercent(score: number, totalQuestions: number) {
  if (totalQuestions <= 0) return 0;
  return Math.round((score / totalQuestions) * 100);
}
