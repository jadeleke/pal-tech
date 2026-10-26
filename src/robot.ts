export type Move='Right'|'Down'|'Left'|'Up';
export const moves:Record<Move,number>={Right:1,Down:4,Left:-1,Up:-4};
export const walls=[1,5,9];
export function runMove(cell:number,move:Move){
  const next=cell+moves[move];
  if(next<0||next>15||walls.includes(next)||(move==='Right'&&cell%4===3)||(move==='Left'&&cell%4===0))return cell;
  return next;
}
