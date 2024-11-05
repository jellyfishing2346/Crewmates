import { createClient } from '@supabase/supabase-js';

// Accessing environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creating a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export the Supabase client for use in other parts of your application
export { supabase };
