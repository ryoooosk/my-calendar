import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hufykjxbmwhhhqqnrvey.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZnlranhibXdoaGhxcW5ydmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NDk0NDUsImV4cCI6MjA1MDQyNTQ0NX0.S3Iq7EFLojUxyFHFXqs0hzhOa8c6RL3Pl3InV_7e6Jw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
