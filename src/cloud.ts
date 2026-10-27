import { createClient } from '@supabase/supabase-js';
import { watchInactivity } from './sessionSecurity';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// Only publishable credentials belong in the browser. No service-role keys.
export const cloud=url&&key?createClient(url,key,{auth:{persistSession:false,autoRefreshToken:true,detectSessionInUrl:false}}):null;

// Lives outside the dashboard so navigating to a lesson does not stop the lock.
if (cloud) {
  let stop: (() => void) | undefined;
  cloud.auth.onAuthStateChange((event, session) => {
    if (!session) { stop?.(); stop = undefined; }
    else if (event === 'SIGNED_IN' && !stop) {
      stop = watchInactivity(() => { window.location.reload(); });
    }
  });
}
