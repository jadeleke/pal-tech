import type { LearningModule, ProgressState } from './types';

export function resumeLesson(module: LearningModule, progress: ProgressState) {
  const saved = progress.lastLesson;
  const index = saved?.moduleId === module.id ? module.lessons.findIndex(l => l.id === saved.lessonId) : -1;
  return index >= 0 ? index : Math.max(0, module.lessons.findIndex(l => !progress.completedLessons.includes(l.id)));
}

export const stageNames = ['Discover', 'Explore', 'Practise', 'Apply'];
export function lessonStages(module: LearningModule) {
  return stageNames.map((name,index)=>({name, start:index*5, lessons:module.lessons.slice(index*5,index*5+5)}));
}
