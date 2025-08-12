import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobCard from '@/components/JobCard';
import { useSession } from 'next-auth/react';
import { useGetBookmarksQuery, useAddBookmarkMutation, useRemoveBookmarkMutation } from '@/lib/service/bookmarkService';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

// Mock icons to avoid SVG complexity
jest.mock('react-icons/ci', () => ({
  CiBookmark: () => <div data-testid="icon-bookmark" />,
  CiBookmarkCheck: () => <div data-testid="icon-bookmark-check" />,
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('@/lib/service/bookmarkService', () => ({
  useGetBookmarksQuery: jest.fn(),
  useAddBookmarkMutation: jest.fn(),
  useRemoveBookmarkMutation: jest.fn(),
}));

const mockJob = {
  id: 'job-1',
  title: 'Frontend Developer',
  location: 'Remote',
  description: 'Build amazing UIs',
  opType: 'Full-time',
  categories: ['React', 'Next.js'],
  logoUrl: null,
};

function setup({
  token = 'mock-token',
  bookmarks = [],
  addMock = jest.fn(),
  removeMock = jest.fn(),
} = {}) {
  (useSession as jest.Mock).mockReturnValue({
    data: token ? { accessToken: token } : null,
  });

  (useGetBookmarksQuery as jest.Mock).mockReturnValue({
    data: { data: bookmarks },
  });

  (useAddBookmarkMutation as jest.Mock).mockReturnValue([addMock]);
  (useRemoveBookmarkMutation as jest.Mock).mockReturnValue([removeMock]);

  return render(<JobCard job={mockJob} index={0} />);
}

describe('JobCard bookmark toggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows not bookmarked icon when job is not in bookmarks', () => {
    setup({ bookmarks: [] });
    expect(screen.getByTestId('icon-bookmark')).toBeInTheDocument();
  });

  it('shows bookmarked icon when job is in bookmarks', () => {
    setup({ bookmarks: [{ eventID: 'job-1' }] });
    expect(screen.getByTestId('icon-bookmark-check')).toBeInTheDocument();
  });

  it('clicking when not bookmarked calls addBookmark and shows success toast', async () => {
    const addMock = jest.fn().mockResolvedValue({});
    setup({ bookmarks: [], addMock });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(addMock).toHaveBeenCalledWith({ jobId: 'job-1', token: 'mock-token' });
      expect(toast.success).toHaveBeenCalledWith('Added to bookmarks');
    });
  });

  it('clicking when bookmarked calls removeBookmark and shows success toast', async () => {
    const removeMock = jest.fn().mockResolvedValue({});
    setup({ bookmarks: [{ eventID: 'job-1' }], removeMock });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(removeMock).toHaveBeenCalledWith({ jobId: 'job-1', token: 'mock-token' });
      expect(toast.success).toHaveBeenCalledWith('Removed from bookmarks');
    });
  });

  it('when not logged in, shows error toast and redirects', async () => {
    setup({ token: null });
    fireEvent.click(screen.getByRole('button'));
    expect(toast.error).toHaveBeenCalledWith('You need to be logged in to bookmark a job.');
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('shows error toast if mutation fails', async () => {
    const addMock = jest.fn().mockRejectedValue(new Error('fail'));
    setup({ bookmarks: [], addMock });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong while toggling bookmark.'
      );
    });
  });
});