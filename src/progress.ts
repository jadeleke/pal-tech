import type { ProgressState } from './types';

export const STORAGE_KEY = 'pal-tech-progress-v1';
export const emptyProgress: ProgressState = { version: 1, learner: null, completedLessons: [], quizBest: {}, xp: 0 };

export function loadProgress(): ProgressState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return emptyProgress;
    const value = JSON.parse(saved) as Partial<ProgressState>;
    return {
      version: 1,
      learner: value.learner ?? null,
      completedLessons: Array.isArray(value.completedLessons) ? value.completedLessons.filter((x): x is string => typeof x === 'string') : [],
      quizBest: value.quizBest && typeof value.quizBest === 'object' ? value.quizBest : {},
      xp: typeof value.xp === 'number' ? value.xp : 0
    };
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(progress: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function modulePercent(progress: ProgressState, lessonIds: string[]) {
  if (!lessonIds.length) return 0;
  return Math.round((lessonIds.filter((id) => progress.completedLessons.includes(id)).length / lessonIds.length) * 100);
}

export function earnedBadgeIds(progress: ProgressState, moduleIds: string[], lessonsByModule: Record<string, string[]>) {
  const earned = moduleIds.filter((id) => modulePercent(progress, lessonsByModule[id]) === 100 && (progress.quizBest[id] ?? 0) >= 70);
  if (moduleIds.every((id) => modulePercent(progress, lessonsByModule[id]) >= 50)) earned.push('innovator');
  return earned;
}
