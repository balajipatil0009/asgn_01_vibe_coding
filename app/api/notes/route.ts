import { NextResponse } from 'next/server';
import { getNotes, saveNote } from '@/lib/db';

export async function GET() {
    const notes = await getNotes();
    return NextResponse.json(notes);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { leadId, note, summary } = body;

        if (!leadId || !note) {
            return NextResponse.json(
                { error: 'leadId and note are required' },
                { status: 400 }
            );
        }

        const savedNote = await saveNote(leadId, note, summary);
        return NextResponse.json(savedNote);
    } catch (error) {
        console.error('Error saving note:', error);
        return NextResponse.json(
            { error: 'Failed to save note' },
            { status: 500 }
        );
    }
}
