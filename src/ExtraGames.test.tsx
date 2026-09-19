import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ExtraGames from './ExtraGames';

afterEach(cleanup);
const solutions = [
  ['Dance Code', 'dance-code', ['Clap', 'Jump', 'Spin', 'Clap, jump, clap, jump']],
  ['Pattern Detective', 'pattern-detective', ['⭐ Star', '🍌 Banana', '8', 'Right']],
  ['Recycle Robot', 'recycle-robot', ['Paper', 'Metal', 'Plastic', 'Paper']],
] as const;
describe('extra Scratch-style games', () => {
  for (const [title, id, answers] of solutions) {
    it(`${title} supports retries, completion and replay`, () => {
      const complete = vi.fn();
      render(<ExtraGames completed={[]} onComplete={complete}/>);
      const game = within(screen.getByRole('article', { name: title }));
      fireEvent.click(game.getByRole('button', { name: 'Green flag' }));
      const wrong = game.getAllByRole('button').find(button => button.textContent !== answers[0])!;
      fireEvent.click(wrong);
      expect(game.getByRole('status').textContent).toContain('Not yet');
      expect(complete).not.toHaveBeenCalled();
      answers.forEach((answer, index) => {
        fireEvent.click(game.getByRole('button', { name: answer }));
        fireEvent.click(game.getByRole('button', { name: index === 3 ? 'Finish game' : 'Next challenge' }));
      });
      expect(complete).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledWith(id);
      fireEvent.click(game.getByRole('button', { name: 'Play again' }));
      expect(game.getByText('Challenge 1 of 4')).toBeTruthy();
    });
  }
});
