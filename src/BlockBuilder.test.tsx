import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import BlockBuilder from './BlockBuilder';
import { runMove } from './robot';
afterEach(()=>{cleanup();vi.useRealTimers()});
it('blocks walls and grid boundaries',()=>{expect(runMove(0,'Right')).toBe(0);expect(runMove(0,'Up')).toBe(0);expect(runMove(3,'Right')).toBe(3);expect(runMove(4,'Left')).toBe(4);expect(runMove(0,'Down')).toBe(4)});
it('executes a sequence and awards completion only at the flag',()=>{vi.useFakeTimers();const done=vi.fn();render(<BlockBuilder completed={false} onComplete={done}/>);for(const move of ['Down','Down','Down','Right','Right','Right'])fireEvent.click(screen.getByRole('button',{name:`Add ${move}`}));fireEvent.click(screen.getByRole('button',{name:'Run program'}));act(()=>vi.runAllTimers());expect(done).toHaveBeenCalledTimes(1);expect(screen.getByRole('status').textContent).toContain('reached the flag')});
it('does not award a blocked or incomplete route',()=>{vi.useFakeTimers();const done=vi.fn();render(<BlockBuilder completed={false} onComplete={done}/>);fireEvent.click(screen.getByRole('button',{name:'Add Right'}));fireEvent.click(screen.getByRole('button',{name:'Run program'}));act(()=>vi.runAllTimers());expect(done).not.toHaveBeenCalled();expect(screen.getByRole('status').textContent).toContain('Not at the flag')});
