import { beforeEach, describe, expect, it } from 'vitest';
import { addProfile, createProgress, earnedBadgeIds, emptyProgress, exportStore, importStore, learningStreak, loadProgress, modulePercent, saveProgress, STORAGE_KEY } from './progress';

describe('progress logic',()=>{
  beforeEach(()=>localStorage.clear());
  it('calculates lesson completion percentage',()=>expect(modulePercent({...emptyProgress,completedLessons:['a']},['a','b'])).toBe(50));
  it('saves and restores learner progress',()=>{const state={...createProgress('Ama'),xp:25};saveProgress(state);expect(loadProgress().learner?.displayName).toBe('Ama');expect(loadProgress().xp).toBe(25)});
  it('recovers from corrupt stored data',()=>{localStorage.setItem(STORAGE_KEY,'{bad');expect(loadProgress()).toEqual(emptyProgress)});
  it('awards a module badge only after lessons and 70 percent quiz',()=>{const state={...emptyProgress,completedLessons:['a','b'],quizBest:{code:80}};expect(earnedBadgeIds(state,['code'],{code:['a','b']})).toContain('code')});
  it('does not award module badge below threshold',()=>{const state={...emptyProgress,completedLessons:['a','b'],quizBest:{code:60}};expect(earnedBadgeIds(state,['code'],{code:['a','b']})).not.toContain('code')});
  it('keeps independent learner profiles',()=>{const ama=createProgress('Ama');const kojo=createProgress('Kojo');const store=addProfile(addProfile({version:2,activeId:null,profiles:{}},ama),kojo);expect(Object.keys(store.profiles)).toHaveLength(2);expect(store.profiles[ama.learner!.id].learner?.displayName).toBe('Ama')});
  it('exports and restores a private device backup',()=>{const ama=createProgress('Ama');const store=addProfile({version:2,activeId:null,profiles:{}},ama);expect(importStore(exportStore(store))?.profiles[ama.learner!.id].learner?.displayName).toBe('Ama')});
  it('increments a consecutive learning streak',()=>{const result=learningStreak({...emptyProgress,streak:2,lastLearningDate:'2026-08-21'},new Date('2026-08-22T12:00:00Z'));expect(result.streak).toBe(3)});
  it('starts new learner profiles with no completed games',()=>expect(createProgress('Esi').completedGames).toEqual([]));
  it('adds an empty game list when restoring an older backup',()=>{const restored=importStore(JSON.stringify({version:2,activeId:'old',profiles:{old:{...emptyProgress,completedGames:undefined,learner:{id:'old',displayName:'Old learner',isGuest:false,learnerCode:'PAL-OLD'}}}}));expect(restored?.profiles.old.completedGames).toEqual([])});
});
