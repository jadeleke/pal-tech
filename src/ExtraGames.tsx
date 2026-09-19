import { useState } from 'react';
import './extra-games.css';

type Round = { prompt: string; scene: string; choices: string[]; answer: string; explanation: string };
const games: { id: string; title: string; description: string; blocks: string[]; rounds: Round[] }[] = [
  { id: 'dance-code', title: 'Dance Code', description: 'Help the dancer follow an algorithm. Choose the next move in each routine.', blocks: ['when green flag clicked', 'read the next instruction', 'if chosen move = next move', 'change score by 1'], rounds: [
    { prompt: 'The routine is clap, jump, spin. What comes first?', scene: '👏 → 🦘 → 🌀', choices: ['Jump', 'Clap', 'Spin'], answer: 'Clap', explanation: 'An algorithm follows instructions in order. Start with clap.' },
    { prompt: 'You have clapped. What comes next?', scene: '👏 ✓ → ? → 🌀', choices: ['Spin', 'Clap', 'Jump'], answer: 'Jump', explanation: 'Jump is the second instruction.' },
    { prompt: 'You have clapped and jumped. What finishes the routine?', scene: '👏 ✓ → 🦘 ✓ → ?', choices: ['Clap', 'Spin', 'Jump'], answer: 'Spin', explanation: 'Spin is the last instruction.' },
    { prompt: 'Repeat “clap, jump” twice. Which routine is right?', scene: '🔁 2 × (👏 🦘)', choices: ['Clap, clap, jump, jump', 'Clap, jump, clap, jump', 'Clap, jump'], answer: 'Clap, jump, clap, jump', explanation: 'A loop repeats the whole pair in the same order.' },
  ] },
  { id: 'pattern-detective', title: 'Pattern Detective', description: 'Find the repeating rule and choose the missing item.', blocks: ['when green flag clicked', 'show a pattern', 'if answer matches the rule', 'change score by 1'], rounds: [
    { prompt: 'Which shape comes next?', scene: '⭐ 🌙 ⭐ 🌙 ?', choices: ['⭐ Star', '🌙 Moon', '☀️ Sun'], answer: '⭐ Star', explanation: 'The rule repeats star, moon. A star comes next.' },
    { prompt: 'Which fruit comes next?', scene: '🍎 🍌 🍌 🍎 🍌 ?', choices: ['🍎 Apple', '🍇 Grapes', '🍌 Banana'], answer: '🍌 Banana', explanation: 'The repeating group is apple, banana, banana.' },
    { prompt: 'What number comes next?', scene: '2 → 4 → 6 → ?', choices: ['7', '8', '12'], answer: '8', explanation: 'Add two each time. Six plus two is eight.' },
    { prompt: 'Which direction comes next?', scene: '⬆️ ➡️ ⬇️ ⬅️ ⬆️ ?', choices: ['Down', 'Left', 'Right'], answer: 'Right', explanation: 'The directions repeat up, right, down, left.' },
  ] },
  { id: 'recycle-robot', title: 'Recycle Robot', description: 'Program the robot to sort materials into the correct practice bin.', blocks: ['when green flag clicked', 'sense the item material', 'if material matches the bin', 'sort item and change score by 1'], rounds: [
    { prompt: 'Where should this clean paper sheet go?', scene: '🤖 📄', choices: ['Paper', 'Metal', 'Plastic'], answer: 'Paper', explanation: 'The sheet is paper, so our robot chooses the paper bin.' },
    { prompt: 'Where should this empty metal can go?', scene: '🤖 🥫', choices: ['Plastic', 'Paper', 'Metal'], answer: 'Metal', explanation: 'The can is metal. The robot checks the material before choosing.' },
    { prompt: 'Where should this empty plastic bottle go?', scene: '🤖 🧴', choices: ['Metal', 'Plastic', 'Paper'], answer: 'Plastic', explanation: 'This bottle is plastic, so it belongs in our plastic practice bin.' },
    { prompt: 'IF an item is paper, choose Paper. The robot sees a newspaper. Which bin?', scene: '🤖 📰', choices: ['Paper', 'Plastic', 'Metal'], answer: 'Paper', explanation: 'The condition is true: a newspaper is paper. Always ask an adult about local recycling rules.' },
  ] },
];

export default function ExtraGames({ completed, onComplete }: { completed: string[]; onComplete: (id: string) => void }) {
  return games.map((game, index) => <ChallengeGame key={game.id} game={game} number={index + 3} completed={completed.includes(game.id)} onComplete={() => onComplete(game.id)} />);
}

function ChallengeGame({ game, number, completed, onComplete }: { game: typeof games[number]; number: number; completed: boolean; onComplete: () => void }) {
  const [round, setRound] = useState(0);
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [finished, setFinished] = useState(false);
  const current = game.rounds[round];
  const correct = answer === current.answer;
  const start = () => { setRound(0); setAnswer(''); setFinished(false); setStarted(true); };
  const next = () => {
    if (!correct) return;
    if (round === game.rounds.length - 1) { setFinished(true); setStarted(false); onComplete(); }
    else { setRound(round + 1); setAnswer(''); }
  };
  return <article className="scratch-game extra-game" aria-label={game.title}>
    <div className="game-card-head"><div><span className="game-number">GAME 0{number}</span><h2>{game.title}</h2><p>{game.description}</p></div><span className={`game-status ${completed ? 'done' : ''}`}>{completed ? '✓ Completed' : '40 points'}</span></div>
    <div className="scratch-layout"><div className="challenge-stage">
      {!started ? <div className="challenge-welcome"><span aria-hidden="true">{finished ? '🏆' : '🤖'}</span><h3>{finished ? 'You solved every challenge!' : 'Ready to try?'}</h3><p>{finished ? 'Play again whenever you like. Points are earned once.' : 'Four challenges. Take your time and try again if you need to.'}</p><button className="primary" onClick={start}>{finished ? 'Play again' : 'Green flag'}</button></div> : <>
        <p className="challenge-count">Challenge {round + 1} of {game.rounds.length}</p><div className="challenge-scene" aria-label={current.scene}>{current.scene}</div><h3>{current.prompt}</h3>
        <div className="challenge-choices">{current.choices.map(choice => <button key={choice} className={answer === choice ? (correct ? 'right' : 'retry') : ''} disabled={correct} onClick={() => setAnswer(choice)}>{choice}</button>)}</div>
        <div className="challenge-feedback" role="status">{answer && <><b>{correct ? 'Great thinking!' : 'Not yet. Choose another answer.'}</b><p>{current.explanation}</p></>}</div>
        {correct && <button className="primary" onClick={next}>{round === game.rounds.length - 1 ? 'Finish game' : 'Next challenge'}</button>}
      </>}
    </div><div className="scratch-script" aria-label="Scratch-style code blocks"><span className="script-label">BLOCK IDEA</span>{game.blocks.map((block, index) => <div key={block} className={`scratch-block ${['event', 'sensing', 'control', 'variable'][index]}`}>{block}</div>)}</div></div>
  </article>;
}
