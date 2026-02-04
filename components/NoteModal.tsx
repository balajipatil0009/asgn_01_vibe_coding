'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/lib/db';

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: { id: number; name: string } | null;
    initialNote: Note | undefined;
    onSave: (leadId: number, note: string, summary: string) => Promise<void>;
}

export default function NoteModal({
    isOpen,
    onClose,
    lead,
    initialNote,
    onSave,
}: NoteModalProps) {
    const [note, setNote] = useState('');
    const [summary, setSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen && lead) {
            setNote(initialNote?.note || '');
            setSummary(initialNote?.summary || '');
        }
    }, [isOpen, lead, initialNote]);

    const handleGenerateSummary = async () => {
        if (!note) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note }),
            });
            const data = await res.json();
            if (data.summary) {
                setSummary(data.summary);
            }
        } catch (error) {
            console.error('Failed to generate summary', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!lead) return;
        setIsSaving(true);
        try {
            await onSave(lead.id, note, summary);
            onClose();
        } catch (error) {
            console.error('Failed to save note', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen || !lead) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden bg-white/90 rounded-2xl shadow-xl border border-white/20 backdrop-filter backdrop-blur-md">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                        Notes for {lead.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        ID: {lead.id}
                    </p>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Note
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full h-32 p-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-0 resize-none transition-all outline-none"
                            placeholder="Enter notes here..."
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                AI Summary (Max 20 words)
                            </label>
                            <button
                                onClick={handleGenerateSummary}
                                disabled={!note || isGenerating}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                type="button"
                            >
                                {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
                            </button>
                        </div>
                        <div className="w-full p-3 min-h-[60px] bg-blue-50 rounded-lg border border-blue-100 text-sm text-gray-700">
                            {summary || <span className="text-gray-400 italic">No summary generated yet.</span>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 text-sm font-medium">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-500/30 transition-all disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save Note'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
