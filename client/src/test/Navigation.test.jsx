import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import auth from '../auth/auth-helper';

// Mock the auth helper
vi.mock('../auth/auth-helper.js', () => ({
    default: {
        isAuthenticated: vi.fn(),
        clearJWT: vi.fn()
    }
}));

// Mock the API
vi.mock('../api/api-auth.js', () => ({
    signout: vi.fn(() => Promise.resolve())
}));

describe('Navigation Component', () => {
    const renderNavigation = () => {
        return render(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('when user is not authenticated', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue(false);
        });

        it('should render navigation links', () => {
            renderNavigation();
            expect(screen.getByText('Portfolio')).toBeInTheDocument();
            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Projects')).toBeInTheDocument();
            expect(screen.getByText('Education')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('should show Sign In and Sign Up buttons', () => {
            renderNavigation();
            expect(screen.getByText('Sign In')).toBeInTheDocument();
            expect(screen.getByText('Sign Up')).toBeInTheDocument();
        });

        it('should NOT show Messages link for non-authenticated users', () => {
            renderNavigation();
            expect(screen.queryByText('Messages')).not.toBeInTheDocument();
        });

        it('should NOT show Sign Out button', () => {
            renderNavigation();
            expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
        });
    });

    describe('when user is authenticated as regular user', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue({
                user: {
                    name: 'John Doe',
                    email: 'john@example.com'
                }
            });
        });

        it('should show welcome message with user name', () => {
            renderNavigation();
            expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
        });

        it('should NOT show (Admin) label for regular users', () => {
            renderNavigation();
            expect(screen.queryByText(/\(Admin\)/i)).not.toBeInTheDocument();
        });

        it('should show Sign Out button', () => {
            renderNavigation();
            expect(screen.getByText('Sign Out')).toBeInTheDocument();
        });

        it('should NOT show Messages link for regular users', () => {
            renderNavigation();
            expect(screen.queryByText('Messages')).not.toBeInTheDocument();
        });
    });

    describe('when user is authenticated as admin', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue({
                user: {
                    name: 'Admin User',
                    email: 'admin@portfolio.com'
                }
            });
        });

        it('should show welcome message with Admin label', () => {
            renderNavigation();
            expect(screen.getByText(/Welcome, Admin User \(Admin\)/i)).toBeInTheDocument();
        });

        it('should show Messages link for admin', () => {
            renderNavigation();
            expect(screen.getByText('Messages')).toBeInTheDocument();
        });

        it('should show Sign Out button', () => {
            renderNavigation();
            expect(screen.getByText('Sign Out')).toBeInTheDocument();
        });
    });

    describe('navigation links', () => {
        it('should have correct href attributes', () => {
            auth.isAuthenticated.mockReturnValue(false);
            renderNavigation();

            const links = screen.getAllByRole('link');
            const linkHrefs = links.map(link => link.getAttribute('href'));

            expect(linkHrefs).toContain('/');
            expect(linkHrefs).toContain('/about');
            expect(linkHrefs).toContain('/projects-list');
            expect(linkHrefs).toContain('/qualifications-list');
            expect(linkHrefs).toContain('/contact');
        });
    });
});
