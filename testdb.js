const fs = require('fs');
try {
    const code = fs.readFileSync('./js/auth.js', 'utf8');
    const cmatch = code.match(/const SUPABASE_URL = '([^']+)'/);
    const kmatch = code.match(/const SUPABASE_ANON_KEY = '([^']+)'/);
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(cmatch[1], kmatch[1]);

    supabase.from('bookings').insert([{
        id: 'test_insert',
        court_id: 1,
        court_name: 'Test',
        sport: 'Test',
        player: '[EVENT] test',
        user_email: 'admin@example.com',
        date: '2026-03-01',
        start_time: '11:00',
        end_time: '14:00',
        membership: 'none',
        equipment: [],
        players: 0,
        cost: 0,
        status: 'confirmed',
        is_event: true
    }]).then(({ data, error }) => {
        console.log('Error:', error);
    });
} catch (e) { console.log(e); }
