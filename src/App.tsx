import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, BookOpen, Check, ChevronRight, CircleUserRound, CloudOff, FolderKanban, Home, Info, LayoutGrid, Menu, RotateCcw, Sparkles, Trophy, Users, Wifi, X } from 'lucide-react';
import { allQuestions, modules, projects } from './data';
import { earnedBadgeIds, emptyProgress, loadProgress, modulePercent, saveProgress } from './progress';
import type { AgeBand, LearningModule, ProgressState, Question } from './types';

type View = 'home' | 'learn' | 'quiz' | 'projects' | 'progress' | 'facilitator' | 'about';
const navItems: Array<{id: View; label: string; icon: typeof Home}> = [
  {id:'home',label:'Home',icon:Home},{id:'learn',label:'Learn',icon:BookOpen},{id:'quiz',label:'Quiz',icon:Trophy},
  {id:'projects',label:'Projects',icon:FolderKanban},{id:'progress',label:'Progress',icon:Award}
];
const badgeNames: Record<string, [string,string]> = {
  computer:['Computer Explorer','Complete Computer Explorer and score 70%+'], algorithm:['Algorithm Thinker','Complete Algorithm Lab and score 70%+'],
  flowchart:['Flowchart Builder','Complete Flowchart Builder and score 70%+'], code:['Junior Programmer','Complete Code Lab and score 70%+'],
  network:['Network Navigator','Complete Network Lab and score 70%+'], ai:['AI Explorer','Complete AI Lab and score 70%+'],
  safety:['Safety Champion','Complete Digital Safety and score 70%+'], skills:['Digital Creator','Complete Digital Skills and score 70%+'],
  innovator:['PAL Tech Innovator','Reach at least 50% in every learning module']
};

function App() {
  const [progress,setProgress] = useState<ProgressState>(()=>loadProgress());
  const [view,setView] = useState<View>('home');
  const [selectedModule,setSelectedModule] = useState<LearningModule|null>(null);
  const [mobileOpen,setMobileOpen] = useState(false);
  const [online,setOnline] = useState(navigator.onLine);
  const [showWelcome,setShowWelcome] = useState(!progress.learner);

  useEffect(()=>saveProgress(progress),[progress]);
  useEffect(()=>{ const update=()=>setOnline(navigator.onLine); addEventListener('online',update); addEventListener('offline',update); return()=>{removeEventListener('online',update);removeEventListener('offline',update)}},[]);
  const lessonMap = useMemo(()=>Object.fromEntries(modules.map(m=>[m.id,m.lessons.map(l=>l.id)])),[]);
  const badges = earnedBadgeIds(progress,modules.map(m=>m.id),lessonMap);
  const overall = Math.round(modules.reduce((sum,m)=>sum+modulePercent(progress,m.lessons.map(l=>l.id)),0)/modules.length);
  const go=(next:View)=>{setView(next);setSelectedModule(null);setMobileOpen(false);scrollTo({top:0,behavior:'smooth'})};
  const openModule=(module:LearningModule)=>{setSelectedModule(module);setView('learn');scrollTo({top:0,behavior:'smooth'})};

  return <div className="app-shell">
    {!online && <div className="offline"><CloudOff size={17}/> You are offline — core lessons are still available.</div>}
    <header className="topbar">
      <button className="brand" onClick={()=>go('home')} aria-label="PAL Tech home"><span className="brand-mark">P</span><span><b>PAL Tech</b><small>Learning Hub</small></span></button>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item=><button className={view===item.id?'active':''} onClick={()=>go(item.id)} key={item.id}><item.icon size={18}/>{item.label}</button>)}</nav>
      <div className="top-actions"><span className={`status ${online?'online':''}`}>{online?<Wifi size={15}/>:<CloudOff size={15}/>} {online?'Ready offline':'Offline'}</span><button className="profile-chip" onClick={()=>go('progress')}><span>{progress.learner?.displayName?.[0]?.toUpperCase()||'G'}</span>{progress.learner?.displayName||'Guest'}</button><button className="menu-btn" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Open navigation">{mobileOpen?<X/>:<Menu/>}</button></div>
    </header>
    {mobileOpen&&<nav className="mobile-nav">{navItems.map(item=><button onClick={()=>go(item.id)} key={item.id}><item.icon size={18}/>{item.label}</button>)}</nav>}

    <main>
      {view==='home'&&<HomePage progress={progress} overall={overall} openModule={openModule} go={go}/>} 
      {view==='learn'&&(selectedModule?<ModulePage module={selectedModule} progress={progress} update={setProgress} back={()=>setSelectedModule(null)} goQuiz={()=>go('quiz')}/>:<LearnPage progress={progress} openModule={openModule}/>)}
      {view==='quiz'&&<QuizPage progress={progress} update={setProgress}/>} 
      {view==='projects'&&<ProjectsPage/>}
      {view==='progress'&&<ProgressPage progress={progress} overall={overall} badges={badges} openModule={openModule}/>} 
      {view==='facilitator'&&<FacilitatorPage reset={()=>{localStorage.removeItem('pal-tech-progress-v1');setProgress(emptyProgress);setShowWelcome(true);go('home')}}/>}
      {view==='about'&&<AboutPage/>}
    </main>
    <footer><div className="footer-brand"><span className="brand-mark small">P</span><span><b>Play & Learn Foundation</b><small>Learn • Practice • Play • Build</small></span></div><div className="footer-links"><button onClick={()=>go('about')}>About & Legacy</button><button onClick={()=>go('facilitator')}>Facilitator Corner</button><span>PAL Tech v1.0.0</span></div></footer>
    {showWelcome&&<Onboarding onDone={(name,ageBand,isGuest)=>{setProgress({...emptyProgress,learner:{displayName:name||'Guest',ageBand,isGuest:isGuest??false}});setShowWelcome(false)}}/>}
  </div>;
}

