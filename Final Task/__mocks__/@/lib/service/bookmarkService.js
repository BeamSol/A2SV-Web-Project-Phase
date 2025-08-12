export const useGetBookmarksQuery = jest.fn(() => ({
  data: { data: [] },
  isLoading: false,
}));
export const useAddBookmarkMutation = jest.fn(() => [jest.fn()]);
export const useRemoveBookmarkMutation = jest.fn(() => [jest.fn()]);