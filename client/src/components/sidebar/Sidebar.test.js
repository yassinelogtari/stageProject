import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
    test('renders sidebar with correct links and text', () => {
        localStorage.setItem('userid', '123');
        localStorage.setItem('isLogged', 'true');

        render(
            <Router future={{ v7_relativeSplatPath: true }}>
                <Sidebar />
            </Router>
        );

    });

    test('calls deconnexionHandle on clicking deconnexion', () => {
        localStorage.setItem('isLogged', 'true');
        const setItemMock = jest.spyOn(Storage.prototype, 'setItem');

        act(() => {
            render(
                <Router future={{ v7_relativeSplatPath: true }}>
                    <Sidebar />
                </Router>
            );
        });
        const deconnexionLink = screen.getByText('deconnexion');

        act(() => {
            deconnexionLink.click();
        });

        expect(setItemMock).toHaveBeenCalledWith('isLogged', false);
        setItemMock.mockRestore();
    });
});
