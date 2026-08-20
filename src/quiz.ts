export function addFirstTryPoint(score: number, hadMistake: boolean) {
  return score + (hadMistake ? 0 : 1);
}

export function quizPercent(score: number, totalQuestions: number) {
  if (totalQuestions <= 0) return 0;
  return Math.round((score / totalQuestions) * 100);
}
