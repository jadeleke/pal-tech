import {afterEach,expect,it,vi} from 'vitest';
import {watchInactivity} from './sessionSecurity';
afterEach(()=>vi.useRealTimers());
it('locks after inactivity and cleans up its timer',()=>{
  vi.useFakeTimers();const expire=vi.fn();const stop=watchInactivity(expire,3000);
  vi.advanceTimersByTime(2000);window.dispatchEvent(new Event('keydown'));
  vi.advanceTimersByTime(2000);expect(expire).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1000);expect(expire).toHaveBeenCalledTimes(1);
  stop();vi.advanceTimersByTime(4000);expect(expire).toHaveBeenCalledTimes(1);
});
it('does not extend an expired session when a sleeping tab wakes',()=>{
  vi.useFakeTimers();const expire=vi.fn();const stop=watchInactivity(expire,3000);
  vi.setSystemTime(Date.now()+4000);window.dispatchEvent(new Event('pointerdown'));
  expect(expire).toHaveBeenCalledTimes(1);stop();
});
