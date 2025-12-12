import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectsList from '../components/ProjectsList';
import auth from '../auth/auth-helper';
import * as apiProject from '../api/api-project';

// Mock the auth helper
vi.mock('../auth/auth-helper.js', () => ({
    default: {
        isAuthenticated: vi.fn()
    }
}));

// Mock the API
vi.mock('../api/api-project.js', () => ({
    list: vi.fn(),
    remove: vi.fn()
}));

describe('ProjectsList Component', () => {
    const mockProjects = [
        {
            _id: '1',
            title: 'Test Project 1',
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
            completion: '2024-01-15',
            description: 'A test project description'
        },
        {
            _id: '2',
            title: 'Test Project 2',
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'jane@example.com',
            completion: '2024-02-20',
            description: 'Another test project'
        }
    ];

    const renderProjectsList = () => {
        return render(
            <BrowserRouter>
                <ProjectsList />
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('when user is not authenticated', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue(false);
            apiProject.list.mockResolvedValue(mockProjects);
        });

        it('should render projects list', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.getByText('Test Project 1')).toBeInTheDocument();
                expect(screen.getByText('Test Project 2')).toBeInTheDocument();
            });
        });

        it('should NOT show "Add New Project" button for non-authenticated users', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.queryByText('Add New Project')).not.toBeInTheDocument();
            });
        });

        it('should NOT show Edit and Delete buttons for projects', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.queryByText('Edit')).not.toBeInTheDocument();
                expect(screen.queryByText('Delete')).not.toBeInTheDocument();
            });
        });
    });

    describe('when user is authenticated as regular user', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue({
                user: {
                    name: 'John Doe',
                    email: 'john@example.com'
                },
                token: 'fake-token'
            });
            apiProject.list.mockResolvedValue(mockProjects);
        });

        it('should render projects list', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.getByText('Test Project 1')).toBeInTheDocument();
            });
        });

        it('should NOT show admin buttons for regular users', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.queryByText('Add New Project')).not.toBeInTheDocument();
                expect(screen.queryByText('Edit')).not.toBeInTheDocument();
                expect(screen.queryByText('Delete')).not.toBeInTheDocument();
            });
        });
    });

    describe('when user is authenticated as admin', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue({
                user: {
                    name: 'Admin User',
                    email: 'admin@portfolio.com'
                },
                token: 'admin-token'
            });
            apiProject.list.mockResolvedValue(mockProjects);
        });

        it('should render projects list', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.getByText('Test Project 1')).toBeInTheDocument();
                expect(screen.getByText('Test Project 2')).toBeInTheDocument();
            });
        });

        it('should show "Add New Project" button for admin', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.getByText('Add New Project')).toBeInTheDocument();
            });
        });

        it('should show Edit and Delete buttons for each project', async () => {
            renderProjectsList();

            await waitFor(() => {
                const editButtons = screen.getAllByText('Edit');
                const deleteButtons = screen.getAllByText('Delete');

                expect(editButtons).toHaveLength(2); // One for each project
                expect(deleteButtons).toHaveLength(2);
            });
        });
    });

    describe('when no projects exist', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue(false);
            apiProject.list.mockResolvedValue([]);
        });

        it('should show "No projects found" message', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
            });
        });
    });

    describe('project data display', () => {
        beforeEach(() => {
            auth.isAuthenticated.mockReturnValue(false);
            apiProject.list.mockResolvedValue(mockProjects);
        });

        it('should display project details correctly', async () => {
            renderProjectsList();

            await waitFor(() => {
                expect(screen.getByText('Test Project 1')).toBeInTheDocument();
                expect(screen.getByText('John Doe')).toBeInTheDocument();
                expect(screen.getByText('john@example.com')).toBeInTheDocument();
                expect(screen.getByText('A test project description')).toBeInTheDocument();
            });
        });
    });
});
