import { describe, expect, it } from 'vitest';
import { modules } from './data';
import { emptyProgress, exportStore, importStore } from './progress';
import { lessonStages, resumeLesson } from './learning';
describe('lesson journey',()=>{
 it('groups every lab into four stages of five',()=>{for(const m of modules){const stages=lessonStages(m);expect(stages).toHaveLength(4);expect(stages.every(s=>s.lessons.length===5)).toBe(true);expect(stages.flatMap(s=>s.lessons)).toEqual(m.lessons)}});
 it('resumes exact bookmarked lesson',()=>expect(resumeLesson(modules[0],{...emptyProgress,lastLesson:{moduleId:'computer',lessonId:modules[0].lessons[12].id}})).toBe(12));
 it('falls back to the first unfinished lesson for an invalid bookmark',()=>expect(resumeLesson(modules[0],{...emptyProgress,completedLessons:[modules[0].lessons[0].id],lastLesson:{moduleId:'computer',lessonId:'removed'}})).toBe(1));
 it('preserves bookmarks through backup and restore',()=>{const p={...emptyProgress,lastLesson:{moduleId:'computer',lessonId:'computer-parts'}};const restored=importStore(exportStore({version:2,activeId:'demo',profiles:{demo:p}}));expect(restored?.profiles.demo.lastLesson).toEqual(p.lastLesson)});
});
