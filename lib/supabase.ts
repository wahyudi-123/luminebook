import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kizzkyolujiukokrzvte.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpenpreW9sdWppdWtva3J6dnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjkzMzIsImV4cCI6MjA3OTIwNTMzMn0.tLmgnpNGPHvWHaQW7-pDDfSpWj6OMEDWlZfNMN71vAc';

export const supabase = createClient(supabaseUrl, supabaseKey);