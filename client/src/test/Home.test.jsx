import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

// Mock the logo import
vi.mock('../assets/logo.jpg', () => ({
    default: 'mocked-logo.jpg'
}));

describe('Home Component', () => {
    const renderHome = () => {
        return render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
    };

    it('should render without crashing', () => {
        renderHome();
        expect(screen.getByAltText('Dev Patel Logo')).toBeInTheDocument();
    });

    it('should display the mission statement', () => {
        renderHome();
        const missionText = screen.getByText(/Mission: To build intelligent, scalable software/i);
        expect(missionText).toBeInTheDocument();
    });

    it('should render the logo image', () => {
        renderHome();
        const logo = screen.getByAltText('Dev Patel Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'mocked-logo.jpg');
    });

    it('should render "Learn More About Me" button', () => {
        renderHome();
        const button = screen.getByRole('button', { name: /Learn More About Me/i });
        expect(button).toBeInTheDocument();
    });

    it('should have a link to the about page', () => {
        renderHome();
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/about');
    });
});
