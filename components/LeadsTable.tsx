'use client';

import { Note } from '@/lib/db';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface LeadsTableProps {
    leads: User[];
    notes: Record<string, Note>;
    onAddNote: (lead: User) => void;
}

export default function LeadsTable({ leads, notes, onAddNote }: LeadsTableProps) {
    return (
        <div className="w-full max-w-5xl mx-auto overflow-hidden bg-white/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100/50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Email</th>
                            <th className="px-6 py-4 font-semibold">Phone</th>
                            <th className="px-6 py-4 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leads.map((lead) => {
                            const hasNote = notes[lead.id];
                            return (
                                <tr
                                    key={lead.id}
                                    className="hover:bg-blue-50/30 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{lead.name}</span>
                                            {hasNote && (
                                                <span className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                    Has Notes
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-light">
                                        {lead.email}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-light">
                                        {lead.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => onAddNote(lead)}
                                            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-all active:scale-95 border border-blue-200"
                                        >
                                            {hasNote ? 'Edit Notes' : 'Add Notes'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Loading leads...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
