import { createClient } from "@supabase/supabase-js";

// Initialize database client
const supabaseUrl = "https://rycrljgsucnrdmefsrtr.databasepad.com";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyZmE3OGJiLTNkODAtNGM0Ny04NTU0LWVhNmNjZjFmNGVmMiJ9.eyJwcm9qZWN0SWQiOiJyeWNybGpnc3VjbnJkbWVmc3J0ciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc2NTI1MDc4LCJleHAiOjIwOTE4ODUwNzgsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.vrCEZg9fYJ6dYayyrvP691C6j6jXWjukGvrmX6bjCBc";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
