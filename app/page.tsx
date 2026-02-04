'use client';

import { useEffect, useState } from 'react';
import LeadsTable from '@/components/LeadsTable';
import NoteModal from '@/components/NoteModal';
import { Note, NotesData } from '@/lib/db';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function Home() {
  const [leads, setLeads] = useState<User[]>([]);
  const [notes, setNotes] = useState<NotesData>({});
  const [selectedLead, setSelectedLead] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        // Take only basic info
        setLeads(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Fetch notes
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchUsers();
    fetchNotes();
  }, []);

  const handleAddNote = (lead: User) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleSaveNote = async (leadId: number, note: string, summary: string) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, note, summary }),
      });

      if (res.ok) {
        const savedNote = await res.json();
        setNotes((prev) => ({
          ...prev,
          [leadId]: savedNote,
        }));
      }
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 tracking-tight">
            Leads Manager
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Manage your leads, add detailed notes, and generate AI-powered summaries instantly.
          </p>
        </header>

        <LeadsTable
          leads={leads}
          notes={notes}
          onAddNote={handleAddNote}
        />

        <NoteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          lead={selectedLead}
          initialNote={selectedLead ? notes[selectedLead.id] : undefined}
          onSave={handleSaveNote}
        />
      </div>
    </main>
  );
}