function Onboarding({onDone}:{onDone:(name:string,age?:AgeBand,guest?:boolean)=>void}) {
  const [name,setName]=useState(''); const [age,setAge]=useState<AgeBand|undefined>();
  return <div className="modal-backdrop"><section className="welcome-card" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
    <div className="welcome-art"><span>✦</span><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><b>PAL</b></div>
    <div className="welcome-copy"><span className="eyebrow">YOUR TECH ADVENTURE STARTS HERE</span><h1 id="welcome-title">Welcome to PAL Tech Learning Hub.</h1><p>Explore computers, code, networks and AI—one hands-on challenge at a time.</p>
      <label htmlFor="nickname">What should we call you? <small>A nickname is perfect. Don’t use your full legal name.</small></label>
      <input id="nickname" value={name} onChange={e=>setName(e.target.value.slice(0,24))} placeholder="e.g. Ama" autoFocus/>
      <fieldset><legend>Choose your age group <span>(optional)</span></legend><div className="choice-row"><button className={age==='9-11'?'selected':''} onClick={()=>setAge('9-11')}>9–11 years</button><button className={age==='12-14'?'selected':''} onClick={()=>setAge('12-14')}>12–14 years</button></div></fieldset>
      <div className="privacy-note"><Info size={18}/><span>Your progress stays on this device. We never ask for email, phone number or location.</span></div>
      <div className="welcome-actions"><button className="primary" disabled={!name.trim()} onClick={()=>onDone(name.trim(),age,false)}>Start exploring <ArrowRight size={19}/></button><button className="text-button" onClick={()=>onDone('Guest',age,true)}>Continue as Guest</button></div>
    </div>
  </section></div>
}

