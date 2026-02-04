import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NoteModal from '@/components/NoteModal';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('NoteModal', () => {
    const mockLead = { id: 1, name: 'John Doe' };
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not render when isOpen is false', () => {
        const { container } = render(
            <NoteModal
                isOpen={false}
                onClose={mockOnClose}
                lead={mockLead}
                initialNote={undefined}
                onSave={mockOnSave}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('renders correctly when open', () => {
        render(
            <NoteModal
                isOpen={true}
                onClose={mockOnClose}
                lead={mockLead}
                initialNote={undefined}
                onSave={mockOnSave}
            />
        );

        expect(screen.getByText('Notes for John Doe')).toBeInTheDocument();
    });

    it('calls onSave when save button is clicked', async () => {
        render(
            <NoteModal
                isOpen={true}
                onClose={mockOnClose}
                lead={mockLead}
                initialNote={undefined}
                onSave={mockOnSave}
            />
        );

        const textarea = screen.getByPlaceholderText('Enter notes here...');
        fireEvent.change(textarea, { target: { value: 'My new note' } });

        const saveButton = screen.getByText('Save Note');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockOnSave).toHaveBeenCalledWith(1, 'My new note', '');
        });
    });
});
