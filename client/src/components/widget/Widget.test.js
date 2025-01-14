import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Widget from './Widget';

// Mock localStorage
beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
        if (key === 'nbEmploye') return '5';
        if (key === 'nbFile') return '20';
        return null;
    });
});

describe('Widget Component', () => {
    test('renders the "Users" widget with correct title and counter', () => {
        render(<Widget type="user" />);
        expect(screen.getByText('Users')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('renders the "Fichiers" widget with correct title and counter', () => {
        render(<Widget type="fichier" />);
        expect(screen.getByText('Fichiers')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
    });
});