function HomePage({progress,overall,openModule,go}:{progress:ProgressState;overall:number;openModule:(m:LearningModule)=>void;go:(v:View)=>void}) {
  const next=modules.find(m=>modulePercent(progress,m.lessons.map(l=>l.id))<100)??modules[0];
  return <>
    <section className="hero"><div className="hero-copy"><span className="eyebrow light">LEARN • PRACTICE • PLAY • BUILD</span><h1>Akwaaba, {progress.learner?.displayName||'Explorer'}! <span>👋</span></h1><p>Every big idea starts with a small question. What will you explore today?</p><div className="hero-actions"><button className="primary warm" onClick={()=>openModule(next)}>{overall?'Continue learning':'Start your first adventure'} <ArrowRight size={19}/></button><button className="secondary light" onClick={()=>go('projects')}>Browse projects</button></div></div>
      <div className="hero-panel"><div className="panel-top"><span>YOUR JOURNEY</span><b>{overall}%</b></div><div className="progress-track big"><i style={{width:`${overall}%`}}/></div><div className="journey-stats"><span><b>{progress.completedLessons.length}</b> lessons done</span><span><b>{progress.xp}</b> XP earned</span></div><div className="mascot"><span>✦</span><div>Keep going!<small>One idea at a time.</small></div></div></div>
    </section>
    <section className="content-section"><div className="section-heading"><div><span className="eyebrow">EXPLORE THE LABS</span><h2>Choose your next adventure</h2><p>Eight labs. Hundreds of ideas. Pick one that sparks your curiosity.</p></div><button className="text-button arrow" onClick={()=>go('learn')}>See all labs <ArrowRight size={18}/></button></div><div className="module-grid">{modules.map((module,index)=><ModuleCard key={module.id} module={module} progress={progress} index={index} open={()=>openModule(module)}/>)}</div></section>
    <section className="challenge-band"><div><span className="eyebrow light">QUICK CHALLENGE</span><h2>Ready to test your tech brain?</h2><p>Try a five-question mixed quiz and get helpful feedback as you go.</p></div><button className="primary warm" onClick={()=>go('quiz')}>Enter Quiz Arena <Trophy size={19}/></button></section>
  </>
}

function ModuleCard({module,progress,index,open}:{module:LearningModule;progress:ProgressState;index:number;open:()=>void}) {
  const pct=modulePercent(progress,module.lessons.map(l=>l.id));
  return <article className="module-card" style={{'--accent':module.colour} as React.CSSProperties}><div className="card-num">0{index+1}</div><div className="module-icon">{module.icon}</div><h3>{module.title}</h3><p>{module.description}</p><div className="card-progress"><div><span>{pct?pct+'% complete':'Not started'}</span><span>{module.lessons.length} lessons</span></div><div className="progress-track"><i style={{width:`${pct}%`}}/></div></div><button onClick={open}>{pct?'Continue':'Start lab'} <ChevronRight size={18}/></button></article>
}

function LearnPage({progress,openModule}:{progress:ProgressState;openModule:(m:LearningModule)=>void}) { return <section className="page content-section"><div className="page-intro"><span className="eyebrow">THE LEARNING LABS</span><h1>Explore technology, your way.</h1><p>Each lab takes you from a big idea to a hands-on challenge. Start anywhere.</p></div><div className="module-grid wide">{modules.map((m,i)=><ModuleCard module={m} progress={progress} index={i} open={()=>openModule(m)} key={m.id}/>)}</div></section> }

