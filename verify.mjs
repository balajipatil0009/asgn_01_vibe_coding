const baseUrl = 'http://localhost:3000';

async function verify() {
    console.log('Starting verification...');

    // 1. Test GET /api/notes
    try {
        const res = await fetch(`${baseUrl}/api/notes`);
        if (!res.ok) throw new Error(`GET /api/notes failed: ${res.status}`);
        const notes = await res.json();
        console.log('✅ GET /api/notes passed');
        console.log('Current notes:', notes);
    } catch (err) {
        console.error('❌ GET /api/notes failed:', err.message);
    }

    // 2. Test POST /api/summary
    let summary = '';
    try {
        const noteContent = "This is a test note to verify the AI summary functionality works as expected.";
        const res = await fetch(`${baseUrl}/api/summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note: noteContent }),
        });
        if (!res.ok) throw new Error(`POST /api/summary failed: ${res.status}`);
        const data = await res.json();
        summary = data.summary;
        console.log('✅ POST /api/summary passed');
        console.log('Generated Summary:', summary);
    } catch (err) {
        console.error('❌ POST /api/summary failed:', err.message);
    }

    // 3. Test POST /api/notes
    try {
        const leadId = 1; // Leanne Graham
        const note = "Test note persisted.";
        const res = await fetch(`${baseUrl}/api/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId, note, summary }),
        });
        if (!res.ok) throw new Error(`POST /api/notes failed: ${res.status}`);
        const savedNote = await res.json();
        console.log('✅ POST /api/notes passed');
        console.log('Saved Note:', savedNote);
    } catch (err) {
        console.error('❌ POST /api/notes failed:', err.message);
    }
}

verify();
