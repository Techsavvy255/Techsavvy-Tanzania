// =====================================================
// TECHSAVVY TANZANIA — Supabase Configuration
// Replace the two values below with YOUR OWN Supabase project
// values (found in Supabase: Project Settings > API).
// =====================================================

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE";

// Do NOT paste your "service_role" key here — only the "anon public" key.
// The service_role key must never appear in frontend code.

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