function ModulePage({module,progress,update,back,goQuiz}:{module:LearningModule;progress:ProgressState;update:(p:ProgressState)=>void;back:()=>void;goQuiz:()=>void}) {
  const [active,setActive]=useState(0); const [choice,setChoice]=useState(''); const [checked,setChecked]=useState(false);
  const lesson=module.lessons[active]; const done=progress.completedLessons.includes(lesson.id); const correct=choice===lesson.answer;
  const complete=()=>{ if(!correct||done)return; update({...progress,completedLessons:[...progress.completedLessons,lesson.id],xp:progress.xp+25}); };
  const next=()=>{complete();setChoice('');setChecked(false);if(active<module.lessons.length-1){setActive(active+1);scrollTo({top:0,behavior:'smooth'})}};
  return <section className="lesson-page"><div className="lesson-head" style={{'--accent':module.colour} as React.CSSProperties}><button className="back" onClick={back}><ArrowLeft size={18}/> All labs</button><div className="lesson-title"><div className="module-icon large">{module.icon}</div><div><span className="eyebrow">{module.title.toUpperCase()}</span><h1>{lesson.title}</h1></div></div><div className="lesson-meter"><span>Lesson {active+1} of {module.lessons.length}</span><div className="progress-track"><i style={{width:`${((active+1)/module.lessons.length)*100}%`}}/></div></div></div>
    <div className="lesson-layout"><aside className="lesson-nav" aria-label="Lessons">{module.lessons.map((l,i)=><button className={`${i===active?'active':''} ${progress.completedLessons.includes(l.id)?'done':''}`} onClick={()=>{setActive(i);setChoice('');setChecked(false)}} key={l.id}><span>{progress.completedLessons.includes(l.id)?<Check size={16}/>:i+1}</span><div><small>{l.eyebrow}</small>{l.title}</div></button>)}</aside>
      <article className="lesson-content"><span className="eyebrow">BIG IDEA</span><h2>{module.bigIdea}</h2><div className="concept-block"><span className="block-label">LEARN</span><p>{lesson.concept}</p></div><div className="example-block"><div className="example-icon">◎</div><div><span className="block-label">SEE IT IN REAL LIFE</span><p>{lesson.example}</p></div></div>
        <div className="try-card"><span className="eyebrow">YOUR TURN</span><h3>{lesson.challenge}</h3><div className="answer-list">{lesson.choices.map(c=><button disabled={checked} className={`${choice===c?'chosen':''} ${checked&&c===lesson.answer?'correct':''} ${checked&&choice===c&&c!==lesson.answer?'wrong':''}`} onClick={()=>setChoice(c)} key={c}><span>{choice===c?'●':'○'}</span>{c}</button>)}</div>
          {!checked?<button className="primary" disabled={!choice} onClick={()=>setChecked(true)}>Check answer</button>:<div className={`feedback ${correct?'correct':'wrong'}`} role="status"><b>{correct?'Correct.':'Not quite yet.'}</b><p>{lesson.explanation}</p>{correct?<button className="primary" onClick={next}>{active===module.lessons.length-1?'Finish lesson':'Next lesson'} <ArrowRight size={18}/></button>:<button className="secondary" onClick={()=>{setChoice('');setChecked(false)}}>Try again <RotateCcw size={17}/></button>}</div>}
        </div>{lesson.goFurther&&<div className="go-further"><Sparkles size={22}/><div><b>Go further</b><p>{lesson.goFurther}</p></div></div>}
        {active===module.lessons.length-1&&done&&<div className="completion"><Award size={34}/><div><h3>Lab lessons complete</h3><p>Take the checkpoint to work toward your {badgeNames[module.id][0]} badge.</p></div><button className="primary" onClick={goQuiz}>Open Quiz Arena</button></div>}
      </article></div>
  </section>
}

