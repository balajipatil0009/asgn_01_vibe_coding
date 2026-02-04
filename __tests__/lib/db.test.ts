import { getNotes, saveNote } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

jest.mock('fs/promises');

describe('Database Library', () => {
    const mockDataDir = path.join(process.cwd(), 'data');
    const mockDataFile = path.join(mockDataDir, 'notes.json');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getNotes', () => {
        it('should return empty object if file does not exist', async () => {
            (fs.access as jest.Mock).mockRejectedValue(new Error('File not found'));

            const notes = await getNotes();
            expect(notes).toEqual({});
        });

        it('should return parsed JSON content if file exists', async () => {
            const mockNotes = { '1': { leadId: 1, note: 'Test' } };
            (fs.access as jest.Mock).mockResolvedValue(undefined);
            (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockNotes));

            const notes = await getNotes();
            expect(notes).toEqual(mockNotes);
        });
    });

    describe('saveNote', () => {
        it('should save a new note and return it', async () => {
            const leadId = 1;
            const noteContent = 'New Note';
            const summary = 'Summary';

            // Mock getNotes to return empty first
            (fs.access as jest.Mock).mockRejectedValueOnce(new Error('File not found'));

            // Mock ensureDataDir (mkdir)
            (fs.mkdir as jest.Mock).mockResolvedValue(undefined);

            await saveNote(leadId, noteContent, summary);

            expect(fs.writeFile).toHaveBeenCalledWith(
                expect.stringContaining('notes.json'),
                expect.stringContaining(noteContent)
            );
        });
    });
});
