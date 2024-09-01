import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://phzbryvmxhoukwyrbykh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoemJyeXZteGhvdWt3eXJieWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjcwNTAsImV4cCI6MjAzOTQwMzA1MH0.oKZK-ViF2TJUzXtv0TWufqM7yRZB1JvqEJGjvKAc_xE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