function QuizPage({progress,update}:{progress:ProgressState;update:(p:ProgressState)=>void}) {
  const [topic,setTopic]=useState('mixed'); const [questions,setQuestions]=useState<Question[]>([]); const [index,setIndex]=useState(0); const [choice,setChoice]=useState(''); const [checked,setChecked]=useState(false); const [score,setScore]=useState(0); const [finished,setFinished]=useState(false);
  const start=(id:string)=>{const pool=id==='mixed'?allQuestions:modules.find(m=>m.id===id)!.questions; setTopic(id);setQuestions([...pool].sort(()=>0.5-Math.random()).slice(0,5));setIndex(0);setScore(0);setChoice('');setChecked(false);setFinished(false)};
  if(!questions.length)return <section className="page content-section"><div className="page-intro"><span className="eyebrow">QUIZ ARENA</span><h1>Test what you know.</h1><p>No tricks and no penalties. Every answer comes with an explanation.</p></div><div className="quiz-picker"><button className="featured" onClick={()=>start('mixed')}><span>⚡</span><div><b>Mixed Tech Challenge</b><small>5 questions from across every lab</small></div><ArrowRight/></button>{modules.map(m=><button onClick={()=>start(m.id)} key={m.id}><span>{m.icon}</span><div><b>{m.shortTitle} checkpoint</b><small>5 questions • best score saved</small></div><ChevronRight/></button>)}</div></section>;
  const q=questions[index]; const isCorrect=choice===q.answer;
  const advance=()=>{const nextScore=score+(isCorrect?1:0); if(index===questions.length-1){const pct=Math.round((nextScore/questions.length)*100); const key=topic==='mixed'?'mixed':topic; update({...progress,quizBest:{...progress.quizBest,[key]:Math.max(progress.quizBest[key]||0,pct)},xp:progress.xp+(isCorrect?10:0)});setScore(nextScore);setFinished(true)}else{setScore(nextScore);setIndex(index+1);setChoice('');setChecked(false)}};
  if(finished){const pct=Math.round((score/questions.length)*100);return <section className="page content-section narrow"><div className="result-card"><div className="result-ring">{pct}%</div><span className="eyebrow">CHECKPOINT COMPLETE</span><h1>{pct>=70?'You showed solid understanding.':'Good start—review and retry.'}</h1><p>You answered {score} of {questions.length} questions correctly. Your best score is saved on this device.</p><div><button className="primary" onClick={()=>start(topic)}>Try again <RotateCcw size={18}/></button><button className="secondary" onClick={()=>setQuestions([])}>Choose another quiz</button></div></div></section>}
  return <section className="page content-section narrow"><div className="quiz-top"><button className="back" onClick={()=>setQuestions([])}><ArrowLeft size={18}/> Quiz Arena</button><span>Question {index+1} of {questions.length}</span></div><div className="progress-track big"><i style={{width:`${((index+1)/questions.length)*100}%`}}/></div><article className="question-card"><span className="eyebrow">{modules.find(m=>m.id===q.moduleId)?.title}</span><h1>{q.prompt}</h1><div className="answer-list">{q.choices.map(c=><button disabled={checked} className={`${choice===c?'chosen':''} ${checked&&c===q.answer?'correct':''} ${checked&&choice===c&&c!==q.answer?'wrong':''}`} onClick={()=>setChoice(c)} key={c}><span>{choice===c?'●':'○'}</span>{c}</button>)}</div>{!checked?<button className="primary" disabled={!choice} onClick={()=>setChecked(true)}>Check answer</button>:<div className={`feedback ${isCorrect?'correct':'wrong'}`}><b>{isCorrect?'That’s correct.':'Not quite.'}</b><p>{q.explanation}</p><button className="primary" onClick={advance}>{index===questions.length-1?'See result':'Next question'} <ArrowRight size={18}/></button></div>}</article></section>
}

function ProjectsPage(){return <section className="page content-section"><div className="page-intro"><span className="eyebrow">PROJECT ZONE</span><h1>Make something that is yours.</h1><p>Choose a project, gather what you need and learn by building.</p></div><div className="project-grid">{projects.map(p=><article className="project-card" key={p.title}><div className="project-top"><span>{p.icon}</span><em>{p.level}</em></div><h2>{p.title}</h2><div className="project-meta"><span>◷ {p.time}</span><span>→ {p.learn}</span></div><p><b>What you need:</b> {p.need}</p><ol>{p.steps.map(s=><li key={s}>{s}</li>)}</ol><div className="reflection"><b>Reflect</b> What worked, what was tricky, and what would you change?</div></article>)}</div></section>}

