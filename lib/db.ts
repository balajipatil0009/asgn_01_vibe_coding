import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'notes.json');

export interface Note {
  leadId: number;
  note: string;
  summary?: string;
}

export type NotesData = Record<string, Note>;

async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

export async function getNotes(): Promise<NotesData> {
  try {
    await fs.access(dataFile);
    const content = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty object directly
    return {};
  }
}

export async function saveNote(leadId: number, noteContent: string, summary?: string) {
  await ensureDataDir();
  const currentNotes = await getNotes();

  currentNotes[leadId] = {
    leadId,
    note: noteContent,
    summary,
  };

  await fs.writeFile(dataFile, JSON.stringify(currentNotes, null, 2));
  return currentNotes[leadId];
}
