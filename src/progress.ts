import type { AgeBand, ProgressState, ProgressStore } from './types';

export const STORAGE_KEY = 'pal-tech-progress-v1';
export const STORE_KEY = 'pal-tech-profiles-v2';
export const emptyProgress: ProgressState = { version: 2, learner: null, completedLessons: [], completedProjects: [], completedGames: [], quizBest: {}, xp: 0, streak: 0 };

const randomPart = () => Math.random().toString(36).slice(2, 6).toUpperCase();
export function createProgress(displayName: string, ageBand?: AgeBand, isGuest = false): ProgressState {
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${randomPart()}`;
  return {...emptyProgress, learner:{id,displayName:displayName.trim().slice(0,24)||'Guest',ageBand,isGuest,learnerCode:`PAL-${randomPart()}-${randomPart()}`}};
}

function normalise(value: Partial<ProgressState>): ProgressState {
  const legacyLearner = value.learner as Partial<NonNullable<ProgressState['learner']>> | null | undefined;
  const id = legacyLearner?.id || `legacy-${Date.now()}`;
  return {
    version:2,
    learner:legacyLearner ? {id,displayName:String(legacyLearner.displayName||'Guest').slice(0,24),ageBand:legacyLearner.ageBand,isGuest:Boolean(legacyLearner.isGuest),learnerCode:legacyLearner.learnerCode||`PAL-${randomPart()}-${randomPart()}`} : null,
    completedLessons:Array.isArray(value.completedLessons)?value.completedLessons.filter((x):x is string=>typeof x==='string'):[],
    completedProjects:Array.isArray(value.completedProjects)?value.completedProjects.filter((x):x is string=>typeof x==='string'):[],
    completedGames:Array.isArray(value.completedGames)?value.completedGames.filter((x):x is string=>typeof x==='string'):[],
    quizBest:value.quizBest&&typeof value.quizBest==='object'?value.quizBest:{}, xp:typeof value.xp==='number'?value.xp:0,
    streak:typeof value.streak==='number'?value.streak:0,lastLearningDate:typeof value.lastLearningDate==='string'?value.lastLearningDate:undefined
  };
}

export function loadProgress(): ProgressState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return emptyProgress;
    const value = JSON.parse(saved) as Partial<ProgressState>;
    return normalise(value);
  } catch {
    return emptyProgress;
  }
}

export function loadStore(): ProgressStore {
  try {
    const saved=localStorage.getItem(STORE_KEY);
    if(saved){const raw=JSON.parse(saved) as Partial<ProgressStore>;const profiles=Object.fromEntries(Object.entries(raw.profiles||{}).map(([id,p])=>[id,normalise(p)]));return{version:2,activeId:raw.activeId&&profiles[raw.activeId]?raw.activeId:Object.keys(profiles)[0]||null,profiles}}
    const legacy=loadProgress();
    if(legacy.learner)return{version:2,activeId:legacy.learner.id,profiles:{[legacy.learner.id]:legacy}};
  }catch{/* Start with a clean, usable store. */}
  return{version:2,activeId:null,profiles:{}};
}

export function saveStore(store:ProgressStore){try{localStorage.setItem(STORE_KEY,JSON.stringify(store))}catch{/* Learning remains usable. */}}

export function addProfile(store:ProgressStore,progress:ProgressState):ProgressStore {const id=progress.learner!.id;return{version:2,activeId:id,profiles:{...store.profiles,[id]:progress}}}
export function updateActiveProfile(store:ProgressStore,progress:ProgressState):ProgressStore {if(!store.activeId)return store;return{...store,profiles:{...store.profiles,[store.activeId]:progress}}}
export function removeActiveProfile(store:ProgressStore):ProgressStore {if(!store.activeId)return store;const profiles={...store.profiles};delete profiles[store.activeId];const activeId=Object.keys(profiles)[0]||null;return{...store,activeId,profiles}}

export function exportStore(store:ProgressStore){return JSON.stringify({...store,exportedAt:new Date().toISOString()},null,2)}
export function importStore(text:string):ProgressStore|null {try{const raw=JSON.parse(text) as Partial<ProgressStore>;if(!raw.profiles||typeof raw.profiles!=='object')return null;const profiles=Object.fromEntries(Object.entries(raw.profiles).map(([id,p])=>[id,normalise(p)]));const activeId=raw.activeId&&profiles[raw.activeId]?raw.activeId:Object.keys(profiles)[0]||null;return{version:2,activeId,profiles}}catch{return null}}

export function learningStreak(progress:ProgressState,date=new Date()):Pick<ProgressState,'streak'|'lastLearningDate'>{const today=date.toISOString().slice(0,10);if(progress.lastLearningDate===today)return{streak:progress.streak,lastLearningDate:today};const yesterday=new Date(date);yesterday.setUTCDate(yesterday.getUTCDate()-1);return{streak:progress.lastLearningDate===yesterday.toISOString().slice(0,10)?progress.streak+1:1,lastLearningDate:today}}

export function saveProgress(progress: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Learning remains usable when browser storage is unavailable or full.
  }
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
