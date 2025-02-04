import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tpsrcqmutpcdmjsvafxn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwc3JjcW11dHBjZG1qc3ZhZnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNDU3MTAsImV4cCI6MjA1MzkyMTcxMH0._-CHA2Q324z-APA-MZ-xQN2lP62LRZm2Us5RN1HC6LQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
