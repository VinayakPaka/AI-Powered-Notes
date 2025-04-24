// Script to create required tables in Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function setupDatabase() {
  console.log('Setting up database tables...');

  try {
    // First, check if the notes table exists
    const { error: checkError, count } = await supabase
      .from('notes')
      .select('*', { count: 'exact', head: true });

    if (checkError && checkError.code === '42P01') {
      console.log('Notes table does not exist. Creating it...');
      
      // Create the notes table
      const { error: createError } = await supabase.rpc('create_notes_table', {});
      
      if (createError) {
        // If RPC function doesn't exist, we need to create the table with SQL
        console.log('Creating notes table using SQL query...');
        
        // Create notes table with SQL query
        const { error: sqlError } = await supabase.rpc('exec_sql', {
          sql_query: `
            CREATE TABLE IF NOT EXISTS public.notes (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              summary TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
            
            ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
            
            CREATE POLICY "Users can view their own notes" 
              ON public.notes 
              FOR SELECT 
              USING (auth.uid() = user_id);
              
            CREATE POLICY "Users can create their own notes" 
              ON public.notes 
              FOR INSERT 
              WITH CHECK (auth.uid() = user_id);
              
            CREATE POLICY "Users can update their own notes" 
              ON public.notes 
              FOR UPDATE 
              USING (auth.uid() = user_id);
              
            CREATE POLICY "Users can delete their own notes" 
              ON public.notes 
              FOR DELETE 
              USING (auth.uid() = user_id);
          `
        });
        
        if (sqlError) {
          // If exec_sql RPC function doesn't exist, we can't create the table automatically
          console.error('Error: Unable to create notes table. Please create it manually in the Supabase dashboard.');
          console.error('SQL Error:', sqlError);
          console.error('\nRequired table structure:');
          console.error(`
            - Table name: notes
            - Fields:
              - id: uuid (primary key, default: uuid_generate_v4())
              - user_id: uuid (references auth.users.id, not null)
              - title: text (not null)
              - content: text (not null)
              - summary: text
              - created_at: timestamp with time zone (default: now())
              - updated_at: timestamp with time zone (default: now())
            - Enable Row Level Security
            - Add policies for select, insert, update, delete operations
          `);
          return;
        }
        
        console.log('Notes table created successfully!');
      } else {
        console.log('Notes table created successfully using RPC function!');
      }
    } else if (checkError) {
      console.error('Error checking if notes table exists:', checkError);
      return;
    } else {
      console.log('Notes table already exists.');
    }
    
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Unexpected error setting up database:', error);
  }
}

setupDatabase(); 