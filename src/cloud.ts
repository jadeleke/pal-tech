import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// Only publishable credentials belong in the browser. No service-role keys.
export const cloud=url&&key?createClient(url,key,{auth:{persistSession:false,autoRefreshToken:true,detectSessionInUrl:false}}):null;
