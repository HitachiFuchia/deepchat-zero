import { createClient } from '@supabase/supabase-js';

// Supabase-Projekt-URL und anonymer Schlüssel aus deiner .env bzw. Netlify Env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase Client erzeugen
export const supabase = createClient(supabaseUrl, supabaseAnonKey);