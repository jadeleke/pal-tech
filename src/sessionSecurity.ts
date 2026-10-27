// Shared-device safeguard, not a replacement for database authorization.
export function watchInactivity(onExpire: () => void, timeout = 15 * 60 * 1000) {
  let lastActivity = Date.now();
  let expired = false;
  const check = () => {
    if (!expired && Date.now() - lastActivity >= timeout) {
      expired = true;
      onExpire();
    }
  };
  const activity = () => { check(); if (!expired) lastActivity = Date.now(); };
  const events = ['pointerdown', 'keydown', 'touchstart'] as const;
  events.forEach(event => window.addEventListener(event, activity, {passive:true}));
  document.addEventListener('visibilitychange', check);
  const timer = window.setInterval(check, Math.min(timeout, 1000));
  return () => {
    window.clearInterval(timer);
    events.forEach(event => window.removeEventListener(event, activity));
    document.removeEventListener('visibilitychange', check);
  };
}
