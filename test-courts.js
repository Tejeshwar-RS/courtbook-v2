require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://xajktxcxladnkhnllrwm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhamt0eGN4bGFkbmtobmxscndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTE4MjMsImV4cCI6MjA4NzU4NzgyM30.qa0vZf6MT8bWsZ85K9wzSqa-YSpzT1lp0zqn-mv7Il8'
);

async function test() {
    const { data, error } = await supabase.from('courts').select('*');
    console.log("Courts query result:");
    console.log(data);
    if (error) console.error("Error:", error);
}

test();
