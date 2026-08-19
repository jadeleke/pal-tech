export type AgeBand = '9-11' | '12-14';

export interface Lesson {
  id: string;
  title: string;
  eyebrow: string;
  concept: string;
  example: string;
  challenge: string;
  choices: string[];
  answer: string;
  explanation: string;
  goFurther?: string;
}

export interface Question {
  id: string;
  moduleId: string;
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
}

export interface LearningModule {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  colour: string;
  description: string;
  bigIdea: string;
  lessons: Lesson[];
  questions: Question[];
}

export interface ProgressState {
  version: number;
  learner: { displayName: string; ageBand?: AgeBand; isGuest: boolean } | null;
  completedLessons: string[];
  quizBest: Record<string, number>;
  xp: number;
}
