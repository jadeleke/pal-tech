import { beforeEach, describe, expect, it } from 'vitest';
import { earnedBadgeIds, emptyProgress, loadProgress, modulePercent, saveProgress, STORAGE_KEY } from './progress';

describe('progress logic',()=>{
  beforeEach(()=>localStorage.clear());
  it('calculates lesson completion percentage',()=>expect(modulePercent({...emptyProgress,completedLessons:['a']},['a','b'])).toBe(50));
  it('saves and restores learner progress',()=>{const state={...emptyProgress,learner:{displayName:'Ama',isGuest:false},xp:25};saveProgress(state);expect(loadProgress().learner?.displayName).toBe('Ama');expect(loadProgress().xp).toBe(25)});
  it('recovers from corrupt stored data',()=>{localStorage.setItem(STORAGE_KEY,'{bad');expect(loadProgress()).toEqual(emptyProgress)});
  it('awards a module badge only after lessons and 70 percent quiz',()=>{const state={...emptyProgress,completedLessons:['a','b'],quizBest:{code:80}};expect(earnedBadgeIds(state,['code'],{code:['a','b']})).toContain('code')});
  it('does not award module badge below threshold',()=>{const state={...emptyProgress,completedLessons:['a','b'],quizBest:{code:60}};expect(earnedBadgeIds(state,['code'],{code:['a','b']})).not.toContain('code')});
});
