import { useState } from 'react';
import { modules } from './data';

export default function SessionMode({onClose}:{onClose:()=>void}) {
  const [moduleId,setModuleId]=useState(modules[0].id);
  const [index,setIndex]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const module=modules.find(m=>m.id===moduleId)!;
  const lesson=module.lessons[index];
  return <section className="session-mode" aria-label="Group teaching session">
    <div className="session-toolbar"><h1>Today’s group lesson</h1><button className="secondary" onClick={onClose}>Exit session</button></div>
    <p>No learner names, scores or profiles appear in this view.</p>
    <div className="session-pickers"><label>Learning lab<select value={moduleId} onChange={e=>{setModuleId(e.target.value);setIndex(0);setRevealed(false)}}>{modules.map(m=><option key={m.id} value={m.id}>{m.title}</option>)}</select></label><label>Lesson<select value={index} onChange={e=>{setIndex(Number(e.target.value));setRevealed(false)}}>{module.lessons.map((l,i)=><option key={l.id} value={i}>{i+1}. {l.title}</option>)}</select></label></div>
    <article className="session-lesson"><span className="eyebrow">{module.title} · Lesson {index+1}</span><h2>{lesson.title}</h2><p>{lesson.concept}</p><h3>Let’s try it together</h3><p>{lesson.example}</p><h3>{lesson.challenge}</h3><ol type="A">{lesson.choices.map(c=><li key={c}>{c}</li>)}</ol>{revealed?<div role="status"><strong>{lesson.answer}</strong><p>{lesson.explanation}</p></div>:<button className="primary" onClick={()=>setRevealed(true)}>Reveal answer after discussion</button>}<h3>Talk with a partner</h3><p>What made you choose that answer? Can you explain it with a new example?</p></article>
    <div className="session-toolbar"><button className="secondary" disabled={!index} onClick={()=>{setIndex(index-1);setRevealed(false)}}>Previous lesson</button><button className="primary" disabled={index===module.lessons.length-1} onClick={()=>{setIndex(index+1);setRevealed(false)}}>Next lesson</button></div>
  </section>;
}
