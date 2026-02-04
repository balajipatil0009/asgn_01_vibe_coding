import { render, screen, fireEvent } from '@testing-library/react';
import LeadsTable from '@/components/LeadsTable';

describe('LeadsTable', () => {
    const mockLeads = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
    ];
    const mockNotes = {};
    const mockOnAddNote = jest.fn();

    it('renders leads correctly', () => {
        render(
            <LeadsTable
                leads={mockLeads}
                notes={mockNotes}
                onAddNote={mockOnAddNote}
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('calls onAddNote when button is clicked', () => {
        render(
            <LeadsTable
                leads={mockLeads}
                notes={mockNotes}
                onAddNote={mockOnAddNote}
            />
        );

        const button = screen.getByText('Add Notes');
        fireEvent.click(button);

        expect(mockOnAddNote).toHaveBeenCalledWith(mockLeads[0]);
    });
});