function ProgressPage({progress,overall,badges,openModule}:{progress:ProgressState;overall:number;badges:string[];openModule:(m:LearningModule)=>void}){const next=modules.find(m=>modulePercent(progress,m.lessons.map(l=>l.id))<100)??modules[0];return <section className="page content-section"><div className="progress-hero"><div><span className="eyebrow light">MY PROGRESS</span><h1>{progress.learner?.displayName||'Guest'}’s learning journey</h1><p>Your progress lives on this device. Every completed lesson is a step forward.</p></div><div className="overall-ring" style={{'--value':`${overall*3.6}deg`} as React.CSSProperties}><span><b>{overall}%</b><small>overall</small></span></div></div><div className="stat-row"><div><BookOpen/><span><b>{progress.completedLessons.length}</b> lessons complete</span></div><div><Sparkles/><span><b>{progress.xp}</b> XP earned</span></div><div><Award/><span><b>{badges.length}</b> badges earned</span></div></div><div className="progress-layout"><div><div className="section-heading compact"><div><span className="eyebrow">LAB PROGRESS</span><h2>Keep exploring</h2></div></div><div className="progress-list">{modules.map(m=>{const pct=modulePercent(progress,m.lessons.map(l=>l.id));return <button onClick={()=>openModule(m)} key={m.id}><span className="mini-icon">{m.icon}</span><div><b>{m.title}</b><div className="progress-track"><i style={{width:`${pct}%`,background:m.colour}}/></div></div><strong>{pct}%</strong><ChevronRight/></button>})}</div></div><aside className="next-card"><span className="eyebrow">NEXT UP</span><div className="module-icon">{next.icon}</div><h2>{next.title}</h2><p>{next.description}</p><button className="primary" onClick={()=>openModule(next)}>Continue learning <ArrowRight size={18}/></button></aside></div><div className="badges-section"><span className="eyebrow">BADGE CABINET</span><h2>Skills you’re building</h2><div className="badge-grid">{Object.entries(badgeNames).map(([id,[name,criteria]])=><article className={badges.includes(id)?'earned':'locked'} key={id}><div>{badges.includes(id)?'★':'☆'}</div><b>{name}</b><p>{criteria}</p><small>{badges.includes(id)?'Earned':'Keep going'}</small></article>)}</div></div></section>}

function FacilitatorPage({reset}:{reset:()=>void}){const [confirm,setConfirm]=useState(false);return <section className="page content-section"><div className="page-intro"><span className="eyebrow">FACILITATOR CORNER</span><h1>Help learners explore independently.</h1><p>Quick guidance for using PAL Tech Learning Hub with a group or on a shared laptop.</p></div><div className="facilitator-grid"><article><Users/><h2>Learning outcomes</h2><p>Learners build computer fundamentals, algorithmic thinking, beginner coding, network understanding, AI literacy, digital safety and practical creation skills.</p></article><article><LayoutGrid/><h2>Run a group session</h2><p>Begin with the Discover question, let pairs discuss the activity, then ask learners to explain why an answer works. Use projects as offline extensions.</p></article><article><CircleUserRound/><h2>Shared laptop</h2><p>Version 1 keeps one local learner profile. Reset between learners only when the previous learner no longer needs their saved progress.</p></article></div><div className="activity-list"><h2>Offline group activity ideas</h2>{modules.slice(0,6).map(m=><div key={m.id}><span>{m.icon}</span><div><b>{m.title}</b><p>{m.lessons[0].example}</p></div></div>)}</div><div className="danger-zone"><div><h2>Reset learner progress</h2><p>This permanently removes the nickname, completed lessons, XP, quiz scores and badges stored in this browser.</p></div>{!confirm?<button className="danger" onClick={()=>setConfirm(true)}>Reset learner data</button>:<div className="confirm"><span>Are you sure?</span><button className="danger" onClick={reset}>Yes, reset</button><button className="secondary" onClick={()=>setConfirm(false)}>Cancel</button></div>}</div></section>}

function AboutPage(){return <section className="page content-section narrow"><div className="legacy-hero"><div className="brand-mark giant">P</div><span className="eyebrow">OUR LEGACY</span><h1>Built for the next generation of PAL Tech learners.</h1><p>PAL Tech Learning Hub was created to help children continue exploring technology beyond the classroom. It is inspired by the PAL Tech learning journey and designed for future young innovators.</p></div><div className="values"><article><span>01</span><h2>Curiosity first</h2><p>Questions, examples and hands-on challenges make every concept something to explore.</p></article><article><span>02</span><h2>Safe by design</h2><p>No accounts, ads, tracking or sensitive data. Progress stays on the learner’s device.</p></article><article><span>03</span><h2>Ready anywhere</h2><p>Core lessons work offline after the first visit, making learning resilient when connectivity is weak.</p></article></div></section>}

export default App;
