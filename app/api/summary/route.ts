import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { note } = body;

        if (!note) {
            return NextResponse.json(
                { error: 'Note content is required' },
                { status: 400 }
            );
        }

        // Mock AI Summary simulation
        // In a real app, this would call OpenAI, Anthropic, or Replit AI
        const summary = `AI Summary: ${note.split(' ').slice(0, 5).join(' ')}... (Key insights extracted)`;

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        return NextResponse.json(
            { error: 'Failed to generate summary' },
            { status: 500 }
        );
    }
}
