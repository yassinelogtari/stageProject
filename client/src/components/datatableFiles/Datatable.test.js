import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Datatable from './Datatable';

// Mock data to simulate API response
const mockFileData = [
    { file_id: 1, name: 'File 1' },
    { file_id: 2, name: 'File 2' },
    { file_id: 3, name: 'File 3' },
];

// Mock `axios` to avoid actual backend calls
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: mockFileData })),
    delete: jest.fn(() => Promise.resolve({})),
}));

describe('Datatable Component', () => {
    test('renders the datatable with correct column headers', async () => {
        render(<Datatable />);

        // Wait for the headers to be rendered
        const columnHeaders = await waitFor(() => screen.getAllByRole('columnheader'));
        expect(columnHeaders.length).toBeGreaterThan(0);
    });
});
