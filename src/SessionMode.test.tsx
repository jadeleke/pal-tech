import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import SessionMode from './SessionMode';
afterEach(cleanup);
it('shows teaching content without private profiles and hides answers until requested',()=>{const close=vi.fn();render(<SessionMode onClose={close}/>);expect(screen.queryByRole('status')).toBeNull();fireEvent.click(screen.getByRole('button',{name:'Reveal answer after discussion'}));expect(screen.getByRole('status')).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'Next lesson'}));expect(screen.queryByRole('status')).toBeNull();fireEvent.click(screen.getByRole('button',{name:'Exit session'}));expect(close).toHaveBeenCalledTimes(1)});
